import axios from 'axios';

// GET ITEMS
export function getItems() {
  return (dispatch) => {
    axios.get('/api/items')
      .then((response) => {
        dispatch({ type: 'GET_ITEMS', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_ITEMS_REJECTED', payload: err });
      });
  };
}

// POST AN ITEM
export function postItems(item) {
  // whenever the action creator postItems is called, it will return a function, redux-thunk will check/use the function and will automatically call it with the dispatch. We then make a request,wait til we get response from the API, once we have the response, only in that point in  time we dispatch our action
  return (dispatch) => {
    // post http request using axios to "/items" as we have defined in the backend API, passing a item
    axios.post('/api/items', item)
      .then((response) => {
        // if only the promise, request response data, is fulfilled, dispatch payload.
        // we only care about that "data" property from the res output of axios request so we only need to pass the res.data
        dispatch({ type: 'POST_ITEM', payload: response.data });
      })
      // if in case there is an error, call this action and show an error message from the payload
      .catch((err) => {
        dispatch({ type: 'POST_ITEM_REJECTED', payload: 'there was an error while posting a new item' });
      });
  };
}

// SHOW ITEM
export function fetchItem(id) {
  return (dispatch) => {
    axios.get(`/api/items/${id}`)
      .then((response) => {
        // console.log(response.data);
        dispatch({ type: 'FETCH_ITEM', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ITEM_REJECTED', payload: err });
      });
  };
}

// DELETE A ITEM
export function deleteItems(id) {
  return (dispatch) => {
    axios.delete(`/api/items/${id}`)
      .then((response) => {
        dispatch({ type: 'DELETE_ITEM', payload: id });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_ITEM_REJECTED', payload: err });
      });
  };
}

// UPDATE A ITEM
export function updateItems(item) {
  return {
    type: 'UPDATE_ITEM',
    payload: item,
  };
}

// RESET FORM BUTTON
export function resetButton() {
  return {
    type: 'RESET_BUTTON',
  };
}
