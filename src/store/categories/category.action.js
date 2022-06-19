import { createAction } from '../../utiles/reducer/reducer.utils'
import { CATEGORIES_STATE } from './category.types'


// export const setCategories = (categoryArray) => 
//     createAction(CATEGORIES_STATE.SET_CATEGORIES, categoryArray);

export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_STATE.SET_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoryArray) => 
    createAction(CATEGORIES_STATE.SET_CATEGORIES_SUCCESS, categoryArray);

export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORIES_STATE.SET_CATEGORIES_FAILED, error);