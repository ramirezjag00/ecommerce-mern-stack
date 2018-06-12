import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './app.css';
// import * as Scroll from 'react-scroll';

class CartSide extends Component {
  renderCartSide() {
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
          <div className="cart-side-container">
            <Link to="/cart" id={(this.props.cartItemsNumber > 0) ? 'cart-side-plus' : 'cart-side'}> { (this.props.cartItemsNumber > 0) ? (<span>{this.props.cartItemsNumber}</span>) : ('') } <i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
          </div>
        );
    }
  }

  render() {
    return (
      <div>{this.renderCartSide()}</div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(CartSide);
