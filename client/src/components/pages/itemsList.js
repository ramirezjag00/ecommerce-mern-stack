import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getItems} from '../../actions/itemsActions';
import {bindActionCreators} from 'redux';
import Item from './item';
// import BooksForm from './booksForm';
// import Cart from './cart';

class ItemsList extends Component {
	componentDidMount() {
		//Dispatch an action
		this.props.getItems();
	}
	render() {
		const itemsList = this.props.items.map(function(itemsArr){
			return(
				<div key={itemsArr._id}>
					<Item
						_id={itemsArr._id}
						title={itemsArr.title}
						description={itemsArr.description}
						images={itemsArr.images}
						price={itemsArr.price}
					/>       
				</div>
			)
		})
		return(
			<div className="products-list-container">
				<div className="products-list-flex" style={{marginTop: '15px'}}>
					{itemsList}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		items: state.items.items
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getItems
		}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);