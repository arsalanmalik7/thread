import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { collection, addDoc, query, onSnapshot, serverTimestamp, orderBy, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAl0DFOcTipe5dPgW_Kpi7KlBfMcEuJN-A",
  authDomain: "threads-8b.firebaseapp.com",
  projectId: "threads-8b",
  storageBucket: "threads-8b.appspot.com",
  messagingSenderId: "347648497810",
  appId: "1:347648497810:web:d4801fdf9f9e63c0b22e4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);