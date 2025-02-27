export const SET_CART = 'shoppingCart/SET_CART';
export const SET_PAYMENT = 'shoppingCart/SET_PAYMENT';
export const SET_ADDRESS = 'shoppingCart/SET_ADDRESS';
export const ADD_TO_CART = 'shoppingCart/ADD_TO_CART';
export const REMOVE_FROM_CART = 'shoppingCart/REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'shoppingCart/UPDATE_CART_QUANTITY';
export const TOGGLE_CART_ITEM_SELECTION = 'shoppingCart/TOGGLE_CART_ITEM_SELECTION';
export const CLEAR_CART = "CLEAR_CART";

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

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateCartQuantity = (productId, quantity) => ({
  type: UPDATE_CART_QUANTITY,
  payload: { productId, quantity },
});

export const toggleCartItemSelection = (productId) => ({
  type: TOGGLE_CART_ITEM_SELECTION,
  payload: productId,
});

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};