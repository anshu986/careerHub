// import { auth,provider } from "../firebase"
// export function signInAPI(){
//     return (dispatch)=>{
//         auth.signInWithPopup(provider).then((payload)=>{
//             console.log(payload);
//         })
//         .catch((error)=>alert(error.message));
//     };
// }
// your-api-file.js
// Assuming 'storage' is exported from '../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, query, orderBy, onSnapshot,addDoc } from 'firebase/firestore';
import { db, auth, provider,storage } from '../firebase';
// import { getStorage, ref } from "firebase/storage";
// import db from "../firebase"
// import { auth, provider,storage } from "../firebase";
// import { db } from "../firebase";
import {signInWithPopup} from 'firebase/auth';
import { SET_USER ,SET_LOADING_STATUS,GET_ARTICLES} from "../actions/actionType"

export const setUser=(payload)=>({
    type:SET_USER,
    user:payload,
});
export const setLoading=(status)=>({
  type:SET_LOADING_STATUS,
  status:status,
})
export const getArticles=(payload)=>({
  type:GET_ARTICLES,
  payload:payload,
})
export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth,provider)
      .then((payload) => {
        console.log(payload.user);
        // dispatch(setUser(payload.user))
      })
      .catch((error) => alert(error.message));
  };
}
export function getUserAuth(){
  return(dispatch)=>{
    auth.onAuthStateChanged(async (user)=>{
      if(user){
        dispatch(setUser(user));
      }
    })
  }
}

export function signOutAPI(){
  return (dispatch)=>{
    auth.signOut().then(()=>{
      dispatch(setUser(null));
    }).catch((error)=>{
      console.log(error.message)
    })
  }
}
// export function postArticleAPI(payload){
//   return(dispatch)=>{
//     if(payload.image!="")
//     {
//       const storage = getStorage();

// // Create a storage reference from our storage service
// const storageRef = ref(storage);

//       const upload=ref(storage,`images/${payload.image}`).put(payload.image);
//       upload.on("state_changed",(snapshot)=>{
//         const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
//         console.log(`Progress:${progress}%`);
//         if(snapshot.state==="RUNNING"){
//           console.log(`Progress:${progress}%`);
//         }
//       },
      
//       (error)=>console.log(error.code),
//       async()=>{
//         const downloadURL=await upload.snapshot.ref.getDownloadURL();
//         db.collection("articles").add({
//           actor:{
//             description:payload.user.email,
//             title: payload.user.displayName,
//             date: payload.timestamp,
//             image: payload.user.photoURL,
//           },
//           video: payload.video,
//           sharedImg: downloadURL,
//           comments: 0,
//           description: payload.description,
//         })
//       }
//       )
//     }
//   }
// }
// import { db } from '../firebase'; // Assuming db is your Firestore instance

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true))
    if (payload.image !== "") {
      const storage = getStorage();

      // Create a storage reference from our storage service
      const storageRef = ref(storage, `images/${payload.image.name}`);
      
      // Create an upload task
      const uploadTask = uploadBytesResumable(storageRef, payload.image);

      // Listen to state changes, progress, and errors
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress: ${progress}%`);
          if (snapshot.state === 'running') {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          // Upload completed successfully
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Add data to Firestore
          addDoc(collection(db,"articles"),{
          // db.collection('articles').add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    }else if(payload.video){
      addDoc(collection(db,"articles"),{
        // db.collection('articles').add({
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: "",
          comments: 0,
          description: payload.description,
        });
        dispatch(setLoading(false));
    }
  };
}
export function getArticleAPI() {
  return (dispatch) => {
    // Assuming setLoading and setArticles are action creators
    dispatch(setLoading(true));

    const articlesCollection = collection(db, 'articles');
    const articlesQuery = query(articlesCollection, orderBy('actor.date', 'desc'));

    const unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
      const payload = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Dispatch the articles to the Redux store
      // dispatch(setArticles(articles));

      // Optionally, you can log the payload
      console.log(payload);

      dispatch(setLoading(false));
      dispatch(getArticles(payload));
    });

    // Remember to unsubscribe when needed (e.g., when the component unmounts)
    // return unsubscribe;
  };
}
// export function getArticleAPI(){
//   return (dispatch)=>{
//     let payload;

//     db.collection("articles")
//     .orderBy("actor.date","desc")
//     .onSnapshot((snapshot)=>{
//       payload=snapshot.docs.map((doc)=> doc.date());
//       console.log(payload)
//     })
//   }
// }
// export function signInAPI() {
//   return (dispatch) => {
//     signInWithPopup(auth, provider)
//       .then((payload) => {
//         // const user = user.user;
//         // const { displayName, email } = user;
//         // // const { displayName, email } = this.props.user || {};

//         console.log(payload.user);
//         // console.log('Email:', email);
//         // dispatch(setUser(displayName));
//       })
//       .catch((error) => alert(error.message));
//   };
// }