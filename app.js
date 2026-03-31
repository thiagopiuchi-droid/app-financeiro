let saldo=0;
let chart;

document.getElementById("menuBtn").onclick=()=>{
 let m=document.getElementById("menu");
 m.style.display=m.style.display==="block"?"none":"block";
}

auth.onAuthStateChanged(user=>{
 if(user){
  loginBox.style.display="none";
  app.style.display="block";
  render();
 }else{
  loginBox.style.display="block";
 }
});

function login(){
 auth.signInWithEmailAndPassword(email.value,senha.value)
 .catch(()=>auth.createUserWithEmailAndPassword(email.value,senha.value));
}

function logout(){auth.signOut();}

function addReceita(){salvar("receita",Number(valor.value),desc.value);}
function addDespesa(){salvar("despesa",Number(valor.value),desc.value);}

function salvar(tipo,valor,desc){
 db.collection("dados").add({tipo,valor,desc,data:new Date()});
 render();
}

function render(){
 lista.innerHTML="";
 db.collection("dados").get().then(s=>{
  let receitas=0, despesas=0;
  saldo=0;

  s.forEach(doc=>{
   let d=doc.data();

   if(d.tipo==="receita"){saldo+=d.valor; receitas+=d.valor;}
   else{saldo-=d.valor; despesas+=d.valor;}

   let li=document.createElement("li");
   li.innerText=d.desc+" - R$ "+d.valor;
   lista.appendChild(li);
  });

  saldoEl.innerText="Saldo: R$ "+saldo;

  gerarGrafico(receitas,despesas);
 });
}

function gerarGrafico(r,d){
 const ctx=document.getElementById("grafico");

 if(chart) chart.destroy();

 chart=new Chart(ctx,{
  type:"doughnut",
  data:{
   labels:["Receitas","Despesas"],
   datasets:[{
    data:[r,d]
   }]
  }
 });
}

function resetarDados(){
 db.collection("dados").get().then(s=>{
  s.forEach(doc=>doc.ref.delete());
  render();
 });
}

const saldoEl=document.getElementById("saldo");
