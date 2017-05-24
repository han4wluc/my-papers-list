
import React, { Component } from 'react';
import * as navActions from './nav.action';
import { Utils, } from '../../';
import LoadingBar from 'react-redux-loading-bar';
import { hideLoading } from 'react-redux-loading-bar';

const { Setup, AV } = Utils;

import { Link } from 'react-router-dom';

class NavContainer extends Component {

  componentDidMount() {
    this.props.history.listen((location)=>{
      $('#navbarCollapse').removeClass('show');
      this.props.dispatch({
        type: 'NAV_SET_STATE',
        props: {
          errorMessage: null,
          successMessage: null,
        }
      });
      this.props.dispatch(hideLoading());
      $('body').scrollTop(0);
    });
  }

  renderButton(){
    return (
      <div className="mt-2 mt-md-0">
        <Link to="/login" >
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
        </Link>
      </div>
    );
  }

  renderUsername({username, pathname}){

    const active = pathname === '/profile' ? true : false;
    const color = active ? 'white' : '#ccc';

    return (
      <div className="form-inline mt-2 mt-md-0">
        <Link style={{color:color}} to="/profile" >{username}</Link>
      </div>
    );

  }

  renderSuccess({successMessage, dismissSuccess}){
    if(!successMessage){ return null; }
    return (
      <div className="container">
        <div className="alert alert-success" role="success">
          <button onClick={dismissSuccess} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          { successMessage }
        </div>
      </div>
    );
  }

  renderError({errorMessage, dismissError}){
    if(!errorMessage){ return null; }
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          <button onClick={dismissError} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          { errorMessage }
        </div>
      </div>
    );
  }

  render(){

    const { errorMessage, successMessage } = this.props.state;
    const { dismissError, dismissSuccess } = this.props.actions;

    // const pathname = this.props.location.pathname;

    const user = AV.User.current();
    let userComp = this.renderButton();
    if(user){
      userComp = this.renderUsername({username:user.getUsername()});
    }

    return (
      <div>

        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse"
          style={{marginBottom: '24px'}}>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
          </button>   

          <Link to="/">
            <a className="navbar-brand" href="#">MyPaperList</a>
          </Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className={'nav-item active'}>
                <Link className="nav-link" to="/">{'Home'}</Link>
                {/*<a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>*/}
              </li>

              <li className={'nav-item'}>
                <Link className="nav-link" to="/read">{'Read'}</Link>
                {/*<a className="nav-link" href="/read">Read</a>*/}
              </li>
            </ul>
            { userComp }
          </div>
        </nav>

          { this.renderSuccess({successMessage,dismissSuccess}) }
          { this.renderError({errorMessage,dismissError}) }




        <div style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          right: '0px',
          // backgroundColor: '#292b2c',
          height: '3px',
        }}>
          <LoadingBar
            style={{ backgroundColor: '#0275d8', height: '3px' }}
            updateTime={10} maxProgress={90} progressIncrease={5}
          />
        </div>        


      </div>
    );
  }
}






export default Setup.customConnect('nav', navActions, NavContainer);
