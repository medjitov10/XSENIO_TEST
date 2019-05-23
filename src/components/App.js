import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchCompanies, onNextPress, onPrevClick} from '../actions/get';
import {connect} from 'react-redux';

import { Company } from './company';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex, page) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex + page - 10, 1);
  result.splice(endIndex + page - 10, 0, removed);

 return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgrey" : "#343a40",
  ...draggableStyle
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
      this.props.page
    );

    this.setState({
      items
    })
  }
  componentDidMount() {
    this.props.fetchCompanies().then(() => {
      this.setState({items: this.props.companies})
    });
  }

  render() {
    const { companies, page } = this.props;
    const { items } = this.state;
    document.body.style.background = '#343a40';

    const th = Object.keys(companies[0]);
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
      <div>
        <table className="table table-dark" style={{ margin: '0'}}>
          <thead>
            <tr>
              <th>#</th>
              <th>symbol</th>
              {
                th.map((el, index) => {
                  return el === 'id' || el === 'date' || el === 'symbol' ? null
                  : <th scope='col' key={index}>{el}</th>
                })
              }
            </tr>
          </thead>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <tbody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                {
                  items && items.slice(page - 10, page).map((company, index) => (
                    <Draggable key={company.symbol} draggableId={company.symbol} index={index}>
                      {
                        (provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Company company={company} key={index} />
                          </tr>
                        )
                      }
                    </Draggable>
                  ))
                }
                {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
        <button
          type='button'
          className='btn btn-dark'
          disabled={page === 10 ? true : false}
          onClick={() => this.props.onPrevClick('Prev')}
          >
            Prev
          </button>
        <button
          type='button'
          className='btn btn-dark'
          disabled={companies.length/page < 1 ? true : false}
          onClick={() => this.props.onNextPress('next')}
        >
          Next
        </button>
      </div>
    );
  }
}

// Put the thing into the DOM!
const mapStateToProps = (state) => {
  const {companies, page} = state;
  return {
    companies,
    page
  };
};

export default connect(mapStateToProps, {fetchCompanies, onNextPress, onPrevClick})(App);
