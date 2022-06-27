import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import {
    signInFailed,
    signInSuccess,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
    EmailSignInStart,
    EmailSignUpStart,
    SignUpSuccess,
} from './user.action'
import { SET_CURRENT_USER_STATE } from './user.types'
import { User } from 'firebase/auth';
import {
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation,
} from '../../utiles/firebase/firebase.utiles'


export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        if (userSnapshot) {
            yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
        }
    } catch (error) {
        put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({payload: { email, password }}: EmailSignInStart) {
    try {
        const UserCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if (UserCredential) {
            const { user } = UserCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        put(signInFailed(error as Error));
    }
}

export function* signUpWithEmail({payload: { email, password, displayName }}: EmailSignUpStart) {
    try {
        const UserCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (UserCredential) {
            const { user } = UserCredential;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        put(signUpFailed(error as Error));
    }
}

export function* signInAfterSignUp({ payload: {user, additionalDetails} }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        put(signOutFailed(error as Error));
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(SET_CURRENT_USER_STATE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield* takeLatest(SET_CURRENT_USER_STATE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
    yield* takeLatest(SET_CURRENT_USER_STATE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignUpStart() {
    yield* takeLatest(SET_CURRENT_USER_STATE.EMAIL_SIGN_UP_START, signUpWithEmail);
}

export function* onSignUpSuccess() {
    yield* takeLatest(SET_CURRENT_USER_STATE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield* takeLatest(SET_CURRENT_USER_STATE.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onEmailSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}