import React,{Component} from 'react'

export default class Row extends Component {
  render(){
    const {product, onAddProduct, onDeleteProduct} = this.props;
    return (
      <tr>
        <th scope="row">{product.title}</th>
        <td className = "text-center">
          <button onClick={onDeleteProduct}>-</button> {product.quantity} <button onClick={onAddProduct}>+</button>
        </td>
        <td className = "text-center">{product.total}</td>
      </tr>
    )
  }
  shouldComponentUpdate(nextProps, nextState){
    const {product} = this.props;
    if(product.quantity !== nextProps.product.quantity
      || product.total !== nextProps.product.total){
      return true;
    }
    return false;
  }
}
