
import React, { Component } from 'react';
import * as readActions from './read.action';
import { Utils, Comps, } from '../../';

const { Setup } = Utils;
const { Cell } = Comps;

class ReadContainer extends Component {

  renderPapers({papers}){
    return papers.map((paper,index)=>{
      return (
        <Cell
          key={index}
          {...paper}
        />
      );
    });
  }

  render(){
    const { papers } = this.props.state;
    return (
      <div className="container">
        <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary active">
            <input type="radio" name="options" id="option1" autoComplete="off"> {'All'}</input>
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="options" id="option2" autoComplete="off"> {'Read'}</input>
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="options" id="option3" autoComplete="off"> {'Plan to Read'}</input>
          </label>
        </div>
        <div>
          {this.renderPapers({papers})}
        </div>
      </div>
    );
  }
}

export default Setup.customConnect('read', readActions, ReadContainer);
