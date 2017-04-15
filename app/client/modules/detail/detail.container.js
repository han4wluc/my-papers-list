
import React, { Component } from 'react';
import * as detailActions from './detail.action';
import { Utils, } from '../../';

const { Setup } = Utils;

class DetailContainer extends Component {
  render(){

    const { title, abstract } = this.props.state;

    return (
      <div className="container">
        <div>
          {title}
        </div>
        <div>
          {abstract}
        </div>
        <a target="_blank" href="https://arxiv.org/abs/1205.3915v1">
          <button type="submit" className="btn btn-primary">Download</button>
        </a>
      </div>
    );
  }
}

export default Setup.customConnect('detail', detailActions, DetailContainer);
