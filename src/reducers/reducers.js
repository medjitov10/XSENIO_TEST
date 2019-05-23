import { FETCH_ALL_COMPANIES, NEXT_PAGE, PREV_PAGE } from '../actions/get';

const CompaniesReducer = (
  state = {
    companies: [{
      "open": 0,
      "close": 0,
      "high": 0,
      "low": 0,
      "volume": 0,
      "uOpen": 0,
      "uClose": 0,
      "uHigh": 0,
      "uLow": 0,
      "uVolume": 0,
      "change": 0,
      "changePercent": 0,
      "changeOverTime": 0,
      "symbol": 0,
    }],
    page: 10
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_COMPANIES:

      const nextState = action.payload.data && Object.keys(action.payload.data).map((comp, index) => {
        let el = action.payload.data[comp];
        return {...el.previous, ...el.next, id: index +1 }
      })
      return { companies: nextState || state.companies, page: state.page };
    case NEXT_PAGE:
      return {
        ...state, page: state.page + 10
      }
    case PREV_PAGE:
      return {
        ...state, page: state.page - 10
      }
  }
  return state;
};

export default CompaniesReducer;
