import axios from 'axios';

export const FETCH_ALL_COMPANIES = 'FETCH_ALL_COMPANIES';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';

export const fetchCompanies = () => {
  const key = 'ur key';
  const listOfCompanies = 'a,aapl,adbe,hog,hpq,intc,goog,fb,grpn,mgi,acer,aeg,aeo,qtwo'.split(',').sort().join();
  const types = 'previous,price';
  const request = axios.get(`https://sandbox.iexapis.com/v1/stock/market/batch?types=${types}&symbols=${listOfCompanies}&range=5y%20&token=${key}`)
  return {
    type: FETCH_ALL_COMPANIES,
    payload: request
  }
}

export const onNextPress = () => {
  return {
    type: NEXT_PAGE
  }
}
export const onPrevClick = () => {
  return {
    type: PREV_PAGE
  }
}
