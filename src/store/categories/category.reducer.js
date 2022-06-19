import { CATEGORIES_STATE } from './category.types'

const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoryReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_STATE.SET_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORIES_STATE.SET_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categories: payload };
        case CATEGORIES_STATE.SET_CATEGORIES_FAILED:
            return { ...state, error: payload, isLoading: false };
        default:
            return state;
    };
};