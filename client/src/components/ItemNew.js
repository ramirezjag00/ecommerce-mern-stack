import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.css';
// import * as Scroll from 'react-scroll';
import { Link } from 'react-router-dom';

class ItemNew extends Component {

	renderItemNewButton() {
	    //this props is produced by the auth reducer
	    switch (this.props.auth) {
	      //null is making request to backend to get current user
	      case null:
	        return;
	      //false is request done, user *is not* logged in
	      case false:
	        return ("");
	      //User Model request complete, user is logged in  
	      default:
	        return (
	         <div className="add-item-container">
				<Link to="/admin" id="add-new-item"><i className="fa fa-plus"></i></Link>
			</div>
	        );
	    }
  	}

	render() {
		return (
			<div>{this.renderItemNewButton()}</div>
		);
	}
}

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps)(ItemNew);