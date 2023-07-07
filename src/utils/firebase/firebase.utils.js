import {initializeApp} from 'firebase/app';

import {
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAYE2ZlJbazN2ZQmoeJ5bm6l92xjWJDr-8",
    authDomain: "crwn-clothing-db-9c3c9.firebaseapp.com",
    projectId: "crwn-clothing-db-9c3c9",
    storageBucket: "crwn-clothing-db-9c3c9.appspot.com",
    messagingSenderId: "424417735549",
    appId: "1:424417735549:web:3b1fb28dbacf5e51e4d214"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleProvider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
      userAuth, 
      additionalInformation = {}
    ) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);
    

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }