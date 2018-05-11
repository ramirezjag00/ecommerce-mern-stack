import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../../actions';

class ItemList extends Component {
	componentDidMount() {
		this.props.fetchItems();
	}

	renderItems() {
		return this.props.items.reverse().map(item => {
			return(
				<div className="item-container orange" key={item.id}>
                  <img src='../../../uploads/{item.image[0]}' alt="p1" />
                  <i className="fa fa-eye" aria-hidden="true"></i>
                  <p>{item.name}</p>
                  <button>Add to Cart</button>
                </div>
			)
		})
	}

	render() {
		return (
			<div>
				{this.renderItems()}
			</div>
		);
	}
}

function mapStateToProps({items}) {
	return { items };
}

export default connect(mapStateToProps, {fetchItems})(ItemList);