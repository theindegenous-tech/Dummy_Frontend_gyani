import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase, onValue, ref} from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyCU_gfLlqlcLMX0_BFGNVQRCEnIy7sugYc",
  authDomain: "theindegenousgyani.firebaseapp.com",
  databaseURL: "https://theindegenousgyani-default-rtdb.firebaseio.com",
  projectId: "theindegenousgyani",
  storageBucket: "theindegenousgyani.appspot.com",
  messagingSenderId: "585321025793",
  appId: "1:585321025793:web:8c4407012c9df8d296cb00",
  measurementId: "G-6P731G3VZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);