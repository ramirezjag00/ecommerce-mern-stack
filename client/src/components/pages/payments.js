import React, { Component } from 'react';
// npm i -S react-stripe-checkout
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from '../../actions/authActions';

class Payments extends Component {
  render() {
    // debugger;
    // debugger to see actual js code generated by the StripeCheckout statement
    return (
    // this is the component of Stripe Checkout, basically the show form which we will call inside the Header Component
    // 4242 4242 4242 4242 is the cc number for testing
      <StripeCheckout
        name="Bazaar"
        description="Happy shopping!"
        // circular image added on top
        image="https://stickeroid.com/uploads/pic/full-pngimg/fae356278bf0370ddfb0eb7eef0a7f85c13f73f3.png"
        // total amount in string to no integer, * 100
        amount={parseInt(this.props.totalAmount, 10) * 100}
        // default USD
        currency="PHP"
        // default 'Pay'
        panelLabel="Total"
        // default true
        // if false shippingAddress={false}
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        shippingAddress
        billingAddress
        // allow remember me
        // default true
        allowRememberMe
        // token is expecting a cb function, which will be called after we successfully received an authorization token from the STRIPE API
        token={token => this.props.handleToken(token)}
        closed={this.props.onClick}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        { /* this will show a different look than other buttons since we want to have a unique feel on buttons pertaining to money/billing or anything related to draw the users eye */ }
        <button className="btn-send">
          Proceed
        </button>
      </StripeCheckout>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalAmount: state.cart.totalAmount,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleToken,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
