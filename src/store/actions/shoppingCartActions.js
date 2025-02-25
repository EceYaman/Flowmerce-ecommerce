export const SET_CART = 'shoppingCart/SET_CART';
export const SET_PAYMENT = 'shoppingCart/SET_PAYMENT';
export const SET_ADDRESS = 'shoppingCart/SET_ADDRESS';
export const ADD_TO_CART = 'shoppingCart/ADD_TO_CART';

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});