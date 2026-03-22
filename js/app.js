let userId = null;

auth.onAuthStateChanged(user => {
  if (user) {
    userId = user.uid;
    carregarDados();
  }
});

function adicionar(tipo) {
  const valor = parseFloat(document.getElementById("valor").value);

  if (!valor) return alert("Digite um valor!");

  db.collection("usuarios")
    .doc(userId)
    .collection("transacoes")
    .add({
      tipo,
      valor,
      data: new Date()
    })
    .then(() => {
      document.getElementById("valor").value = "";
      carregarDados();
    });
}

function carregarDados() {
  db.collection("usuarios")
    .doc(userId)
    .collection("transacoes")
    .get()
    .then(snapshot => {
      let saldo = 0;

      snapshot.forEach(doc => {
        const t = doc.data();
        saldo += t.tipo === "receita" ? t.valor : -t.valor;
      });

      document.getElementById("saldo").innerText =
        "R$ " + saldo.toFixed(2);
    });
}

function zerarDados() {
  if (!confirm("Tem certeza?")) return;

  db.collection("usuarios")
    .doc(userId)
    .collection("transacoes")
    .get()
    .then(snapshot => {
      const batch = db.batch();

      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit();
    })
    .then(() => carregarDados());
}