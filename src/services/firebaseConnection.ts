import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore' 

const firebaseConfig = {
  apiKey: "AIzaSyDOHwUBsqw_mw0YJckYCi_GPe8YItzMXBc",
  authDomain: "tarefas-e1325.firebaseapp.com",
  projectId: "tarefas-e1325",
  storageBucket: "tarefas-e1325.appspot.com",
  messagingSenderId: "384045316581",
  appId: "1:384045316581:web:bde2b6cfb6fce506d6970c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}