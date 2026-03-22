
let userId;
let chart;

auth.onAuthStateChanged(user=>{
 if(user){
  userId = user.uid;
  carregar();
 }
});

function adicionar(tipo){
 const valor = parseFloat(valorInput.value);
 const desc = descInput.value;
 const data = dataInput.value || new Date().toISOString();

 db.collection("usuarios").doc(userId).collection("transacoes")
 .add({tipo, valor, desc, data})
 .then(()=>{
  valorInput.value="";
  descInput.value="";
  carregar();
 });
}

function carregar(){
 db.collection("usuarios").doc(userId).collection("transacoes")
 .get().then(snap=>{
  let receitas=0, despesas=0;

  snap.forEach(doc=>{
   let d = doc.data();
   if(d.tipo==="receita") receitas+=d.valor;
   else despesas+=d.valor;
  });

  saldo.innerText = "R$ "+(receitas-despesas).toFixed(2);

  renderChart(receitas, despesas);
 });
}

function renderChart(r,d){
 const ctx = document.getElementById("grafico");

 if(chart) chart.destroy();

 chart = new Chart(ctx,{
  type:'pie',
  data:{
   labels:['Receitas','Despesas'],
   datasets:[{data:[r,d]}]
  }
 });
}

function zerar(){
 db.collection("usuarios").doc(userId).collection("transacoes")
 .get().then(snap=>{
  let batch = db.batch();
  snap.forEach(doc=> batch.delete(doc.ref));
  return batch.commit();
 }).then(carregar);
}
