
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'querystring';

import * as homeActions from './home.action';
import { Utils, Comps, } from '../../';
import { withDone } from 'react-router-server';


const { Setup } = Utils;
const { Cell } = Comps;

@withDone
class HomeContainer extends Component {

  constructor(props) {
    super(props);
    this.search = '';
  }

  async componentWillMount() {

    const { searchPapers } = this.props.actions;
    const { done } = this.props;


    try {
    //   console.log('window', !!window);
    // } catch (error){
      // console.log('erroR', error);

      var location = this.props.location.search.replace(/^\?/, '');

      const query = qs.parse(location);
      // console.log(window.location)
      // const query = url.parse(window.location.href, true).query;
      // console.log('query', query)
      if(query.search){
        if(!this.props.state.searched){
          // console.log('server not rendered', this.props.serverRednered, this.props.state.searched)
          // console.log('query.search', query.search)
          await searchPapers(query.search);
          // done();
          // this.props.done({ serverRednered: true });
        } else {
          // console.log('server already rendered')
          // done();
          // this.props.done({ serverRednered: true });
        }        
      }
      done()
      // console.log('query', query);


    } catch (error){
      // console.log(error);
    }



    // if (!this.props.message) {
    //   setTimeout(() => {
    //     this.props.done({ message: 'Hello world!' });
    //   }, 10);
    // }
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
