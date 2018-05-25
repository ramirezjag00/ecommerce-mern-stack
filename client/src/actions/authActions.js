import axios from 'axios';

//GET USERS
export function fetchUser(){
	return function(dispatch){
	axios.get('/api/current_user')
		.then(function(response){
			dispatch({type: "FETCH_USER", payload: response.data})
		})
	}
}

//post action to handle token and show the credits in the header component
export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	//we assume that we're gonna get back the same user model, dispatch same action type, to update the user model inside of the auth reducer
	dispatch({type: "FETCH_USER", payload: res.data});
};