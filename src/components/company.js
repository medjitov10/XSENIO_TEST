import React from 'react';

export const Company = ({company, index}) => {
  return (
    <React.Fragment key={index}>
      <td scope='row'>{company.id}</td>
      <td>{company.symbol}</td>
      {
        Object.keys(company).map((el,index) => {
          return el === 'date' || el === 'symbol' || el === 'id' ?  null : (<td key={index}>{company[el]}</td>)
        })
      }
    </React.Fragment>
  )
}
