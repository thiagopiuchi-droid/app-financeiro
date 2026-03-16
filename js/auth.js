
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut }
from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

window.login=async()=>{
const email=document.getElementById("email").value;
const senha=document.getElementById("senha").value;

try{
await signInWithEmailAndPassword(auth,email,senha);
window.location.href="dashboard.html";
}catch(e){
document.getElementById("status").innerText=e.message;
}
}

window.goRegister=()=>{
window.location.href="register.html";
}

window.register=async()=>{
const email=document.getElementById("email").value;
const senha=document.getElementById("senha").value;

await createUserWithEmailAndPassword(auth,email,senha);
window.location.href="dashboard.html";
}

window.logout=async()=>{
await signOut(auth);
window.location.href="index.html";
}
