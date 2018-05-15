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