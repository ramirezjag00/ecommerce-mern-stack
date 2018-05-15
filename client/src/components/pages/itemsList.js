import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getItems} from '../../actions/itemsActions';
import {bindActionCreators} from 'redux';
import {Grid, Col, Row} from 'react-bootstrap';
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
				<Col xs={12} sm={6} md={4} key={itemsArr._id}>
					<Item
						_id={itemsArr._id}
						title={itemsArr.title}
						description={itemsArr.description}
						images={itemsArr.images}
						price={itemsArr.price}
					/>       
				</Col>
			)
		})
		return(
			<Grid>
				<Row style={{marginTop: '15px'}}>
					{itemsList}
				</Row>
			</Grid>
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