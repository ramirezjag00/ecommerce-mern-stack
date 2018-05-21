import React, {Component} from 'react';
// import {Image, Well, Col, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class Item extends Component {
	handleCart(){
		//item is an array made by current array in the state then append the new item to the cart every time we press the button
		const item = [...this.props.cart, {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			images: this.props.images,
			price: this.props.price,
			quantity: 1
		}]
		//CHECK IF CART IS EMPTY
		if(this.props.cart.length > 0){
			//CART IS NOT EMPTY
			let _id = this.props._id;

			let cartIndex = this.props.cart.findIndex(function(cart){
				return cart._id === _id;
			})
			//IF RETURNS -1 THERE ARE NO ITEMS WITH THE SAME ID
			if (cartIndex === -1) {
				this.props.addToCart(item);
			} else {
				//WE NEED TO UPDATE QUANTITY
				this.props.updateCart(_id, 1, this.props.cart);
			}
		} else {
			//CART IS EMPTY
			this.props.addToCart(item);
		}
	}
	// constructor(){
	// 	super();
	// 	this.state = {
	// 		isClicked:false
	// 	};
	// }

	// onReadmore(){
	// 	this.setState({isClicked: !this.state.isClicked});
	// }

	render() {
		return (
			<div className="item-container orange" key={this.props._id}>
				<img src={this.props.images} alt={this.props._id} />
				<i className="fa fa-eye" aria-hidden="true"></i>
				<p style={{marginTop:'15px'}}>{this.props.title}</p>
				{/*<h6>{(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0,50)):(this.props.description)}
					<button className="link" onClick={this.onReadmore.bind(this)}>
						{(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...read more'):('...read less')}
					</button>
				</h6>*/}
				<h6 style={{color:'#303030'}}>Php {this.props.price}.00</h6>
				<button onClick={this.handleCart.bind(this)}>Add to Cart</button>
            </div>
		)
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cart.cart
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		// addToCart:addToCart
		addToCart,
		//updateCart:updateCart
		updateCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);