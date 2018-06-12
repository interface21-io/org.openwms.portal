import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {routerMiddleware} from "react-router-redux";
import history from './history';

const store = createStore(
    reducers,
    applyMiddleware(thunk, routerMiddleware(history))
);

export default store;