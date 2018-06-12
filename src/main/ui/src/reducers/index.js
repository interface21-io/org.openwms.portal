import {combineReducers} from 'redux'
import * as actions from '../constants/ActionTypes'
import {routerReducer} from "react-router-redux";
import ApiUtils from '../ApiUtils'

function portal(state = [], action) {
    switch (action.type) {
        case actions.WIDGETS_LOADED:
            ApiUtils.init(action.widgets);
            return {
                title: 'Portal',
                version: '0.1',
                widgets: action.widgets
            };
        default:
            return state
    }
}

function activeItem(state = {}, action) {
    switch (action.type) {
        case 'HEADER_ITEM_CLICK':
            return action.widget;
        default:
            return state
    }
}

function routes(state = [], action) {
    switch (action.type) {
        default:
            return [
                { path: '/', exact: true},
            ]
    }
}

const reducers = combineReducers({
    portal,
    activeItem,
    routes,
    router: routerReducer,
});

export default reducers