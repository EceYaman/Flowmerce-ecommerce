import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';


const rootReducer = combineReducers({
    client: clientReducer,
    product: productReducer,
});

export default rootReducer;
