import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatt-7b31f.firebaseapp.com",
  projectId: "chatt-7b31f",
  storageBucket: "chatt-7b31f.appspot.com",
  messagingSenderId: "748538939451",
  appId: "1:748538939451:web:39089e18eec047f531f41e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)