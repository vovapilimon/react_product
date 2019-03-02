import { LOAD_DATA, ADD_PRODUCT, DELETE_PRODUCT, GET_PRICE } from '../constants/App'
import * as axios  from 'axios';

export function loadData() {
  return (dispatch) => {
    axios.get(`/api/items`)
    .then( res=>{
      const byId ={};
      const allIds=[];
      res.data.forEach((item)=>{
        byId[item.id] = item;
        byId[item.id].quantity = 0;
        byId[item.id].total = 0;
        allIds.push(item.id);
      });
      dispatch({
        type: LOAD_DATA,
        payload: {byId , allIds},
      })
    })
  }
}

export function addProduct(id, quantity, commonTotal) {
  return {
    type: ADD_PRODUCT,
    payload: {id, quantity, commonTotal},
  }
}

export function deleteProduct(id, quantity, commonTotal) {
  return {
    type: DELETE_PRODUCT,
    payload: {id, quantity, commonTotal},
  }
}

export function getPriceByID(id, total) {
  return (dispatch) => {
    axios.get(`/api/item/${id}/total/${total}`)
    .then( res=>{
      const total = res.data.total;
      dispatch({
        type: GET_PRICE,
        payload:{total, id},
      })
    })
  }
}
