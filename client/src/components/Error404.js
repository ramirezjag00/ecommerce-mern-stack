import React from 'react';
import { Link} from 'react-router-dom';

export default function() {
	return (
		<h1 style={{ textAlign:'center', marginTop:'20vh', marginBottom:'20vh'}}><p style={{color:'#303030', lineHeight:'1.5em'}}>Ooooops! Error 404: You're trying to access a page that doesn't exist. :(</p> <Link className="text-decoration" to="/items">CONTINUE SHOPPING</Link></h1>

	);
}