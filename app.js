let chart;
let saldo=0;

menuBtn.onclick=()=>menu.style.display=menu.style.display==="block"?"none":"block";

auth.onAuthStateChanged(u=>{
 if(u){loginBox.style.display="none";app.style.display="block";render();}
 else loginBox.style.display="block";
});

function login(){
 auth.signInWithEmailAndPassword(email.value,senha.value)
 .catch(()=>auth.createUserWithEmailAndPassword(email.value,senha.value));
}

function logout(){auth.signOut();}

function addReceita(){salvar("receita");}
function addDespesa(){salvar("despesa");}

function salvar(tipo){
 db.collection("dados").add({
  tipo,
  valor:Number(valor.value),
  desc:desc.value,
  data:new Date(data.value)
 });
 render();
}

function render(){
 lista.innerHTML="";
 db.collection("dados").get().then(s=>{
  let r=0,d=0; saldo=0;
  let hoje=new Date();

  s.forEach(doc=>{
   let x=doc.data();
   let dataItem=new Date(x.data.seconds*1000);

   let filtroSel=filtro.value;

   if(filtroSel==="hoje"){
     if(dataItem.toDateString()!==hoje.toDateString()) return;
   }

   if(filtroSel==="mes"){
     if(dataItem.getMonth()!==hoje.getMonth()) return;
   }

   if(x.tipo==="receita"){saldo+=x.valor; r+=x.valor;}
   else{saldo-=x.valor; d+=x.valor;}

   let li=document.createElement("li");
   li.innerText=`${x.desc} - R$ ${x.valor} (${dataItem.toLocaleDateString()})`;
   lista.appendChild(li);
  });

  saldoEl.innerText="Saldo: R$ "+saldo;
  grafico(r,d);
 });
}

function grafico(r,d){
 if(chart) chart.destroy();
 chart=new Chart(graficoEl,{
  type:"doughnut",
  data:{labels:["Receitas","Despesas"],datasets:[{data:[r,d]}]}
 });
}

function resetarDados(){
 db.collection("dados").get().then(s=>{
  s.forEach(doc=>doc.ref.delete());
  render();
 });
}

const saldoEl=document.getElementById("saldo");
const graficoEl=document.getElementById("grafico");
