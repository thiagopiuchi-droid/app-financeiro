import { auth } from './firebase.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');
const logoutBtn = document.getElementById('logout');
const authDiv = document.getElementById('auth');
const userDiv = document.getElementById('user');
const welcome = document.getElementById('welcome');

loginBtn.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .catch(err => alert(err.message));
};

registerBtn.onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .catch(err => alert(err.message));
};

logoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
  if (user) {
    authDiv.style.display = "none";
    userDiv.style.display = "block";
    welcome.textContent = "Bem-vindo, " + user.email;
  } else {
    authDiv.style.display = "block";
    userDiv.style.display = "none";
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
