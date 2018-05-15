import React, { Component } from 'react';
// import Carousel from './carousel/Carousel.js';
import Hero from './home/Hero.js';
import Hero2 from './home/Hero2.js';
import Icon from './home/Icon.js';
import ProductsList from './home/ProductsList.js';
import './app.css';

class Home extends Component {
	render() {
		return (
			<div>
				{/*<Carousel />*/}
				<Hero />
				<Hero2 />
				<Icon />
				<ProductsList />
			</div>
		);
	}
}

export default Home;