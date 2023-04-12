import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBoC7LYV4R1ezYnlWqIMuUnuXe2gbB3e8I",
  authDomain: "chat-app-ffc41.firebaseapp.com",
  projectId: "chat-app-ffc41",
  storageBucket: "chat-app-ffc41.appspot.com",
  messagingSenderId: "915282695257",
  appId: "1:915282695257:web:3cdfb5105b79d4a1180d48"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage = getStorage();
export const db=getFirestore();
