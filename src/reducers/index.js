import { LOAD_DATA, ADD_PRODUCT, DELETE_PRODUCT, GET_PRICE } from '../constants/App'

const initialState = {
  byId:{},
  allIds:[],
  commonTotal:0,
};

export default function userState(state = initialState, action) {
  switch (action.type) {
   case LOAD_DATA:
     return { ...state, ...action.payload };
   case ADD_PRODUCT:
   case DELETE_PRODUCT:{
    const {id, quantity, commonTotal} = action.payload;
     return {
       ...state,
       byId: {
         ...state.byId,
         [id]:{
           ...state.byId[id],
           quantity,
         }
       },
       commonTotal: commonTotal,
     };
   }
   case GET_PRICE:{
       const {id, total} = action.payload;
       return {
         ...state,
         byId:{
           ...state.byId,
           [id]: {
              ...state.byId[id],
              total,
           }
         }
       };
   }
   default:
     return state;
 }
}
