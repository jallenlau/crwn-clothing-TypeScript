import { SET_CURRENT_USER_STATE } from './user.types'

const INITIAL_USER = {
    currentUser: null,
};

export const userReducer = (state = INITIAL_USER, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CURRENT_USER_STATE.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };
        case SET_CURRENT_USER_STATE.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null };
        case SET_CURRENT_USER_STATE.SIGN_IN_FAILED:
        case SET_CURRENT_USER_STATE.SIGN_UP_FAILED:
        case SET_CURRENT_USER_STATE.SIGN_OUT_FAILED:
            return { ...state, error: payload };
        default:
            return state;
    };
};