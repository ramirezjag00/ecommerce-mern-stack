import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			//action.payload shows the user id and google id if logged in
			//if logged out, no IDs will show up on payload, so we want an or statement with false to make the whole statement false
			return action.payload || false;
		default:
			return state;
	}
}