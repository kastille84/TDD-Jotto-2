import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index.js';

export default createStore(rootReducer);