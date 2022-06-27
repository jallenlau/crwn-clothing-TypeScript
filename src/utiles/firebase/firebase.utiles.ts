import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential,
    NextOrObserver,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCgUQatf3U-jQNdWlwh4_mAGjbZu4Ua0Zg",
    authDomain: "crown-clothing-fb.firebaseapp.com",
    projectId: "crown-clothing-fb",
    storageBucket: "crown-clothing-fb.appspot.com",
    messagingSenderId: "414303640492",
    appId: "1:414303640492:web:ce398c2aaed99aff20b809"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});


export const auth = getAuth();  
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string;
};

export const addCollectionAndDocuments = async<T extends ObjectToAdd> (
    collectionKey: string,
    objectsToAdd: T[],
): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done!');
};

export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
};

export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Category);
};

export type AdditionalInformation = {
    displayName?: string;
};

export type UserData = {
    createAt: Date;
    displayName: string;
    email: string;
};

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation: AdditionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error)
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string, password: string
): Promise<UserCredential | void> => { 
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
 
export const signInAuthUserWithEmailAndPassword = async (
    email: string, password: string
): Promise<UserCredential | void> => { 
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}
 
export const signOutUser = async (): Promise<void> => { 
    await signOut(auth);
}
 
export const onAuthStateChangedListener = (
    callback: NextOrObserver<User>
) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject,
        );
    });
};