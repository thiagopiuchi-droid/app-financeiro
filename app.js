const firebaseConfig = {
  apiKey: "AIzaSyAji6ROLmn3BkD92gZnQOMjRDgMX1hFd74",
  authDomain: "app-financeiro-7043f.firebaseapp.com",
  projectId: "app-financeiro-7043f"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let chart;

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    carregar();
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("app").style.display = "none";
  }
});

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .catch(err => alert(err.message));
}

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut();
}

async function salvar(tipo) {
  const user = auth.currentUser;
  const nome = document.getElementById("nome").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value;
  const data = document.getElementById("data").value;

  await db.collection("dados").add({
    uid: user.uid,
    nome, valor, categoria, data, tipo
  });

  carregar();
}

async function carregar() {
  const user = auth.currentUser;
  const snapshot = await db.collection("dados")
    .where("uid", "==", user.uid).get();

  let saldo = 0, receitas = 0, despesas = 0, html = "";

  snapshot.forEach(doc => {
    const item = doc.data();

    if (item.tipo === "receita") {
      saldo += item.valor;
      receitas += item.valor;
    } else {
      saldo -= item.valor;
      despesas += item.valor;
    }

    html += `<div>${item.nome} - R$ ${item.valor}</div>`;
  });

  document.getElementById("saldo").innerText = "Saldo: R$ " + saldo;
  document.getElementById("historico").innerHTML = html;

  gerarGrafico(receitas, despesas);
}

function gerarGrafico(receitas, despesas) {
  const ctx = document.getElementById("grafico");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Receitas", "Despesas"],
      datasets: [{
        data: [receitas, despesas]
      }]
    }
  });
}
