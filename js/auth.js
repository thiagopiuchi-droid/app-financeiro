
import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = function(){

const email=document.getElementById("email").value;
const senha=document.getElementById("senha").value;

signInWithEmailAndPassword(auth,email,senha)
.then(()=>{
window.location.href="dashboard.html";
})
.catch(e=>alert(e.message));

}

window.cadastro = function(){

const email=document.getElementById("email").value;
const senha=document.getElementById("senha").value;

createUserWithEmailAndPassword(auth,email,senha)
.then(()=>{
window.location.href="dashboard.html";
})
.catch(e=>alert(e.message));

}
