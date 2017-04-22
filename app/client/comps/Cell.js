
import React, { Component } from 'react';

export default class Cell extends Component {

  static propTypes = {
    abstract: React.PropTypes.string,
    onClickDetail: React.PropTypes.func,
    title: React.PropTypes.string,
  }

  render() {

    const { abstract, title, onClickDetail } = this.props;

    return (
      <div className="col-md-12">
        <h2>{title}</h2>
        <p>{abstract}</p>
        <button onClick={onClickDetail} className="btn btn-secondary" role="button">View details &raquo;</button>
      </div>
    );
  }
}
