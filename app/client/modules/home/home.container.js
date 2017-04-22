
import React, { Component } from 'react';
import * as homeActions from './home.action';
import { Utils, Comps, } from '../../';
import { browserHistory } from 'react-router';

const { Setup } = Utils;
const { Cell } = Comps;

class HomeContainer extends Component {

  constructor(props) {
    super(props);
    this.search = '';
  }

  renderPapers(papers){
    return papers.map((paper,index)=>{
      return (
        <Cell
          key={index}
          {...paper}
          onClickDetail={function(){
            browserHistory.push('/detail/' + paper._id);
          }}
        />
      );
    });
  }

  inputOnChange(e){
    this.search = this.refs.search.value;
  }

  submitOnClick({searchPapers}){
    searchPapers(this.search);
  }

  render(){

    const { papers } = this.props.state;
    const { searchPapers } = this.props.actions;

    return (
      <div>
        <div className="container">
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">🔍</span>
            <input ref={'search'} onChange={this.inputOnChange.bind(this)} type="text" className="form-control" placeholder="Search Keyword" aria-describedby="basic-addon1"></input>
            <button onClick={this.submitOnClick.bind(this,{searchPapers})} type="submit" className="btn btn-primary">Search</button>
          </div>
          <br/>
          <div className="row">
            {this.renderPapers(papers)}
          </div>
        </div>
      </div>
    );
  }
}

export default Setup.customConnect('home', homeActions, HomeContainer);
