export const saveAddress = (address,landmark,house) => {
  return {
    type: 'ADD_ADDRESS',
    address,
    landmark,
    house
  }
}
export const editAddress = (key, address) => {
  ({address, landmark, house} = address);
  return {
    type: 'EDIT_ADDRESS',
    key,
    address,
    landmark,
    house
  }
}
export const deleteAddress = (index) => {
  return {
    type: 'REMOVE_ADDRESS',
    index
  }
}
export const selectAddress = (index) => {
  return {
    type: 'SELECT_ADDRESS',
    index
  }
}
