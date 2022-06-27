import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "../store";


const selectCurrentUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    [selectCurrentUserReducer],
    (user) => user.currentUser,
)