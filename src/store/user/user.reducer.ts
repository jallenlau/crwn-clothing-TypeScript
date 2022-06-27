import { AnyAction } from 'redux';
import { UserData } from '../../utiles/firebase/firebase.utiles';
import {
    signInSuccess,
    signOutSuccess,
    signInFailed,
    signUpFailed,
    signOutFailed,
} from './user.action';

export type UserState = {
    readonly currentUser: UserData | null,
    readonly error: Error | null
}

const INITIAL_USER: UserState = {
    currentUser: null,
    error: null,
};

export const userReducer = (
    state = INITIAL_USER,
    action = {} as AnyAction
): UserState => {
    if (signInSuccess.match(action)) {
        return { ...state, currentUser: action.payload };
    }

    if (signOutSuccess.match(action)) {
        return { ...state, currentUser: null };
    }

    if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
        return { ...state, error: action.payload }
    }

    return state;
};