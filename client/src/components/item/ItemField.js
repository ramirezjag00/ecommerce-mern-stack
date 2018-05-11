//ItemField contains logic to render a single label and text input
import React from 'react';
//props.input = {input}
//props event handlers from redux-form
//props label is what we can pass to Item form
//The props under the meta key are metadata about the state of this field that redux-form is tracking for you.
//nested destructuring for error and touched
export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			{/*redux form will handle this when we pass this as a value inside the Item form*/}
			{/*spread syntax for the event handler*/}
			<input {...input} style={{marginBottom: '5px'}} className="input-field" placeholder=" "/>
			<label>{label}</label>
			<div className="red" style={{marginBottom: '20px'}}>
			{touched && error}
			</div>
		</div>
	);
};
