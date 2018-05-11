import React from 'react';
import LinkBar from './header/LinkBar.js';
// import SearchBar from './header/SearchBar.js';
import './app.css';


export default function Header() {

    return (
    	<div className="home">
       		<LinkBar />
       		{/*<SearchBar />*/}
       	</div>
    );
}