import React from 'react';
import './app.css';
// import * as Scroll from 'react-scroll';
import { Link } from 'react-router-dom';

export default function ItemNew() {
		return (
			<div className="add-item-container">
				<Link to="/items/new" id="add-new-item"><i className="fa fa-plus"></i></Link>
			</div>
		);
}

