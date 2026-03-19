
function login(email, senha){
  auth.signInWithEmailAndPassword(email, senha)
    .then(()=> window.location.href = "dashboard.html")
    .catch(e=>alert(e.message));
}

function cadastro(email, senha){
  auth.createUserWithEmailAndPassword(email, senha)
    .then(()=> window.location.href = "dashboard.html")
    .catch(e=>alert(e.message));
}

function logout(){
  auth.signOut().then(()=> window.location.href = "index.html");
}
