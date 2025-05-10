

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt41i7iihAIaEiAFpBwwE-SsZfACQYb1k",
  authDomain: "grow-6d579.firebaseapp.com",
  projectId: "grow-6d579",
  storageBucket: "grow-6d579.firebasestorage.app",
  messagingSenderId: "701126215773",
 appId: "1:701126215773:web:a41e2bf0a4e635b1bfe5b4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

