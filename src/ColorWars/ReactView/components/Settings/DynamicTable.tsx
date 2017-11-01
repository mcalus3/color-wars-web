import '../../../Settings.css';
import { Component } from 'react';
import * as React from 'react';

export default class DynamicTable extends Component<{rows: number, cols: number}, object> {
  constructor(props: {rows: number, cols: number}){
    super(props);
  }
  render(){
    let rows = [];
    for (var i = 0; i < this.props.cols; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < this.props.rows; idx++){
        let cellID = `cell${i}-${idx}`
        cell.push(<td key={cellID} id={cellID}></td>)
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return(
    <table className="grid">
        <tbody>
            {rows}
        </tbody>
    </table>
    )
  }
}