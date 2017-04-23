
import React, { Component } from 'react';
import * as detailActions from './detail.action';
import { Utils, } from '../../';

const { Setup } = Utils;

class DetailContainer extends Component {

  componentDidMount() {
    const { id } = this.props.params;
    this.props.actions.getPaper(id);
  }

  componentWillUnmount(){
    this.props.dispatch({
      type: 'DETAIL_RESET_TO_INITIAL_STATE',
    });
  }

  renderStatuses({paperId,readStatus,onClickStatusButton}){

    const notReadBtnStatus = readStatus === 'not_read' ? 'btn btn-primary' : 'btn btn-secondary';
    const readBtnStatus = readStatus === 'read' ? 'btn btn-primary' : 'btn btn-secondary';
    const planToReadBtnStatus = readStatus === 'plan_to_read' ? 'btn btn-primary' : 'btn btn-secondary';

    return (
      <div className="btn-group" data-toggle="buttons">
        <label onClick={()=>{
          onClickStatusButton({paperId,status:'not_read'});
        }} className={notReadBtnStatus}>
          <input type="radio" name="options" id="option1" autoComplete="off"> {'Not Read2'}</input>
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
        <a target="_blank" href={pdfLink}>
          <button type="submit" className="btn btn-primary">Download</button>
        </a>

        { this.renderStatuses({paperId,readStatus,onClickStatusButton}) }

      </div>
    );
  }
}

export default Setup.customConnect('detail', detailActions, DetailContainer);
