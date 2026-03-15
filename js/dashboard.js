
import { db } from './firebase.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const salvarBtn = document.getElementById("salvarBtn");
const lista = document.getElementById("lista");
const resetBtn = document.getElementById("resetDataBtn");

async function carregar(){

lista.innerHTML="";

const snapshot = await getDocs(collection(db,"transacoes"));

snapshot.forEach((docItem)=>{

const li=document.createElement("li");
li.innerText=docItem.data().valor;
lista.appendChild(li);

});

}

salvarBtn.addEventListener("click", async ()=>{

const valor=document.getElementById("valor").value;

await addDoc(collection(db,"transacoes"),{
valor:valor
});

carregar();

});

resetBtn.addEventListener("click", async ()=>{

const confirmar=confirm("Deseja apagar todos os dados?");

if(!confirmar) return;

const snapshot = await getDocs(collection(db,"transacoes"));

for(const item of snapshot.docs){
await deleteDoc(doc(db,"transacoes",item.id));
}

alert("Dados apagados!");
carregar();

});

carregar();
