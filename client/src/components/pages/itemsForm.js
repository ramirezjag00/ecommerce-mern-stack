import React, {Component} from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Panel, FormControl, FormGroup, ControlLabel, Button, Modal} from 'react-bootstrap';
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
			text: ''
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
		this.setState({disabled: !this.state.disabled});
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
		this.props.history.push('/');
	};

	isToggledDelete = (e) => {
		this.setState({value: e.target.value});
		this.setState({disabledDelete: !this.state.disabledDelete});
	};

	handleChange = (e) => {
		this.setState({text: e.target.text});
		this.setState({disabledSave: !this.state.disabledSave});
	};

	render() {
		const itemsList = this.props.items.map(function(itemsArr){
			return (
				<option key={itemsArr._id} value={itemsArr._id}>{itemsArr._id}</option>
			)
		});

		const imgList = this.state.images.map(function(imgArr, i) {
			return(
				<MenuItem key={i} eventKey={imgArr.name}
				onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
			)
		}, this);

		return(
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<Panel.Body>
								<InputGroup>
									<FormControl type="text" ref="image" value={this.state.img}/>
									<DropdownButton
									componentClass={InputGroup.Button}
									id="input-dropdown-addon"
									title="Select an image"
									bsStyle="primary"
									>
										{imgList}
									</DropdownButton>
								</InputGroup>
								<Image src={this.state.img} responsive/>
							</Panel.Body>
						</Panel>
					</Col>
					<Col xs={12} sm={6}>
						<Panel>
				<Panel.Body>
					<FormGroup controlId="title" validationState={this.props.validation}>
						<ControlLabel>
							Title
						</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Title"
							ref="title" 
							value={this.state.text}
							onChange={this.handleChange}/>
							<FormControl.Feedback />
					</FormGroup>
					<FormGroup controlId="description" validationState={this.props.validation}>
						<ControlLabel>
							Description
						</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Description"
							ref="description" 
							value={this.state.text}
							onChange={this.handleChange}/>
							<FormControl.Feedback />
					</FormGroup>
					<FormGroup controlId="price" validationState={this.props.validation}>
						<ControlLabel>
							Price
						</ControlLabel>
						<FormControl
							type="number"
							placeholder="Enter Price"
							ref="price"
							value={this.state.text}
							onChange={this.handleChange}/>
							<FormControl.Feedback />
					</FormGroup>
					<Button disabled={(this.state.text === '' && this.state.img === '')? true :  false}
						onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
						bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
						{(!this.props.msg)?("Save item"):(this.props.msg)}
					</Button>
					</Panel.Body>
				</Panel>
				<Panel>
					<Panel.Body style={{maginTop:'25px'}}>
					    <FormGroup controlId="formControlsSelect">
							<ControlLabel>Select an item id to delete</ControlLabel>
							<FormControl ref="delete" componentClass="select" placeholder="select" value={this.state.value} onChange={this.isToggledDelete}>
								<option value="">select</option>
								{itemsList}
							</FormControl>
					    </FormGroup>
					    <Button disabled={this.state.disabledDelete} onClick={this.handleShowVerification.bind(this)} bsStyle="danger">Delete Item</Button>
					    <Modal show={this.state.show} onHide={this.handleCloseVerification.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>Verification</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <h6>Are you sure you want to proceed?</h6>
			            	<p>Click on 'Cancel' to go back to cart or 'Proceed' to process</p>
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this.handleCloseVerification.bind(this)}>Close</Button>
			            <Button onClick={this.onDelete.bind(this)}>Delete</Button>
			          </Modal.Footer>
			        </Modal>
					</Panel.Body>
				</Panel>
					</Col>
				</Row>
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