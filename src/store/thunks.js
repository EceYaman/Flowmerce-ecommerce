import api from '../services/api';
import { setRoles } from './actions/clientActions';

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