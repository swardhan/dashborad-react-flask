import React from 'react';
import { connect } from 'react-redux'; 

export default function(ComposedComponent){
	class Authenticate extends React.Component {

		componentDidMount(){
			if(!this.props.login){
				this.props.history.push('/login')
			}
			
		}

		componentDidUpdate(){
			if(!this.props.login){
				this.props.history.push('/login')
			}
			
		}

		render(){
			return (
					<ComposedComponent {...this.props} />
				)
		}
	}

	return connect(null, null)(Authenticate)
}


