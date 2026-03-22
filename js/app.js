
let userId;

auth.onAuthStateChanged(u=>{
 if(u){
  userId=u.uid;
  carregar();
 }
});

function adicionar(tipo){
 const valor=parseFloat(valor.value);
 const desc=descricao.value;
 const data=dataInput.value||new Date().toISOString();

 db.collection("usuarios").doc(userId).collection("transacoes")
 .add({tipo,valor,desc,data})
 .then(()=>{
  valor.value="";
  descricao.value="";
  carregar();
 });
}

function carregar(){
 db.collection("usuarios").doc(userId).collection("transacoes")
 .orderBy("data","desc")
 .get().then(snap=>{
  let receitas=0,despesas=0;
  lista.innerHTML="";

  snap.forEach(doc=>{
   let d=doc.data();

   if(d.tipo==="receita") receitas+=d.valor;
   else despesas+=d.valor;

   lista.innerHTML+=`
    <div class="item">
     <span>${d.desc||"-"} (${new Date(d.data).toLocaleDateString()})</span>
     <span>R$ ${d.valor}</span>
    </div>`;
  });

  saldo.innerText="R$ "+(receitas-despesas).toFixed(2);
 });
}

function zerar(){
 db.collection("usuarios").doc(userId).collection("transacoes")
 .get().then(snap=>{
  let batch=db.batch();
  snap.forEach(doc=>batch.delete(doc.ref));
  return batch.commit();
 }).then(carregar);
}
