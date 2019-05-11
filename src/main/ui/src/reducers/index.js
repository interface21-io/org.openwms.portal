import {combineReducers} from 'redux'
import * as actions from '../constants/ActionTypes'
import {connectRouter} from "connected-react-router";
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

function user(state = {attributes: {}}, action) {
    switch (action.type) {
        case 'SWITCH_USER':
            return action.user;
        default:
            return state
    }
}

const reducers = (history) => combineReducers({
    portal,
    activeItem,
    routes,
    user,
    router: connectRouter(history)
});

export default reducers