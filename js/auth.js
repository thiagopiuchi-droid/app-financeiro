
function login() {
  const email = emailInput.value;
  const senha = senhaInput.value;
  auth.signInWithEmailAndPassword(email, senha)
    .then(()=> location.href="dashboard.html")
    .catch(e=>alert(e.message));
}

function register() {
  auth.createUserWithEmailAndPassword(emailInput.value, senhaInput.value)
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
