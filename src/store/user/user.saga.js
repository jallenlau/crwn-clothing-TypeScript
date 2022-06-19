import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    signInFailed,
    signInSuccess,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed
} from './user.action'
import { SET_CURRENT_USER_STATE } from './user.types'
import {
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword,
    signOutUser,
} from '../../utiles/firebase/firebase.utiles'


export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        put(signInFailed(error));
    }
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        put(signInFailed(error));
    }
}

export function* signUpWithEmail({payload: { email, password, displayName }}) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({ payload: {user, additionalDetails} }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        put(signOutFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(SET_CURRENT_USER_STATE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield takeLatest(SET_CURRENT_USER_STATE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
    yield takeLatest(SET_CURRENT_USER_STATE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignUpStart() {
    yield takeLatest(SET_CURRENT_USER_STATE.EMAIL_SIGN_UP_START, signUpWithEmail);
}

export function* onSignUpSuccess() {
    yield takeLatest(SET_CURRENT_USER_STATE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(SET_CURRENT_USER_STATE.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onEmailSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}