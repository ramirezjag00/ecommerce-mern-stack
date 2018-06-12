import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './app.css';
// import * as Scroll from 'react-scroll';

class ItemNew extends Component {
  renderItemNewButton() {
    // this props is produced by the auth reducer
    switch (this.props.auth) {
      // null is making request to backend to get current user
      case null:
        return;
      // false is request done, user *is not* logged in
      case false:
        return ('');
      // User Model request complete, user is logged in
      default:
        return (
        // =======================
        // insert query from db for admin id if you don't want to hardcode
        // or put this id in config file
        // current user === admin ID
        // =======================
          this.props.auth._id === '5afe5a680f91e041c2b72a5f' ?
            <div className="add-item-container">
              <Link to="/admin" id="add-new-item"><i className="fa fa-plus"></i></Link>
            </div>
            : ('')
        );
    }
  }

  render() {
    // after request console log id of current user
    /* this.props.auth === null? console.log(null) : console.log(this.props.auth._id) */
    return (
      <div>{this.renderItemNewButton()}</div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(ItemNew);

