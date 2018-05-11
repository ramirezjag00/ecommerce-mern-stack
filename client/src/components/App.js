import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actions from '../actions';
import ItemsForm from './pages/itemsForm';
import Home from './Home.js';
import Cart from './pages/cart';
import Linkbar from './Linkbar';
import Footer from './Footer.js';
// import ItemNew from './item/ItemNew';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../actions/authActions';
import {getCart} from '../actions/cartActions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getCart();
  }
	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="app_container">
						<Linkbar cartItemsNumber={this.props.totalQty}/>		
						<Route exact path="/" component={Home} />
						<Route exact path="/items" component={Home} />
						<Route exact path="/admin" component={ItemsForm} />
						<Route exact path="/cart" component= {Cart} />
						<Footer />	
					</div>
				</BrowserRouter>	
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    totalQty: state.cart.totalQty
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchUser,
    getCart
    // getCart: getCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
