import React, { Component } from 'react';
import { BrowserRouter, Route, /*Switch*/} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Home from './Home.js';
import Footer from './Footer.js';
import Header from './Header';
import ItemNew from './item/ItemNew';
class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="app_container">
						{/*<Switch>*/}	
							<Header />		
							<Route exact path="/" component={Home} />
							<Route exact path="/items" component={Home} />
							<Route path="/items/new" component={ItemNew} />
							<Footer />	
						{/*</Switch>*/}
					</div>
				</BrowserRouter>	
			</div>
		);
	}
}

export default connect(null, actions)(App);
// export default App;
