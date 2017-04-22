
import React, { Component } from 'react';
import * as detailActions from './detail.action';
import { Utils, } from '../../';

const { Setup } = Utils;

class DetailContainer extends Component {

  componentDidMount() {
    const { id } = this.props.params;
    this.props.actions.getPaper(id);
  }

  render(){
    const isLoading = this.props.state.isLoading;
    if(isLoading){
      return( <div> {'loading'} </div>);
    }

    const { title, abstract, pdfLink } = this.props.state.paper;
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
      </div>
    );
  }
}

export default Setup.customConnect('detail', detailActions, DetailContainer);
