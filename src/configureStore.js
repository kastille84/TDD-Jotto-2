import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index.js';

export const middlewares = [ReduxThunk];

//creates a store with the middleware
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default createStoreWithMiddleware(rootReducer);