import axios from 'axios';
//GET CART
export function getCart(){
	return function(dispatch){
		axios.get('/api/cart')
		.then(function(response){
			dispatch({type:"GET_CART", payload:response.data})
		})
		.catch(function(err){
			dispatch({type:"GET_CART_REJECTED", msg:"error when getting the cart from session"})
		})
	}
}


//ADD TO CART
export function addToCart(cart) {
	return function(dispatch) {
		axios.post('/api/cart', cart)
			.then(function(response){
				dispatch({type:"ADD_TO_CART", payload:response.data})
			})
			.catch(function(err) {
				dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error when adding to the cart'})
			})
	}
}

export function updateCart(_id, unit, cart) {
	//create a copy of the current array of items
	const currentItemToUpdate = cart;
	//determine at which index in items array is the item to be updated
	const indexToUpdate = currentItemToUpdate.findIndex(
	function(item) {
	  return item._id === _id;
	}
	);
	//create a new items object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat methods too
	const newItemToUpdate = {
	...currentItemToUpdate[indexToUpdate],
	quantity: currentItemToUpdate[indexToUpdate].quantity + unit
	};
	//use slice to remove the item at the specified index, replace with the new object and concatenate with the rest of items in the array
	let cartUpdate = [...currentItemToUpdate.slice(0, indexToUpdate), newItemToUpdate,
    ...currentItemToUpdate.slice(indexToUpdate + 1)]
	return function(dispatch) {
	axios.post('/api/cart', cartUpdate)
		.then(function(response){
			dispatch({type:"UPDATE_CART", payload:response.data})
		})
		.catch(function(err) {
			dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when updating to the cart'})
		})
	}
}

export function deleteCartItem(cart) {
	return function(dispatch) {
		axios.post('/api/cart', cart)
			.then(function(response){
				dispatch({type:"DELETE_CART_ITEM", payload:response.data})
			})
			.catch(function(err) {
				dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: 'error when deleting an item from the cart'})
			})
	}
}