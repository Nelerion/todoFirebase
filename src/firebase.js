import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmUw-84xjGBjOzWBp8NA9RmmokMW-Mras",
  authDomain: "todo-3763b.firebaseapp.com",
  databaseURL: "https://todo-3763b-default-rtdb.firebaseio.com",
  projectId: "todo-3763b",
  storageBucket: "todo-3763b.appspot.com",
  messagingSenderId: "854026494679",
  appId: "1:854026494679:web:53a3175907af438aab4692",
  measurementId: "G-ZEFXXJ3Y32"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
