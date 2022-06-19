import { createAction } from '../../utiles/reducer/reducer.utils'
import  { SET_CURRENT_USER_STATE }  from './user.types'


export const setCurrentUser = (user) => 
    createAction(SET_CURRENT_USER_STATE.SET_CURRENT_USER, user);

    // export const SET_CURRENT_USER_STATE = {
    //     SET_CURRENT_USER: 'user/SET_CURRENT_USER',
    //     CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
    //     GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
    //     EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
    //     SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
    //     SIGN_IN_FAILED: 'user/SIGN_IN_FAILED',
    //  };

export const checkUserSection = () => createAction(SET_CURRENT_USER_STATE.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(SET_CURRENT_USER_STATE.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(SET_CURRENT_USER_STATE.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) => createAction(SET_CURRENT_USER_STATE.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => createAction(SET_CURRENT_USER_STATE.SIGN_IN_FAILED, error);

export const emailSignUpStart = (email, password, displayName) => createAction(SET_CURRENT_USER_STATE.EMAIL_SIGN_UP_START, { email, password, displayName });

export const signUpSuccess = (user, additionalDetails) => createAction(SET_CURRENT_USER_STATE.SIGN_UP_SUCCESS, { user, additionalDetails })

export const signUpFailed = (error) => createAction(SET_CURRENT_USER_STATE.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(SET_CURRENT_USER_STATE.SIGN_OUT_START);

export const signOutSuccess = () => createAction(SET_CURRENT_USER_STATE.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) => createAction(SET_CURRENT_USER_STATE.SIGN_OUT_FAILED, error);
