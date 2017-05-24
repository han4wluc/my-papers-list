
import React, { Component } from 'react';
import * as homeActions from './home.action';
import { Utils, Comps, } from '../../';
import { Link } from 'react-router-dom';

const { Setup } = Utils;
const { Cell } = Comps;

class HomeContainer extends Component {

  constructor(props) {
    super(props);
    this.search = '';
  }

  renderPapers({papers,searched}){

    if(papers.length === 0){

      if(!searched){
        return (
          <div className="col-md-12" style={{
            // backgroundColor:'red',
            marginTop: '28px',
            display: 'flex',
            flex: 1,
            justifyContent: 'center'
          }}>
            <p>
              {'Search from thousands of academic papers'}
            </p>
          </div>
        );
      }
      return (
        <div className="col-md-12" style={{
          // backgroundColor:'red',
          marginTop: '28px',
          display: 'flex',
          flex: 1,
          justifyContent: 'center'
        }}>
          <p>
            {'No papers found :('}
          </p>
        </div>
      );
    }

    return papers.map((paper,index)=>{
      // console.log(paper)
      return (
        <Cell
          key={index}
          {...paper}
          onClickDetail={function(){
            // console.log('push')
            // browserHistory.push('/detail/' + paper._id);
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

  onKeyPress({searchPapers}, e){
    if(e.charCode === 13){
      searchPapers(this.search);
    }
  }

  render(){

    const { papers, searched } = this.props.state;
    const { searchPapers } = this.props.actions;

    return (
      <div>
        <div className="container">
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">🔍</span>
            <input onKeyPress={this.onKeyPress.bind(this, {searchPapers})} ref={'search'} onChange={this.inputOnChange.bind(this)} type="text" className="form-control" placeholder="Search Keyword" aria-describedby="basic-addon1"></input>
            <button onClick={this.submitOnClick.bind(this,{searchPapers})} type="submit" className="btn btn-primary">Search</button>
          </div>
          <br/>
          <div className="row">
            {this.renderPapers({papers,searched})}
          </div>
        </div>
      </div>
    );
  }
}

export default Setup.customConnect('home', homeActions, HomeContainer);
