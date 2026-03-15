
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  "apiKey": "AIzaSyAji6ROLmn3BkD92gZnQOMjRDgMX1hFd74",
  "authDomain": "app-financeiro-7043f.firebaseapp.com",
  "projectId": "app-financeiro-7043f",
  "storageBucket": "app-financeiro-7043f.firebasestorage.app",
  "messagingSenderId": "877961043361",
  "appId": "1:877961043361:web:b76ac2a7089a33ab173fe0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword };
