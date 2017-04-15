
import React, { Component } from 'react';

export default class Cell extends Component {

  static propTypes = {
    summary: React.PropTypes.string,
    title: React.PropTypes.string,
  }

  render() {

    const { summary, title } = this.props;

    return (
      <div className="col-md-12">
        <h2>{title}</h2>
        <p>{summary}</p>
        <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div>
    );
  }
}
