// CONFIG FIREBASE (já pronto)
const firebaseConfig = {
  apiKey: "AIzaSyAji6ROLmn3BkD92gZnQOMjRDgMX1hFd74",
  authDomain: "app-financeiro-7043f.firebaseapp.com",
  projectId: "app-financeiro-7043f"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let chart;

window.onload = () => {
  const user = localStorage.getItem("user");

  if (user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    carregar();
  }
};

function login() {
  const user = document.getElementById("user").value;
  localStorage.setItem("user", user);
  location.reload();
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

async function salvar(tipo) {
  const nome = document.getElementById("nome").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value;
  const data = document.getElementById("data").value;

  await db.collection("dados").add({ nome, valor, categoria, data, tipo });

  carregar();
}

async function carregar() {
  const snapshot = await db.collection("dados").get();

  let saldo = 0;
  let receitas = 0;
  let despesas = 0;
  let html = "";

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
