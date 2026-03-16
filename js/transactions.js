
import { db } from "./firebase.js";
import { collection,addDoc,getDocs,deleteDoc,doc }
from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const lista=document.getElementById("lista");
const saldoEl=document.getElementById("saldo");

let grafico;

async function carregar(){

lista.innerHTML="";

let receitas=0;
let despesas=0;

const snap=await getDocs(collection(db,"registros"));

snap.forEach(d=>{

const data=d.data();

if(data.tipo==="receita"){
receitas+=Number(data.valor);
}else{
despesas+=Number(data.valor);
}

const li=document.createElement("li");
li.innerText=data.descricao+" - R$"+data.valor+" ("+data.tipo+")";

lista.appendChild(li);

})

const saldo=receitas-despesas;
saldoEl.innerText="R$ "+saldo;

desenharGrafico(receitas,despesas);

}

window.salvar=async()=>{

const descricao=document.getElementById("descricao").value;
const valor=document.getElementById("valor").value;
const tipo=document.getElementById("tipo").value;

await addDoc(collection(db,"registros"),{
descricao:descricao,
valor:valor,
tipo:tipo
})

carregar();

}

window.zerar=async()=>{

const snap=await getDocs(collection(db,"registros"));

snap.forEach(async d=>{
await deleteDoc(doc(db,"registros",d.id));
})

carregar();

}

function desenharGrafico(receitas,despesas){

const ctx=document.getElementById("grafico");

if(grafico){
grafico.destroy();
}

grafico=new Chart(ctx,{
type:"doughnut",
data:{
labels:["Receitas","Despesas"],
datasets:[{
data:[receitas,despesas]
}]
}
})

}

carregar();
