import React from 'react';
import { connect } from 'react-redux'; 

export default function(ComposedComponent){
	class CheckLogin extends React.Component {

		componentDidMount(){
			if(this.props.login){
				this.props.history.push('/table')
			}
			
		}

		componentDidUpdate(){
			if(!this.props.login){
				this.props.history.push('/table')
			}
			
		}

		render(){
			return (
					<ComposedComponent {...this.props} />
				)
		}
	}

	return connect(null, null)(CheckLogin)
}


