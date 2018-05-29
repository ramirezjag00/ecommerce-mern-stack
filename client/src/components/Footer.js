import React, { Component } from 'react';
// import LinkBar from './header/LinkBar.js';
// import SearchBar from './header/SearchBar.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemNew from './ItemNew';
import CartSide from './cartSide';
import ScrollToTop from './ScrollToTop';
import { getCart } from '../actions/cartActions';
import './app.css';

class Footer extends Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    return (
      <div>
        <ItemNew />
        <CartSide cartItemsNumber={this.props.totalQty} />
        <ScrollToTop />
        <div className="footer">
          <div className="footer-container">
            <ul className="footer-ul">
              <li>COMPANY</li>
              <li><Link to="#">Contact Us</Link></li>
              <li><Link to="#">Terms and Conditions</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Safety and Compliance</Link></li>
            </ul>
          </div>
          <div className="footer-container">
            <ul className="footer-ul">
              <li>EXPLORE</li>
              <li><Link to="#">Community</Link></li>
              <li><Link to="#">Videos</Link></li>
              <li><Link to="#">Dealer Locator</Link></li>
            </ul>
          </div>
          <div className="footer-container">
            <ul className="footer-ul">
              <li>ORDERS</li>
              <li><Link to="#">Store</Link></li>
              <li><Link to="#">Gift Cards</Link></li>
              <li><Link to="#">Support</Link></li>
            </ul>
          </div>
          <div className="footer-container">
            <ul className="footer-ul">
              <li>SOCIAL</li>
              <li><Link to="#">Facebook</Link></li>
              <li><Link to="#">Instagram</Link></li>
              <li><Link to="#">Youtube</Link></li>
              <li><Link to="#">Twitter</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalQty: state.cart.totalQty,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCart,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
