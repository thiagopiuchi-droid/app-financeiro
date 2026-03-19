
auth.onAuthStateChanged(user=>{
  if(!user){
    window.location.href = "index.html";
  }
});

function salvar(){
  const desc = document.getElementById("desc").value;
  const valor = document.getElementById("valor").value;
  const tipo = document.getElementById("tipo").value;
  const dataInput = document.getElementById("data").value;

  const dataFinal = dataInput ? new Date(dataInput) : new Date();

  db.collection("movimentos").add({
    desc, valor, tipo,
    data: dataFinal.toISOString()
  }).then(()=> location.reload());
}

function carregar(){
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  db.collection("movimentos").get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const item = doc.data();
      const data = new Date(item.data).toLocaleDateString("pt-BR");

      lista.innerHTML += `
        <li>
          ${data} • ${item.desc} - R$ ${item.valor} (${item.tipo})
        </li>
      `;
    });
  });
}

window.onload = carregar;
