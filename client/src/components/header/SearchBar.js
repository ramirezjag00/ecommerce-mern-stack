import React, { Component } from 'react';
import SearchBox from './SearchBox.js';
import Logo from './Logo.js';
import Cart from './Cart.js';
import '../app.css';

class SearchBar extends Component {
 

  render() {

    return (
	    	<div className="search-bar">
	    		<Logo /> 
	    		<SearchBox /> 
	    		<Cart /> 
	    	</div>
    );
  }
}

export default SearchBar;