
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

    var statusText = 'Not Read    ';
    if(readStatus === 'read'){
      statusText = 'Read     ';
    }
    if(readStatus === 'plan_to_read'){
      statusText = 'Plan to Read';
    }

    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {statusText}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div onClick={()=>{
            onClickStatusButton({paperId,status:'not_read'});
          }} className="dropdown-item btn-danger" href="#">{'Not Read'}</div>
          <div onClick={()=>{
            onClickStatusButton({paperId,status:'read'});
          }} className="dropdown-item" href="#">{'Read'}</div>
          <div onClick={()=>{
            onClickStatusButton({paperId,status:'plan_to_read'});
          }} className="dropdown-item" href="#">{'Plan to Read'}</div>
        </div>
      </div>
    );

  }

  render(){
    const { isLoading, readStatus } = this.props.state;
    if(isLoading){
      return( <div> {'loading'} </div>);
    }

    const { title, summary, pdf, authors = [] } = this.props.state.paper;
    const { id:paperId } = this.props.params;
    const { onClickStatusButton } = this.props.actions;
    return (
      <div className="container">
        <div style={{display:'flex',flex:1,}}>
          <h2>
            {title}
          </h2>
          <div>
            { this.renderStatuses({paperId,readStatus,onClickStatusButton}) }
          </div>
        </div>
        <p><b>{authors.join(', ')}</b></p>
        <div>
          {summary}
        </div>
        <div className="col-xs-12" style={{marginTop:'28px'}}>
          <a target="_blank" href={pdf}>
            <button type="submit" className="btn btn-primary">Download PDF</button>
          </a>
        </div>
      </div>
    );
  }
}

export default Setup.customConnect('detail', detailActions, DetailContainer);
