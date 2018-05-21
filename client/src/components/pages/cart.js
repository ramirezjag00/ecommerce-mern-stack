import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Panel, Col, Row, Button, ButtonGroup, Label, Modal } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart, checkOut} from '../../actions/cartActions';
import { Link, withRouter } from 'react-router-dom';

class Cart extends Component {
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

	constructor() {
		super();
		this.state = {
			show: false,
			showCheckout: false
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
		return (<h1 style={{ textAlign:'center', marginTop:'20vh', marginBottom:'20vh'}}><p style={{color:'#303030'}}>NO ITEMS FOUND INSIDE THE CART :(</p> <Link to="/items">CONTINUE SHOPPING</Link></h1>)
	}
	renderCart(){
		//map over the items and return a new Panel containing the information of items
		const cartItemsList = this.props.cart.map(function(cartArr){
			return(
				<Panel key={cartArr._id}>
				<Panel.Body>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{cartArr.title}</h6><span>    </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>Php {cartArr.price}.00</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth:'300px'}}>
								<Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>-</Button>
								<Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this, cartArr._id)}>+</Button>
								<span>     </span>
								<Button 
									bsStyle="danger" 
									bsSize="small"
									onClick={this.onDelete.bind(this, cartArr._id)}
								>
								DELETE
								</Button>
							</ButtonGroup>
						</Col>
					</Row>
					</Panel.Body>
				</Panel>
			)
			//this make sure our onClick event is with the right context
		}, this)
		return(
			<Panel bsStyle="primary">
				<Panel.Heading>
      				<Panel.Title>Cart</Panel.Title>
    			</Panel.Heading>
				<Panel.Body>
					{cartItemsList}
					<Row>
						<Col xs={12}>
							<h6>Total Amount (Php): {this.props.totalAmount}</h6>
							<Button bsStyle="success" bsSize="small" onClick={this.handleShowVerification.bind(this)}>
								PROCEED TO CHECKOUT
							</Button>
						</Col>
					</Row>
					<Modal show={this.state.show} onHide={this.handleCloseVerification.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>Verification</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <h6>Are you sure you want to proceed?</h6>
			            	<p>Click on 'Cancel' to go back to cart or 'Proceed' to process</p>
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this.handleCloseVerification.bind(this)}>Close</Button>
			            <Button onClick={this.handleShowCheckout.bind(this)}>Proceed</Button>
			          </Modal.Footer>
			        </Modal>
					<Modal show={this.state.showCheckout} onHide={this.handleClose.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>Thank you!</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <h6>Your order has been saved</h6>
			            	<p>You will receive an email confirmation</p>
			          </Modal.Body>
			          <Modal.Footer>
			          	<Col xs={6}>
			          		<h6>Total Amount (Php): {this.props.totalAmount}</h6>
			          	</Col>
			            <Button onClick={this.handleClose.bind(this)}>Close</Button>
			          </Modal.Footer>
			        </Modal>
				</Panel.Body>
			</Panel>
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

