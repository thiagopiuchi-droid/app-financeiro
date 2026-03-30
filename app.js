firebase.auth().onAuthStateChanged(user => {
  if (!user) window.location.href = "login.html";
  else carregarDados();
});

function toggleMenu(){
  document.getElementById("menuBox").classList.toggle("hidden");
}

function logout(){
  firebase.auth().signOut();
}

async function salvarTransacao(tipo){
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value;
  const data = document.getElementById("data").value;

  const user = firebase.auth().currentUser;

  await db.collection("transacoes").add({
    uid: user.uid,
    descricao,
    valor,
    categoria,
    tipo,
    data
  });

  carregarDados();
}

async function carregarDados(){
  const user = firebase.auth().currentUser;
  const snapshot = await db.collection("transacoes")
    .where("uid", "==", user.uid).get();

  let saldo = 0;
  let receitas = 0;
  let despesas = 0;

  snapshot.forEach(doc => {
    const t = doc.data();
    if(t.tipo === "receita"){
      saldo += t.valor;
      receitas += t.valor;
    } else {
      saldo -= t.valor;
      despesas += t.valor;
    }
  });

  document.getElementById("saldo").innerText = "Saldo: R$ " + saldo;

  gerarGrafico(receitas, despesas);
}

function gerarGrafico(receitas, despesas){
  const ctx = document.getElementById('grafico');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Receitas', 'Despesas'],
      datasets: [{
        label: 'Valores',
        data: [receitas, despesas]
      }]
    }
  });
}

function limpar(){
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}
