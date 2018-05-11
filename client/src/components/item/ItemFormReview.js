//ItemFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

//property list
const ItemFormReview = ({onCancel, formValues, submitItem, history}) => {
	//({name, label}) es6 destructuring for field for field.name and field.label
	const reviewFields = _.map(formFields, ({name, label}) => {
		return (
			<div key={name} className="form-item-container">
				<label className="form-item-label">{label}</label>
				<div className="form-item-values">
					{formValues[name]}
				</div>
			</div>
		);
	});

	return (
		<div className="form-review-container">
			<h1 className="h1">Please confirm your entries</h1>
			{reviewFields}
			<button 
				className="btn-back" 
				onClick={onCancel}>
				Back
			</button>
			<button 
				onClick={() => submitItem(formValues, history)}
				className="btn-send">
				Add Item
			</button>
		</div>
	);
};
// taking our redux state and transforming it to redux props to send down to the component

function mapStateToProps(state) {
		/*check this by console.log(state)*/
		return { formValues: state.form.itemForm.values };
}

//You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
export default connect(mapStateToProps, actions)(withRouter(ItemFormReview));