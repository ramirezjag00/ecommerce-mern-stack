//ITEMS REDUCERS
export function itemsReducers(state={
  items:[]
  }, action) {
  switch(action.type){
    case "GET_ITEMS":
      return {...state, items:[...action.payload]};

    case "POST_ITEM":
      return {...state, items:[...state.items, ...action.payload]};

    case "POST_ITEM_REJECTED":
      return {...state};

    case "RESET_BUTTON":
      return {...state};

    case "DELETE_ITEM":
    //create a copy of the current array of ITEMS
    const currentItemToDelete = [...state.items]
    //determine at which index in items array is the item to be deleted
    const indexToDelete = currentItemToDelete.findIndex(
      function(item){
        return item._id.toString() === action.payload;
      }
    )
    //use slice to remove the item at the specified index
  return {items: [...currentItemToDelete.slice(0, indexToDelete),
  ...currentItemToDelete.slice(indexToDelete + 1)]};

  case "UPDATE_ITEM":
  //create a copy of the current array of items
  const currentItemToUpdate = [...state.items];
  //determine at which index in items array is the item to be updated
  const indexToUpdate = currentItemToUpdate.findIndex(
    function(item) {
      return item._id === action.payload._id;
    }
  );
  //create a new items object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat methods too
  const newItemToUpdate = {
    ...currentItemToUpdate[indexToUpdate],
    title: action.payload.title
  };
  //this log has the purpose to show you how newItemToUpdate looks like
  console.log("what is it newItemToUpdate", newItemToUpdate);
  //use slice to remove the item at the specified index, replace with the new object and concatenate with the rest of items in the array
  return {items: [...currentItemToUpdate.slice(0, indexToUpdate), newItemToUpdate,
    ...currentItemToUpdate.slice(indexToUpdate + 1)]};
  default:
    return state;
  }
}