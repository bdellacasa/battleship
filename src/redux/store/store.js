import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { aplicationReducer } from '../reducers/index';

const store = createStore(aplicationReducer, applyMiddleware(thunk));

export default store;
