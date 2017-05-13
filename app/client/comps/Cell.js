
import React, { Component } from 'react';

export default class Cell extends Component {

  static propTypes = {
    summary: React.PropTypes.string,
    onClickDetail: React.PropTypes.func,
    title: React.PropTypes.string,
    // updated: React.PropTypes.string,
  }

  render() {

    const { summary, title, onClickDetail, authors, updated } = this.props;

    return (
      <div className="col-md-12" style={{marginTop:'18px'}}>
        <h2>{title}</h2>
        <p><b>{authors.join(', ')}</b></p>
        <p>{updated}</p>
        <p>{summary}</p>
        <button onClick={onClickDetail} className="btn btn-secondary" role="button">View details &raquo;</button>
      </div>
    );
  }
}
