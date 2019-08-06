import React from 'react';
import 'react-bulma-components/full';
import requireAuth from './requireAuth';
import { connect } from 'react-redux'


class Table extends React.Component {

	constructor(props){
		super(props);
		this.onClick = this.onClick.bind(this)

	}

	onClick(){
		localStorage.removeItem('token')
		this.setState({login: false})
		this.props.isNotLoggedIn();
	}

	componentDidMount(){
			if(localStorage.getItem('token')){
				this.props.isLoggedIn();
			}else{
				this.props.isNotLoggedIn();
			}
			
		}

	render() {

		return (
				<div>
					<table className="table is-striped">
						<thead>
							<tr>
								<td>Challenge</td>
								<td>Input</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>XSS</td>
								<td>
									<div className="field">
						              <div className="control">
						                <input className="input" id="name" type="text" placeholder="Text input"/>
						              </div>
						            </div>
						        </td>
							</tr>
						</tbody>
					</table>
						<div className="control">
		                  <button className="button is-link" onClick={this.onClick}>Log Out</button>
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

export default connect( mapStateToProps, matchDispatchToProps )(requireAuth(Table));