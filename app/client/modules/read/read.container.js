
import React, { Component } from 'react';
import * as readActions from './read.action';
import { Utils, Comps, } from '../../';
import { browserHistory } from 'react-router';
const { Setup } = Utils;
const { Cell } = Comps;

class ReadContainer extends Component {

  componentDidMount() {
    this.props.actions.getRead({});
  }

  componentWillUnmount(){
    this.props.dispatch({
      type: 'READ_RESET_TO_INITIAL_STATE',
    });
  }

  renderStatuses({paperId,readStatus,getRead}){

    const notReadBtnStatus = readStatus === undefined ? 'btn btn-primary' : 'btn btn-secondary';
    const readBtnStatus = readStatus === 'read' ? 'btn btn-primary' : 'btn btn-secondary';
    const planToReadBtnStatus = readStatus === 'plan_to_read' ? 'btn btn-primary' : 'btn btn-secondary';

    return (
      <div className="btn-group" data-toggle="buttons">
        <label onClick={()=>{
          getRead({status:undefined});
        }} className={notReadBtnStatus}>
          <input type="radio" name="options" id="option1" autoComplete="off"> {'All'}</input>
        </label>
        <label onClick={()=>{
          getRead({status:'read'});
        }} className={readBtnStatus}>
          <input type="radio" name="options" id="option2" autoComplete="off"> {'Read'}</input>
        </label>
        <label onClick={()=>{
          getRead({status:'plan_to_read'});
        }} className={planToReadBtnStatus}>
          <input type="radio" name="options" id="option3" autoComplete="off"> {'Plan to Read'}</input>
        </label>
      </div>
    );  
  }

  renderRead({read,isLoading}){

    if(isLoading){
      return (
        <div>{'loading'}</div>
      )
    }

    return read.map((read, index)=>{
      return (
        <Cell
          key={index}
          {...read.paper}
          onClickDetail={function(){
            browserHistory.push('/detail/' + read.paper._id);
          }}
        />
      );
    });
  }

  render(){
    const { read, isLoading, readStatus } = this.props.state;
    const { getRead } = this.props.actions;

    return (
      <div className="container">
        {this.renderStatuses({readStatus,getRead})}
        <div>
          {this.renderRead({read,isLoading})}
        </div>
      </div>
    );
  }
}

export default Setup.customConnect('read', readActions, ReadContainer);
