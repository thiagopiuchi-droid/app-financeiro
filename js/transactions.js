
import { db } from "./firebase.js";
import { collection,addDoc,getDocs,deleteDoc,doc }
from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const lista=document.getElementById("lista");
const totalEl=document.getElementById("total");

async function carregar(){

lista.innerHTML="";
let total=0;

const snap=await getDocs(collection(db,"registros"));

snap.forEach(d=>{

const data=d.data();
total+=Number(data.valor);

const li=document.createElement("li");
li.innerText=data.descricao+" - R$"+data.valor;

lista.appendChild(li);

})

totalEl.innerText="R$ "+total;
}

window.salvar=async()=>{

const valor=document.getElementById("valor").value;
const descricao=document.getElementById("descricao").value;

await addDoc(collection(db,"registros"),{
valor:valor,
descricao:descricao
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

carregar();
