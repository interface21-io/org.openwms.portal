import * as SRV from '../services'
import * as types from '../constants/ActionTypes'
import * as pages from '../constants/LinkPages'
import {push} from 'react-router-redux'
import {ACTIONS} from '@ameba/ameba-js'

export function goto(refs) {
    return (dispatch, getState) => {
        dispatch({
            type: types.UPDATE_HEADER_ITEMS,
            items: [pages.HOME, ...refs]
        });
        dispatch(push(refs[refs.length-1].hash))
    }
}

export function loadWidgets() {
    return (dispatch, getState) => {
        SRV.loadWidgets(
            (widgets) => {
                dispatch({
                    type: types.WIDGETS_LOADED,
                    widgets: widgets
                });
            },
            (error) =>  dispatch({
                type: ACTIONS.SET_ERROR,
                error: error,
            })
        );

    }
}
