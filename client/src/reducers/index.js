import { combineReducers } from 'redux';
// import { reducer as reduxForm } from 'redux-form';
import {authReducer} from './authReducer';
import {itemsReducers} from './itemsReducer';
import {cartReducers} from './cartReducer';

export default combineReducers({
	auth: authReducer,
	items: itemsReducers,
	cart: cartReducers
})