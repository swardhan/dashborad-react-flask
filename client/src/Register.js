import React from 'react';
import 'react-bulma-components/full';
// import {BrowserHistory} from 'react-router';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { isLoggedIn, isNotLoggedIn } from './actions/login';
import CheckLogin from './CheckLogin.js';

const UsernamAlert = (props) => {
  if(props.status === 'is-success'){
    return <p className='show help is-success'>This username is available</p> 
  }else if(props.status === 'is-danger'){
    return <p className='show help is-danger'>This username is unavailable</p>
  }else if (props.status === ''){
    return <p className='hide'>This username is unavailable</p>
  }
}

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      usernames: ["bulma", "vegeta", "goku"],
      usernameAlert: ''
    };

    // this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
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

  onSubmit = (e) => {
    console.log(e)
    const name = e.target.elements.name.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.pass.value;
    let data = {
      name: name,
      username: username,
      password: password
    }
    console.log(data);
    axios.post(`http://localhost:5000/register`, {
      name: name,
      username: username,
      password: password
    })
      .then((res) => {
        this.props.history.push('/login');
      })
      .catch((err) => {
        console.log(err)
      })
    e.preventDefault();

  }

  goBack = () => {
    this.props.history.goBack();
  }

  // onUsernameChange = (e) => {
  //   if(this.state.usernames.includes(e.target.value)){
  //     e.target.classList.remove('is-success');
  //     e.target.classList.add('is-danger');
  //     this.setState({
  //       usernameAlert: 'is-danger'
  //     })
  //   }else if(this.state.usernames.includes(e.target.value) === false){
  //     e.target.classList.remove('is-danger');
  //     e.target.classList.add('is-success');
  //     this.setState({
  //       usernameAlert: 'is-success'
  //     })
  //   }else if(e.target.value === ''){
  //     this.setState({
  //       usernameAlert: ''
  //     })
  //   }
  // }

  render() {
    return(
        <div style={{width: '50%'}}>
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" id="name" type="text" placeholder="Text input"/>
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input onChange={this.onUsernameChange} className="input" id="username" type="text" placeholder="Text input"/>
              </div>
              <UsernamAlert status={this.state.usernameAlert}/>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" id="pass" type="password" placeholder="Password"/>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
            </div>
          </form>
          <div>
              <button onClick={this.goBack}>Go Back</button>
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

export default connect( mapStateToProps, matchDispatchToProps)(CheckLogin(Register));