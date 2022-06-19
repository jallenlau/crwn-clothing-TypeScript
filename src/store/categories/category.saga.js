import { takeLatest, all, call, put } from "redux-saga/effects";
import { CATEGORIES_STATE } from './category.types'
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { getCategoriesAndDocuments } from "../../utiles/firebase/firebase.utiles";

// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoryArray = await getCategoriesAndDocuments('categories');
//         dispatch(fetchCategoriesSuccess(categoryArray));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     }
// };
export function* fetchCategoriesAsync() {
    try {
        const categoryArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_STATE.SET_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}