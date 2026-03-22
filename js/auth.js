
function login(){
 auth.signInWithEmailAndPassword(email.value,senha.value)
 .then(()=>location.href="dashboard.html")
 .catch(e=>alert(e.message));
}

function register(){
 auth.createUserWithEmailAndPassword(email.value,senha.value)
 .then(()=>alert("Conta criada"))
 .catch(e=>alert(e.message));
}

function protegerPagina(){
 auth.onAuthStateChanged(u=>{
  if(!u) location.href="index.html";
 });
}

function logout(){
 auth.signOut().then(()=>location.href="index.html");
}
