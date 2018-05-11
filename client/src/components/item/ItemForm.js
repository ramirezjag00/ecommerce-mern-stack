//ItemForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
//reduxForm allows us to communicate with redux store
//reduxForm nearly identical with connect of react-redux
//Field is a react component wired up automatically on redux-form
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ItemField from './ItemField';
// import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

import Dropzone from 'react-dropzone';
const FILE_FIELD_NAME = 'files';


const renderDropzoneInput = (field) => {
  const files = field.input.value;
  const FILE_LIST = files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      );
  return (
    <div>
      <div style={{fontSize: '0.89em', color: '#999', marginBottom:'2em'}}>Images</div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
   	>
        <div>Drop files, or click to upload.</div>
      </Dropzone>
      {<div className="red" style={{marginBottom: '20px'}}>
			{field.meta.touched && field.meta.error}
			</div>}
      {FILE_LIST}
    </div>
  );
}


class ItemForm extends Component {
	renderFields() {
		return _.map(formFields, ({label, name, type}) => {
			return <Field key={name} component={ItemField} type={type} label={label} name={name}/>
		});
	}

	render() {
		/*redux-form covers handleSubmit functionality by providing a respective handler that you pass as a prop - that is, a handleSubmit method for you to pass to onSubmit.

		With that in mind, you can think of the redux-form handleSubmit as a middle layer for your form's submit handler. Simply write your components as you normally would, passing handleSubmit where appropriate

		callback, onItemSubmit is from ItemNew.js
		*/

		return(
			<div className="form-container">
				<form
					
					onSubmit={this.props.handleSubmit(this.props.onItemSubmit)}
				>
					{this.renderFields()}
					<Field
            			name={FILE_FIELD_NAME}
            			component={renderDropzoneInput}
          			/>
          			{/*<div style={{marginBottom: '20px'}}>
					<label for="file">PDF (Max 5MB) | Image (Max 1MB)</label>
				<input type="file" id="file" name="file" accept="file/*" required="required" multiple />
			</div>*/}
					<Link to="/items" className="btn-back text-decoration">
						Cancel
					</Link>		
					<button className="btn-send" type="submit">
						NEXT
					</button>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	//this will return all invalid emails otherwise, undefined or nothing
	// errors.recipients = validateEmails(values.recipients || '');

	//works just like .map function, much better than using multiple if statements
	//if you want a custom error message for each field, customize function noValueError inside FIELDS array of objects and feed noValueError beside destructured name prop and define it on errors[name]
	_.each(formFields, ({name}) => {
		if(!values[name]){
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}
// destroyOnUnmount if true, by default, reduxform will kill the form that we are working on anytime the form is unmounted or no longer shown on the screen but if false, don't destroy the form, keep the form values
export default reduxForm({
	validate,
	form: 'itemForm',
	destroyOnUnmount: false
})(ItemForm);