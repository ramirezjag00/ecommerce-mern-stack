import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postItems, deleteItems, getItems, resetButton} from '../../actions/itemsActions';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ItemsForm extends Component {
	constructor(){
		super();
		this.state = {
			images: [{}],
			img:'',
			show: false,
			disabledDelete: true,
			value: "",
			// disabledSave: true,
			// text: '',
		}
	};

	componentDidMount(){
		this.props.getItems();
		//GET IMAGES FROM API
		axios.get('/api/images')
			.then(function(response){
				this.setState({images:response.data})
			}.bind(this))
			.catch(function(err) {
				this.setState({images:'error loading image files from the server', img:''})
			}.bind(this))
	};

	handleShowVerification(){
		this.setState({show: true})
	};

	handleCloseVerification() {
		this.setState({show: false});
	};

	handleSubmit() {
		const item = [{
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			images: findDOMNode(this.refs.image).value,
			price: findDOMNode(this.refs.price).value
		}]
		this.props.postItems(item);
	};

	onDelete(){
		let itemId = findDOMNode(this.refs.delete).value;

		this.props.deleteItems(itemId);
		this.setState({show: false});
		this.setState({disabledDelete: true});
	};

	handleSelect(img) {
		this.setState({
				img:'/images/' + img
		})
	};

	resetForm(){
		//RESET THE BUTTON
		this.props.resetButton();
		//RESET FORM TO BLANK
		findDOMNode(this.refs.title).value = '';
		findDOMNode(this.refs.description).value = '';
		findDOMNode(this.refs.price).value = '';
		this.setState({img:''});
		this.props.history.push('/items');
	};

	isToggledDelete = (e) => {
		this.setState({value: e.target.value});
		this.setState({disabledDelete: false});
	};

	// handleChange = (e) => {
	// 	this.setState({text: e.target.text});
	// 	this.setState(e.target.text === '' ? {disabledSave: true}:{disabledSave: false});
	// };

	render() {
		const itemsList = this.props.items.map(function(itemsArr){
			return (
				<option key={itemsArr._id} value={itemsArr._id}>{itemsArr._id}</option>
			)
		});

		const imgList = this.state.images.map(function(imgArr, i) {
			return(
				<li key={i} eventKey={imgArr.name}
				onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</li>
			)
		}, this);

		return(
				<div className="form-container">
	<div className="form-flex">
		<div className="form-image-container">
			<div className="dropdown-container">
	  			<input value={this.state.img} type="text" ref="image"/>
	  			<button className="input-dropdown-addon" id="input-dropdown-addon" title="Select an image">Dropdown</button>
	  			<ul id="dropdown-content" className="dropdown-content">
	  				{imgList}
	  			</ul>
			</div>
			<img src={this.state.img} alt={this.state.img} className="form-image-view"/>
		</div>
		<div className="form-field-container">
			<div className="fields-container">
				<div>
					<label>Title</label>
					<input type="text" placeholder="Enter Title" ref="title" value={this.state.text} onChange={this.handleChange}/>
				</div>
				<div>
					<label>Description</label>
					<input type="text" placeholder="Enter description" ref="description" value={this.state.text} onChange={this.handleChange}/>
				</div>
				<div>
					<label>Price</label>
					<input type="number" placeholder="Enter Price" ref="price" value={this.state.text} onChange={this.handleChange}/>
				</div>
				<button 
						onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
						style={(!this.props.style)?("primary"):(this.props.style)}>
						{(!this.props.msg)?("Save item"):(this.props.msg)}
				</button>
			</div>
			<div className="delete-item-container">
				<div className="select-container">
					<div>
						<label>Select an item id to delete</label>
						<select ref="delete" placeholder="select" value={this.state.value} onChange={this.isToggledDelete}>
							<option value="">select</option>
								{itemsList}
						</select>
					</div>
					<button disabled={this.state.disabledDelete} onClick={this.handleShowVerification.bind(this)} className="btndanger">Delete Item</button>
				</div>
				<div className="modal-container">
			<div className="modal-header">
				<div className="modal-title">
					Verification
				</div>
				<span className="modal-close" onClick={this.handleCloseVerification.bind(this)}>x</span>
			</div>
			<div className="modal-body">
				<h6>Are you sure you want to proceed?</h6>
			    <p>Click on 'Cancel' to go back to cart or 'Proceed' to process</p>
			</div>
			<div className="modal-footer">
				<button onClick={this.handleCloseVerification.bind(this)}>Close</button>
				<button onClick={this.onDelete.bind(this)}>Delete</button>
			</div>
		</div>
			</div>
		</div>
	</div>
</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		items: state.items.items,
		msg: state.items.msg,
		style: state.items.style,
		validation: state.items.validation
	}
}

function mapsDispatchToProps(dispatch) {
	return bindActionCreators({
		postItems,
		deleteItems,
		getItems,
		resetButton
	}, dispatch)
}

export default connect(mapStateToProps, mapsDispatchToProps)(withRouter(ItemsForm));