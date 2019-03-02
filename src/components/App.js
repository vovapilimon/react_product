import React,{Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/AppAction'
import Row from './Row'
import Total from './Total'

class App extends Component{
  render(){
    const {allIds, byId, commonTotal} = this.props;
    return (
        <table className="table table-striped">
          <thead>
              <tr>
                <th scope="col" className = "text-center">Товар</th>
                <th scope="col" className = "text-center">Количество</th>
                <th scope="col" className = "text-center">Стоимость</th>
              </tr>
          </thead>
          <tbody>
            {allIds.map((id)=>(
              <Row
                key = {id}
                product = {byId[id]}
                onAddProduct = {this.handleAddProduct(id)}
                onDeleteProduct = {this.handleDeleteProduct(id)}
              />
            ))}
            <Total total = {commonTotal}/>
          </tbody>
        </table>
    )
  }

  handleAddProduct = (id) => () => {
    const {addProduct, getPriceByID} = this.props.actions;
    let {byId,commonTotal} = this.props;
    const product = byId[id];

    if(product.quantity >= product.maxQty){
      alert(`Превышено максимольное количество товара - ${product.title}`);
      return;
    }
    product.quantity++;
    commonTotal += product.price;
    addProduct(id,product.quantity,commonTotal);
    getPriceByID(id, product.quantity);
  }

  handleDeleteProduct = (id) => () => {
    const {deleteProduct, getPriceByID} = this.props.actions;
    let {byId,commonTotal} = this.props;
    const product = byId[id];

    if(product.quantity === 0){
      alert(`Минимальное количество товара - 0`);
      return;
    }
    product.quantity--;
    commonTotal -= product.price;
    deleteProduct(id, product.quantity, commonTotal);
    getPriceByID(id, product.quantity);
  }

  componentWillMount(){
    const {loadData} = this.props.actions;
    loadData();
  }
}

function mapStateToProps (state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
