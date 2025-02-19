import api from '../services/api';
import { setRoles, setUser } from './actions/clientActions';

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