
import React, { Component } from 'react';
import * as detailActions from './detail.action';
import { Utils, } from '../../';
const { AV } = Utils;

const { Setup } = Utils;

class DetailContainer extends Component {

  componentDidMount() {
    console.log('didMount')
    const { id } = this.props.params;
    this.props.actions.getPaper(id);
  }

  componentWillUnmount(){
    this.props.dispatch({
      type: 'DETAIL_RESET_TO_INITIAL_STATE',
    });
  }

  renderStatuses({paperId,readStatus,onClickStatusButton}){

    if(!AV.User.current()){
      return;
    }

    const notReadBtnStatus = readStatus === 'not_read' ? 'btn btn-primary' : 'btn btn-secondary';
    const readBtnStatus = readStatus === 'read' ? 'btn btn-primary' : 'btn btn-secondary';
    const planToReadBtnStatus = readStatus === 'plan_to_read' ? 'btn btn-primary' : 'btn btn-secondary';

    return (
      <div className="btn-group" data-toggle="buttons">
        <label onClick={()=>{
          onClickStatusButton({paperId,status:'not_read'});
        }} className={notReadBtnStatus}>
          <input type="radio" name="options" id="option1" autoComplete="off"> {'Not Read'}</input>
        </label>
        <label onClick={()=>{
          onClickStatusButton({paperId,status:'read'});
        }} className={readBtnStatus}>
          <input type="radio" name="options" id="option2" autoComplete="off"> {'Read'}</input>
        </label>
        <label onClick={()=>{
          onClickStatusButton({paperId,status:'plan_to_read'});
        }} className={planToReadBtnStatus}>
          <input type="radio" name="options" id="option3" autoComplete="off"> {'Plan to Read'}</input>
        </label>
      </div>
    );

  }

  render(){
    const { isLoading, readStatus } = this.props.state;
    if(isLoading){
      return( <div> {'loading'} </div>);
    }

    const { title, abstract, pdfLink } = this.props.state.paper;
    const { id:paperId } = this.props.params;
    const { onClickStatusButton } = this.props.actions;
    return (
      <div className="container">
        <h2>
          {title}
        </h2>
        <div>
          {abstract}
        </div>
        <div className="col-xs-12" style={{marginTop:'28px'}}>
          <a target="_blank" href={pdfLink}>
            <button type="submit" className="btn btn-primary">Download PDF</button>
          </a>
        </div>
        <div className="col-xs-12" style={{marginTop:'28px'}}>
          { this.renderStatuses({paperId,readStatus,onClickStatusButton}) }
        </div>
      </div>
    );
  }
}

export default Setup.customConnect('detail', detailActions, DetailContainer);
