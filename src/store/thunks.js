import api from '../services/api';
import { clearUser, setRoles, setUser } from './actions/clientActions';

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