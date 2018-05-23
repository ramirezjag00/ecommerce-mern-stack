import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart, checkOut} from '../../actions/cartActions';
import { Link, withRouter } from 'react-router-dom';

class Cart extends Component {
	constructor() {
		super();
		this.state = {
			show: false,
			showCheckout: false
		}
	}

	componentDidMount(){
			this.props.getCart();
	}

	onDelete(_id) {

		//create a copy of the current array of cart
    const currentItemToDelete = this.props.cart;
    //determine at which index in items array is the item to be deleted
    const indexToDelete = currentItemToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    //use slice to remove the item at the specified index
  let cartAfterDelete = [...currentItemToDelete.slice(0, indexToDelete),
  ...currentItemToDelete.slice(indexToDelete + 1)]

		//passing a new cart array after deletetion
		this.props.deleteCartItem(cartAfterDelete);
	}

	onIncrement(_id){
		this.props.updateCart(_id, 1, this.props.cart);
	}

	onDecrement(_id, quantity){
		if(quantity > 1 ) {
			this.props.updateCart(_id, -1, this.props.cart); 	
		}
	}

	handleShowCheckout(){
		this.props.checkOut()
		this.setState({showCheckout: true})
	}

	handleShowVerification(){
		this.setState({show: true})
	}

	handleClose(_id){
		this.props.history.push('/items');
		this.setState({show: false});

		//create a copy of the current array of cart
	    const items = this.props.cart;
	    //determine at which index in items array is the item to be deleted

    	//use slice to remove the item at the specified index
  		let cartAfterDelete = items.filter(item => item.length < 0)

		//passing a new cart array after deletetion
		this.props.deleteCartItem(cartAfterDelete);
	}

	handleCloseVerification() {
		this.setState({show: false});
	}

	render() {
		//render cart if atleast we have 1 item in it

		if(this.props.cart[0]){
			return this.renderCart();
		} else {
			return this.renderEmpty();
		}
	}
	renderEmpty() {
		return (<h1 style={{ textAlign:'center', marginTop:'20vh', marginBottom:'20vh'}}><p style={{color:'#303030', lineHeight:'1.5em'}}>NO ITEMS FOUND INSIDE THE CART :(</p> <Link className="text-decoration" to="/items">CONTINUE SHOPPING</Link></h1>)
	}
	renderCart(){
		const showVerification = this.state.show ? 'block': 'none';
		const showCheckout = this.state.showCheckout ? 'block': 'none';
		//map over the items and return a new Panel containing the information of items
		const cartItemsList = this.props.cart.map(function(cartArr){
			return(
				<div key={cartArr._id}>
	<div className="cart-item-container">
		<div>{cartArr.title}</div>
		<div>Php {cartArr.price}.00</div>
		<div>qty. <span className="quantity">{cartArr.quantity}</span></div>
		<div className="cart-button-container">
			<button className="btn-qty btn-rwd" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>-</button>
			<button className="btn-qty btn-rwd" onClick={this.onIncrement.bind(this, cartArr._id)}>+</button>
			<button 
			className="btn-danger btn-rwd"
			onClick={this.onDelete.bind(this, cartArr._id)}
			>
			DELETE
			</button>
		</div>
</div>
</div>
			)
			//this make sure our onClick event is with the right context
		}, this)
		return(
			<div className="cart-container">
	<div className="cart-title"><div>Cart</div></div>
	<div className="cart-items-list">
		{cartItemsList}
		<div className="total-container">
			<div>Total Amount (Php): {this.props.totalAmount}</div>
			<button className="btn-send" onClick={this.handleShowVerification.bind(this)}>
								PROCEED TO CHECKOUT
							</button>
		</div>
		<div className="modal-wrapper" style={{display: showVerification}}>
			<div className="modal-content">
				<div className="modal-header">
					<div className="modal-title">
						Verification
					</div>
					<span className="modal-close" onClick={this.handleCloseVerification.bind(this)}>&times;</span>
				</div>
				<div className="modal-body">
					<p>Are you sure you want to proceed?</p>
				    <p>Click on 'Cancel' to go back to cart or 'Proceed' to process</p>
				</div>
				<div className="modal-footer">
					<button onClick={this.handleCloseVerification.bind(this)} className='btn-default'>Close</button>
				            <button onClick={this.handleShowCheckout.bind(this)} className='btn-send'>Proceed</button>
				</div>
			</div>
		</div>
		<div className="modal-wrapper" style={{display: showCheckout}}>
			<div className="modal-content">
				<div className="modal-header">
					<div className="modal-title">
						Thank you!
					</div>
					<span className="modal-close" onClick={this.handleClose.bind(this)}>&times;</span>
				</div>
				<div className="modal-body">
					<h6>Your order has been saved</h6>
				    <p>You will receive an email confirmation</p>
				</div>
				<div className="modal-footer">
					<h6>Total Amount (Php): {this.props.totalAmount}</h6>
					<button onClick={this.handleClose.bind(this)} className='btn-default'>Close</button>
				</div>
			</div>
		</div>
	</div>
</div>
		)
	}
}

//returns the cart array from the state
function mapStateToProps(state) {
	return {
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		// deleteCartItem:deleteCartItem
		deleteCartItem,
		// updateCart: updateCart,
		updateCart,
		//getCart: getCart
		getCart,
		checkOut
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));

