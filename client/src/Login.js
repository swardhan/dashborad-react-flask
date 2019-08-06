import React from 'react';
import axios from 'axios';
import 'react-bulma-components/full';
import { connect } from 'react-redux'
import { isLoggedIn, isNotLoggedIn } from './actions/login'
import CheckLogin from './CheckLogin.js';

class Login extends React.Component {

	constructor(props){
		super(props);

		this.goBack = this.goBack.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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

	goBack = () => {
		this.props.history.goBack();
	}

	onSubmit = (e) => {
		e.preventDefault();
		let username = e.target.elements["username"].value;
		let password = e.target.elements["pass"].value;
		let data = {
			username,
			password
		}

		axios.post('http://localhost:5000/login',data)
			.then((response) => {
				const token = response.data.token;
				if(token){
					localStorage.setItem('token', token)
					this.props.isLoggedIn()
					this.props.history.push('/table');
				}else{
					alert(response.data.message)
					this.props.history.push('/login')
				}
			})																																									
	}

	render() {
		return (
				<div>
					<form style={{width: '50%'}} onSubmit={this.onSubmit}>
			            <div className="field">
			              <label className="label">Username</label>
			              <div className="control has-icons-left has-icons-right">
			                <input className="input" name="username" type="text" placeholder="Text input"/>
			              </div>
			            </div>
			            <div className="field">
			              <label className="label">Password</label>
			              <div className="control">
			                <input className="input" name="pass" type="password" placeholder="Password"/>
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

export default connect(mapStateToProps, matchDispatchToProps)(CheckLogin(Login));