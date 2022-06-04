import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDm7M847Oy4nQqPdlmq497HKWb1fDW-zps",
    authDomain: "registro-de-usuarios-b7656.firebaseapp.com",
    projectId: "registro-de-usuarios-b7656",
    storageBucket: "registro-de-usuarios-b7656.appspot.com",
    messagingSenderId: "276138450678",
    appId: "1:276138450678:web:caba4a64ce6310849dd6d7"
  };

  app.initializeApp(firebaseConfig);

  const db=app.firestore()
  const auth=app.auth()
  
  export {db,auth};