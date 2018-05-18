import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actions from '../actions';
import ItemsForm from './pages/itemsForm';
import Home from './Home.js';
import Cart from './pages/cart';
import Linkbar from './Linkbar';
import Error404 from './Error404';
import Footer from './Footer.js';
// import ItemNew from './item/ItemNew';
// import requireAuth from './require_auth';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../actions/authActions';
import {getCart} from '../actions/cartActions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getCart();
  }

  renderContent() {
    //this props is produced by the auth reducer
    switch (this.props.auth) {
      //null is making request to backend to get current user
      case null:
        return;
      //false is request done, user *is not* logged in
      case false:
        return;
      //User Model request complete, user is logged in  
      default:
        return (
        // =======================
	        // insert query from db for admin id if you don't want to hardcode
	        // or put this id in config file
	        // current user === admin ID
	    // =======================
         this.props.auth._id === '5afe5a680f91e041c2b72a5f' ? <Route path="/admin" component={ItemsForm} /> : ("")
        );
    }
  }

	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="app_container">
						<Linkbar cartItemsNumber={this.props.totalQty}/>
						<Switch>		
						<Route exact path="/" component={Home} />
						<Route path="/items" component={Home} />
					{/*access admin route only when logged in*/}
						{ this.renderContent() }
						<Route path="/cart" component= {Cart} />
						
						<Route component={Error404} />
						</Switch>
						<Footer />	
					</div>
				</BrowserRouter>	
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    totalQty: state.cart.totalQty,
    auth: state.auth
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
