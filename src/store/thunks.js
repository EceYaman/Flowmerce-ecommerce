import api from '../services/api';
import { clearUser, setRoles, setUser } from './actions/clientActions';
import { setCategories, setFetchState, setProductList, setTotal } from './actions/productActions';

export const fetchRoles = () => async (dispatch, getState) => {
  const { client } = getState();
  if (client.roles && client.roles.length > 0) return; 

  try {
    const response = await api.get('/roles');
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error("Error fetching roles:", error);
  }
};


export const loginUser = (credentials, rememberMe) => async (dispatch) => {
  try {
    const response = await api.post('/login', credentials);
    const { token, ...user } = response.data;
    dispatch(setUser(user));
    if (rememberMe) {
      localStorage.setItem('token', token);
    }
    else {
      localStorage.removeItem('token');
    }
    return user; 
  } catch (error) {
    throw error;
  }
};


export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = token;

    try {
      const response = await api.get('/verify');
      const { token: newToken, ...user } = response.data;

      dispatch(setUser(user));

      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = newToken;
    } catch (error) {
      console.error('Token verification failed:', error);

      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      dispatch(clearUser());
    }
  }
};


export const fetchCategories = () => async (dispatch, getState) => {
  try {
    const { product } = getState();
    if (product.categories && product.categories.length > 0) {
      return;
    }
    const response = await api.get('/categories');
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};


export const fetchProducts = (limit = 12, offset = 0) => async (dispatch) => {
  dispatch(setFetchState('FETCHING')); 
  try {
    const response = await api.get('/products', {
      params: { limit, offset },
    });
    dispatch(setTotal(response.data.total));
    dispatch(setProductList(response.data.products));
    dispatch(setFetchState('FETCHED')); 
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch(setFetchState('ERROR')); 
  }
};