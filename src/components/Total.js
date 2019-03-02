import React,{Component} from 'react'

export default class Total extends Component {
  render(){
    const {total} = this.props;
    return (
      <tr>
        <td colSpan = "2" className = "text-right">Итого</td>
        <td className = "text-center">{total}</td>
      </tr>
    )
  }
}
