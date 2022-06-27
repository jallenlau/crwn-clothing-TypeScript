import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState => state.category;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => categories.reduce(
        (acc, docSnapshot) => {
                const { title, items } = docSnapshot;
                acc[title.toLowerCase()] = items;
                return acc;
        }, {} as CategoryMap)
);

export const isSetCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);
