import { CATEGORIES_STATE, Category } from './category.types'
import { CategoryAction } from './category.action'

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: Boolean;
    readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoryReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action = {} as CategoryAction
) => {
    switch (action.type) {
        case CATEGORIES_STATE.SET_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORIES_STATE.SET_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categories: action.payload };
        case CATEGORIES_STATE.SET_CATEGORIES_FAILED:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    };
};