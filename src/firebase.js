// import firebase from "./firebase"
// const firebaseConfig = {
//     apiKey: "AIzaSyBCs5oTqWSv-bVwSFkMXa-KeVq5EDF-ne8",
//     authDomain: "linkedin-clone-a0ebd.firebaseapp.com",
//     projectId: "linkedin-clone-a0ebd",
//     storageBucket: "linkedin-clone-a0ebd.appspot.com",
//     messagingSenderId: "1096224747929",
//     appId: "1:1096224747929:web:eca4e72c9d5d6f26516308",
//   };

//   const firebaseApp =firebase.initializeApp(firebaseConfig)
//   const db=firebaseApp.firestore();
//   const auth=firebase.auth();
//   const provider=new firebase.auth.GoogleAuthProvider();
//   const storage=firebase.storage();
//   export {auth,provider,storage};
//   export default db;
// import firebase from "firebase"
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyBCs5oTqWSv-bVwSFkMXa-KeVq5EDF-ne8",
//   authDomain: "linkedin-clone-a0ebd.firebaseapp.com",
//   projectId: "linkedin-clone-a0ebd",
//   storageBucket: "linkedin-clone-a0ebd.appspot.com",
//   messagingSenderId: "1096224747929",
//   appId: "1:1096224747929:web:eca4e72c9d5d6f26516308",
//   measurementId: "G-29B0760KCP"
// }
// const firebaseApp=firebase.initializeApp(firebaseConfig)
// const db=firebaseApp.firestore();
// const auth=firebase.auth();
// const provider=new firebase.auth.GoogleAuthProvider();
// const storage=firebase.storage();
// export {auth,provider,storage};
// export default db;



// Update the import statements to import specific modules from firebase/app
// import firebase from "./firebase"
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Import storage from firebase

const firebaseConfig = {
  // your firebase config here
  apiKey: "AIzaSyBCs5oTqWSv-bVwSFkMXa-KeVq5EDF-ne8",
  authDomain: "linkedin-clone-a0ebd.firebaseapp.com",
  projectId: "linkedin-clone-a0ebd",
  storageBucket: "linkedin-clone-a0ebd.appspot.com",
  messagingSenderId: "1096224747929",
  appId: "1:1096224747929:web:eca4e72c9d5d6f26516308",
  measurementId: "G-29B0760KCP"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);
export { db, auth, provider,storage };
// export default db;
