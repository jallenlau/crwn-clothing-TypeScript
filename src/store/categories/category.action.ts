import {
    createAction,
    Action,
    ActionWithPayload,
} from '../../utiles/reducer/reducer.utils'

import {
    CATEGORIES_STATE,
    Category,
} from './category.types'

export type FetchCategoriesStart =
    Action<CATEGORIES_STATE.SET_CATEGORIES_START>;

export type FetchCategoriesSuccess =
    ActionWithPayload<
        CATEGORIES_STATE.SET_CATEGORIES_SUCCESS,
        Category[]
    >; 

export type FetchCategoriesFailed =
    ActionWithPayload<
        CATEGORIES_STATE.SET_CATEGORIES_FAILED,
        Error
    >;

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

export const fetchCategoriesStart = ( 
): FetchCategoriesStart => 
    createAction(CATEGORIES_STATE.SET_CATEGORIES_START);

export const fetchCategoriesSuccess = (
    categoryArray: Category[]
): FetchCategoriesSuccess => 
    createAction(CATEGORIES_STATE.SET_CATEGORIES_SUCCESS, categoryArray);

export const fetchCategoriesFailed = (
    error: Error
): FetchCategoriesFailed => 
    createAction(CATEGORIES_STATE.SET_CATEGORIES_FAILED, error);