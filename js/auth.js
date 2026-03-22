function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert("Erro: " + err.message));
}

function register() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  auth.createUserWithEmailAndPassword(email, senha)
    .then(() => alert("Conta criada! Faça login"))
    .catch(err => alert("Erro: " + err.message));
}

function protegerPagina() {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}