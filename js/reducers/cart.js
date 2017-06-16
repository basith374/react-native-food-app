const initialState = {
  items: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      let items = state.items;
      return {
        ...state,
        items
      }
    default:
      return state;
  }
}
