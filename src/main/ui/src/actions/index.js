import * as SRV from '../services'
import * as types from '../constants/ActionTypes'
import * as pages from '../constants/LinkPages'
import {push} from 'connected-react-router'
import {ACTIONS} from '@ameba/ameba-js'
import {Auth} from 'aws-amplify';

export const SWITCH_USER = 'SWITCH_USER';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';

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

// when user updates profile
export function updateProfile(profile) {
    return {
      type: UPDATE_PROFILE,
      profile
    }
  }
  
  // when user sign out
 export function deleteProfile() {
    return { type: DELETE_PROFILE }
  }

export function switchUser(user) {
    return {
      type: SWITCH_USER,
      user
    }
  }

export function resolveUserInfo() {
    return (dispatch, getState) => {
        Auth.currentUserInfo()
            .then(res => {
                console.log(res)
                dispatch({
                    type: types.USERINFO_RESOLVED,
                    user: res
                });
            })
    }
}
