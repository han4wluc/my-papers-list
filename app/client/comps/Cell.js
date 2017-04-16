
import React, { Component } from 'react';

export default class Cell extends Component {

  static propTypes = {
    onClickDetail: React.PropTypes.func,
    summary: React.PropTypes.string,
    title: React.PropTypes.string,
  }

  render() {

    const { summary, title, onClickDetail } = this.props;

    return (
      <div className="col-md-12">
        <h2>{title}</h2>
        <p>{summary}</p>
        <button onClick={onClickDetail} className="btn btn-secondary" role="button">View details &raquo;</button>
      </div>
    );
  }
}
