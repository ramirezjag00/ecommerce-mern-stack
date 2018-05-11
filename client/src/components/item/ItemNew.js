//ItemNew shows the ItemForm and the ItemFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ItemForm from './ItemForm';
import ItemFormReview from './ItemFormReview';
import '../app.css';
class ItemNew extends Component {
	//equal to the ff
	// 	constructor(props) {
	// 		super(props);
	// 		this.state = { new : true };
	// 	}
	state = { showFormReview: false };

	renderContent() {
		if ( this.state.showFormReview ) {
			return (
				<ItemFormReview 
					onCancel={() => this.setState({ showFormReview: false})}
				/>
			);
		}
		//totally okay to not put this in an else statement
		//will return ItemForm component while state showFormReview is true
		return (
			<ItemForm
			//callback for setting the state showFormReview to true
				onItemSubmit={() => this.setState({ showFormReview : true })}
			/>
		);
	}



	render() {
		return(
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

//this will solve issue of values in the form when navigating with ItemNew cancel and add Item on Dashboard
//if we navigate away from Itemnew (Item form and Itemform review) dump all the values
export default reduxForm({
	form: 'itemForm'
})(ItemNew);