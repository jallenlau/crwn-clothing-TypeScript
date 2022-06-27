import { createAction, withMatcher, Action, ActionWithPayload } from '../../utiles/reducer/reducer.utils'
import { SET_CURRENT_USER_STATE } from './user.types'
import { UserData, AdditionalInformation } from '../../utiles/firebase/firebase.utiles';
import { User } from 'firebase/auth';

export type SetCurrentUser = ActionWithPayload<SET_CURRENT_USER_STATE.SET_CURRENT_USER, UserData>;

export type CheckUserSection = Action<SET_CURRENT_USER_STATE.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<SET_CURRENT_USER_STATE.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<SET_CURRENT_USER_STATE.EMAIL_SIGN_IN_START, { email: string, password: string}>

export type SignInSuccess = ActionWithPayload<SET_CURRENT_USER_STATE.SIGN_IN_SUCCESS, UserData>;

export type SignInFailed = ActionWithPayload<SET_CURRENT_USER_STATE.SIGN_IN_FAILED, Error>

export type EmailSignUpStart = ActionWithPayload<SET_CURRENT_USER_STATE.EMAIL_SIGN_UP_START, { email: string, password: string, displayName: string }>;

export type SignUpSuccess = ActionWithPayload<SET_CURRENT_USER_STATE.SIGN_UP_SUCCESS, { user: User, additionalDetails: AdditionalInformation }>;

export type SignUpFailed = ActionWithPayload<SET_CURRENT_USER_STATE.SIGN_UP_FAILED, Error>;

export type SignOutStart = Action<SET_CURRENT_USER_STATE.SIGN_OUT_START>;

export type SignOutSuccess = Action<SET_CURRENT_USER_STATE.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<SET_CURRENT_USER_STATE.SIGN_OUT_FAILED, Error>;

export const setCurrentUser = withMatcher(
    (user: UserData): SetCurrentUser =>
        createAction(SET_CURRENT_USER_STATE.SET_CURRENT_USER, user));

export const checkUserSection = withMatcher(
    (): CheckUserSection =>
        createAction(SET_CURRENT_USER_STATE.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher(
    (): GoogleSignInStart =>
        createAction(SET_CURRENT_USER_STATE.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher(
    (email: string, password: string): EmailSignInStart =>
        createAction(SET_CURRENT_USER_STATE.EMAIL_SIGN_IN_START, { email, password }));

export const signInSuccess = withMatcher(
    (user: UserData & {id: string}): SignInSuccess =>
        createAction(SET_CURRENT_USER_STATE.SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher(
    (error: Error): SignInFailed =>
        createAction(SET_CURRENT_USER_STATE.SIGN_IN_FAILED, error));

export const emailSignUpStart = withMatcher(
    (email: string, password: string, displayName: string): EmailSignUpStart =>
        createAction(SET_CURRENT_USER_STATE.EMAIL_SIGN_UP_START, { email, password, displayName }));

export const signUpSuccess = withMatcher(
    (user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
        createAction(SET_CURRENT_USER_STATE.SIGN_UP_SUCCESS, { user, additionalDetails }));

export const signUpFailed = withMatcher(
    (error: Error): SignUpFailed =>
        createAction(SET_CURRENT_USER_STATE.SIGN_UP_FAILED, error));

export const signOutStart = withMatcher(
    (): SignOutStart =>
        createAction(SET_CURRENT_USER_STATE.SIGN_OUT_START));

export const signOutSuccess = withMatcher(
    (): SignOutSuccess =>
        createAction(SET_CURRENT_USER_STATE.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher(
    (error: Error): SignOutFailed =>
        createAction(SET_CURRENT_USER_STATE.SIGN_OUT_FAILED, error));