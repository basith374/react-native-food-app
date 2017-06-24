const initialState = {
  addresses: [],
  selectedAddress: 0,
}

export default (state = initialState, action) => {
  const {address,landmark,house,key} = action;
  switch(action.type) {
    case 'ADD_ADDRESS':
      return {
        ...state,
        addresses: [
          ...state.addresses,
          {
            address, landmark, house,
            type: 'Work'
          }
        ]
      }
    case 'EDIT_ADDRESS':
      console.log(key)
      return {
        ...state,
        addresses: state.addresses.map((a, i) => {
          if(i == key) {
            return {
              address, landmark, house,
              type: 'Work'
            }
          }
          return a;
        })
      }
    case 'REMOVE_ADDRESS':
      return {
        ...state,
        addresses: [
          ...state.addresses.slice(0, action.index),
          ...state.addresses.slice(action.index + 1)
        ]
      }
    case 'SELECT_ADDRESS':
      return {
        ...state,
        selectedAddress: action.index
      }
    default:
      return state;
  }
}
