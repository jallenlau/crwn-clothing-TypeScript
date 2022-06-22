import { AnyAction } from 'redux';

import { CATEGORIES_STATE, Category } from './category.types'
import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from './category.action'

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
    action = {} as AnyAction
): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true };
    }

    if (fetchCategoriesSuccess.match(action)) {
        return { ...state, isLoading: false, categories: action.payload };
    }

    if (fetchCategoriesFailed.match(action)) {
        return { ...state, error: action.payload, isLoading: false };
    }
    return state;
};