function register(){
const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;

if(!email || !senha){
alert("Preencha tudo");
return;
}

localStorage.setItem(email, senha);
alert("Cadastrado com sucesso!");
window.location.href = "index.html";
}

function login(){
const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;

const senhaSalva = localStorage.getItem(email);

if(senhaSalva === senha){
localStorage.setItem("usuario", email);
window.location.href = "dashboard.html";
}else{
alert("Login inválido");
}
}

function logout(){
localStorage.removeItem("usuario");
window.location.href = "index.html";
}

// proteção
if(window.location.pathname.includes("dashboard.html")){
const user = localStorage.getItem("usuario");
if(!user){
window.location.href = "index.html";
}
}
