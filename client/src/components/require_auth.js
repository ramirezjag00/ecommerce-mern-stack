//the purpose of higher order component is that it wraps a component that we already created and in result, will produce an Enhanced or Composed Component, a component that has additional functionalities or data

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";

//HOC
export default function(ComposedComponent) { 
	class Authentication extends Component {
		//life cycle method
		//componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
		componentDidMount() {
			//if not loggedIn
			//push back from history, '/' route
			//if just logged out, push back to '/' route
			if(!this.props.auth) {
				this.props.history.push('/');
			}
		}

		render() {
			//ComposedComponent is the parameter that receives all props
			//pass in all props to the wrapped component 'Secret' in this case
			return <ComposedComponent {...this.props}/>
		}
	}
	//gets the state from the reducers to provider
	function mapStateToProps(state) {
		//state is from the parameter
		//.auth is from auth reducer 'auth' which holds the new value of state
		//now we can use this.props.auth
		return { auth: state.auth }; 
	}

	//connect wraps header component to communicate with provider (the one that communicates with reducers when something has been changed) and this tells provider when an action has been triggered/something has been changed 

	//You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
	return connect(mapStateToProps)(withRouter(Authentication));
}
