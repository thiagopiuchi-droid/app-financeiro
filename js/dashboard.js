
import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const lista=document.getElementById("lista");
const saldoEl=document.getElementById("saldo");

let grafico;

window.salvar = async function(){

const descricao=document.getElementById("descricao").value;
const valor=parseFloat(document.getElementById("valor").value);
const tipo=document.getElementById("tipo").value;

await addDoc(collection(db,"movimentos"),{
descricao,
valor,
tipo,
data:new Date()
});

carregar();

}

window.carregar = async function(){

lista.innerHTML="";

let receitas=0;
let despesas=0;

const filtro=document.getElementById("mesFiltro").value;

const query=await getDocs(collection(db,"movimentos"));

query.forEach(doc=>{

const d=doc.data();
const data=new Date(d.data.seconds*1000);

if(filtro!=="" && data.getMonth()!=filtro) return;

const li=document.createElement("li");
li.innerText=`${d.descricao} - R$ ${d.valor} (${d.tipo})`;
lista.appendChild(li);

if(d.tipo==="receita") receitas+=d.valor;
else despesas+=d.valor;

});

saldoEl.innerText=(receitas-despesas).toFixed(2);

desenharGrafico(receitas,despesas);

}

function desenharGrafico(receitas,despesas){

const ctx=document.getElementById("grafico");

if(grafico) grafico.destroy();

grafico=new Chart(ctx,{
type:'doughnut',
data:{
labels:['Receitas','Despesas'],
datasets:[{
data:[receitas,despesas]
}]
}
});

}

carregar();
