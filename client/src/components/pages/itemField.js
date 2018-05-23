import React from 'react';

export default ({ input, label, name, type, meta: { error, touched } }) => {
	return (
		<div>
			{/*redux form will handle this when we pass this as a value inside the survey form*/}
			{/*spread syntax for the event handler*/}
			<input {...input} type={type} name={name}/>
			<label>{label}</label>
			<div className="red">
			{touched && error}
			</div>
		</div>
	);
};