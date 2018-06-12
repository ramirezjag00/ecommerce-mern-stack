import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
import _ from 'lodash';
import { reduxForm, Field, reset } from 'redux-form';
import { postItems, deleteItems, getItems, resetButton } from '../../actions/itemsActions';
import ItemField from './itemField';
import formFields from './formFields';
import dropDownFormField from './dropDownFormField';
// import dropDownField from './dropDownField';

class ItemsForm extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.handleShowVerification = this.handleShowVerification.bind(this);
    this.handleShowDropDown = this.handleShowDropDown.bind(this);
    this.handleCloseVerification = this.handleCloseVerification.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.isToggledDelete = this.isToggledDelete.bind(this);
    this.state = {
      images: [{}],
      img: '',
      show: false,
      disabledDelete: true,
      value: '',
      dropdownToggle: false,
      // disabledSave: true,
      // text: '',
    };
  }

  componentDidMount() {
    this.props.getItems();
    // GET IMAGES FROM API
    axios.get('/api/images')
      .then(function (response) {
        this.setState({ images: response.data });
      }.bind(this))
      .catch(function (err) {
        this.setState({ images: 'error loading image files from the server', img: '' });
      }.bind(this));
  }

  onDelete() {
    const itemId = findDOMNode(this.refs.delete).value;
    this.props.deleteItems(itemId);
    this.setState({ show: false });
    this.setState({ disabledDelete: true });
  }

  handleShowVerification() {
    this.setState({ show: true });
  }

  handleShowDropDown() {
    this.setState({ dropdownToggle: !this.state.dropdownToggle });
  }

  handleCloseVerification() {
    this.setState({ show: false });
  }

  handleSelect(img) {
    this.setState({ img: `/images/${img}` });
    this.setState({ dropdownToggle: !this.state.dropdownToggle });
  }

  handleReset() {
    this.setState({ img: '' });
  }

  dropDownField = ({ input, type, name, label }) => {
    return (
      <div>
        <input {...input} type={type} name={name} value={this.state.img} />
        <label>{label}</label>
      </div>
    );
  }

  isToggledDelete(e) {
    this.setState({ value: e.target.value });
    this.setState({ disabledDelete: false });
  }

  renderDropDown() {
    return _.map(dropDownFormField, ({ name, type, label }) =>
      <Field key={name} component={this.dropDownField} type={type} name={name} label={label} />);
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type }) =>
      <Field key={name} component={ItemField} type={type} label={label} name={name} />);
  }

  render() {
    const dropDownDisplay = this.state.dropdownToggle ? 'block' : 'none';
    const showModal = this.state.show ? 'block' : 'none';
    const itemsList = this.props.items.map(itemsArr =>
      <option key={itemsArr._id} value={itemsArr._id}>{itemsArr._id}</option>);
    const imgList = this.state.images.map((imgArr, i) =>
      (
        <li
          key={i}
          onClick={this.handleSelect.bind(this, imgArr.name)}
          role="presentation"
          onKeyDown={this.handleSelect.bind(this, imgArr.name)}
        >
          {imgArr.name}
        </li>
      ), this);

    return (
      <div className="form-container">
        <div className="form-flex">
          <form onSubmit={this.props.handleSubmit(this.props.postItems)}>
            <div className="form-image-container">
              <div className="dropdown-container">
                {this.renderDropDown()}
                <button className="btn-dropdown" id="input-dropdown-addon" title="Select an image" type="button" onClick={this.handleShowDropDown}>Images</button>
                <ul id="dropdown-content" className="dropdown-content" style={{ display: dropDownDisplay }}>
                  {imgList}
                </ul>
              </div>
            </div>
            <div className="fields-container">
              {this.renderFields()}
              <button className="btn-send" type="submit" onClick={this.handleReset}>
                Save Item
              </button>
            </div>
          </form>
          <div className="form-field-container">
            <div className="delete-item-container">
              <div className="select-container">
                <label>Select an item id to delete</label>
                <select placeholder="select" ref="delete" value={this.state.value} onChange={this.isToggledDelete}>
                  <option value="">select</option>
                  {itemsList}
                </select>
                { /* <button disabled='true' className="btn-danger">Delete Item</button> */ }
                <button disabled={this.state.disabledDelete} onClick={this.handleShowVerification} className="btn-danger" type="button">Delete Item</button>
              </div>
              <img src={this.state.img} alt={this.state.img} className="form-image-view" />
              <div className="modal-wrapper" style={{ display: showModal }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="modal-title">
                      Verification
                    </div>
                    <span className="modal-close" role="button" tabIndex="0" onKeyDown={this.handleCloseVerification} onClick={this.handleCloseVerification}>&times;</span>
                  </div>
                  <div className="modal-body">
                    <h4>Are you sure you want to proceed?</h4>
                    <p>Click on &apos;Cancel&apos; to go back to cart or &apos;Delete&apos; to proceed</p>
                  </div>
                  <div className="modal-footer">
                    <button onClick={this.handleCloseVerification} className="btn-default">Close</button>
                    <button onClick={this.onDelete} className="btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'REQUIRED';
    }
  });
  return errors;
};

function mapStateToProps(state) {
  return {
    items: state.items.items,
  };
}

function mapsDispatchToProps(dispatch) {
  return bindActionCreators({
    postItems,
    deleteItems,
    getItems,
    resetButton,
  }, dispatch);
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('itemForm'));

ItemsForm = connect(mapStateToProps, mapsDispatchToProps)(ItemsForm);

export default reduxForm({
  validate,
  form: 'itemForm',
  destroyOnUnmount: true,
  onSubmitSuccess: afterSubmit,
})(ItemsForm);
