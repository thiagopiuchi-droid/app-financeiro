
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

window.login = async function(){

const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;

try{

await signInWithEmailAndPassword(auth,email,senha);

window.location.href="dashboard.html";

}catch(e){

alert("Erro no login");

}

}

window.register = async function(){

const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;

try{

await createUserWithEmailAndPassword(auth,email,senha);

alert("Conta criada!");
window.location.href="login.html";

}catch(e){

alert("Erro ao cadastrar");

}

}

window.goRegister = function(){
window.location.href="register.html"
}
