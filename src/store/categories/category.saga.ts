import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { CATEGORIES_STATE } from './category.types'
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { getCategoriesAndDocuments } from "../../utiles/firebase/firebase.utiles";

export function* fetchCategoriesAsync() {
    try {
        const categoryArray = yield* call(getCategoriesAndDocuments, 'categories');
        yield* put(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_STATE.SET_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}