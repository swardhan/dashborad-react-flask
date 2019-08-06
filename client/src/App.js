import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bulma-components/full';
import './App.css';
import { connect } from 'react-redux';
import CheckLogin from './CheckLogin.js';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      usernames: ["bulma", "vegeta", "goku"],
      usernameAlert: ''
    };
  }

  componentDidMount(){
      if(localStorage.getItem('token')){
        this.props.isLoggedIn();
      }else{
        this.props.isNotLoggedIn();;
      }  
    }

    componentDidUpdate(){
      if(localStorage.getItem('token')){
        this.props.isLoggedIn();
      }else{
        this.props.isNotLoggedIn();;
      }  
    }

  render() {
    return(
        <div style={{width: '50%'}}>
            <div className="field is-grouped">
              <div className="control">
                <Link to='/login'>
                  <button className="button is-link">Login</button>
                </Link>
              </div>
              <div className="control">
                <Link to='/register'>
                  <button className="button is-link">Register</button>
                </Link>
              </div>
            </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
    return {login: state.login}
}

const matchDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: () => dispatch({type: 'isLoggedIn'}),
    isNotLoggedIn: () => dispatch({type: 'isNotLoggedIn'})
  }
}

export default connect( mapStateToProps, matchDispatchToProps)(CheckLogin(App));;