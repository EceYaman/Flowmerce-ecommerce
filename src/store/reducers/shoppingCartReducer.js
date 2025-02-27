import { SET_CART, SET_PAYMENT, SET_ADDRESS, ADD_TO_CART, REMOVE_FROM_CART, TOGGLE_CART_ITEM_SELECTION, UPDATE_CART_QUANTITY, CLEAR_CART } from '../actions/shoppingCartActions';

const initialState = {
  cart: [],     
  payment: {},  
  address: {},   
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;
      const existingIndex = state.cart.findIndex(item => item.product.id === product.id);

      if (existingIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingIndex
            ? { ...item, count: item.count + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, { count: 1, checked: true, product }] };
      }
    }
    case UPDATE_CART_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity < 1) {
        return {
          ...state,
          cart: state.cart.filter(item => item.product.id !== productId),
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === productId ? { ...item, count: quantity } : item
        ),
      };
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case TOGGLE_CART_ITEM_SELECTION:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default shoppingCartReducer;
