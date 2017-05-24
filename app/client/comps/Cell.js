
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cell extends Component {

  static propTypes = {
    summary: React.PropTypes.string,
    onClickDetail: React.PropTypes.func,
    title: React.PropTypes.string,
    // updated: React.PropTypes.string,
  }

  render() {

    const { summary, title, onClickDetail, authors, updated, _id } = this.props;
    // console.log(_id)
    return (
      <div className="col-md-12" style={{marginTop:'18px'}}>
        <h2>{title}</h2>
        <p><b>{authors.join(', ')}</b></p>
        <p>{updated}</p>
        <p>{summary}</p>
        <Link to={`/detail/${_id}`}>
          <button onClick={onClickDetail} className="btn btn-secondary" role="button">View details &raquo;</button>
        </Link>
      </div>
    );
  }
}
