
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAji6ROLmn3BkD92gZnQOMjRDgMX1hFd74",
authDomain: "app-financeiro-7043f.firebaseapp.com",
projectId: "app-financeiro-7043f",
storageBucket: "app-financeiro-7043f.firebasestorage.app",
messagingSenderId: "877961043361",
appId: "1:877961043361:web:b76ac2a7089a33ab173fe0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const lista = document.getElementById("lista");

async function carregar(){

let receitas = 0;
let despesas = 0;

lista.innerHTML = "";

const querySnapshot = await getDocs(collection(db,"transactions"));

querySnapshot.forEach((docSnap)=>{

const d = docSnap.data();
const valor = Number(d.valor);

if(d.tipo === "receita") receitas += valor;
if(d.tipo === "despesa") despesas += valor;

const li = document.createElement("li");

li.innerHTML = `
${d.categoria} - R$ ${valor}
<button onclick="excluir('${docSnap.id}')">X</button>
`;

lista.appendChild(li);

});

document.getElementById("receitas").innerText = "R$ "+receitas;
document.getElementById("despesas").innerText = "R$ "+despesas;
document.getElementById("saldo").innerText = "R$ "+(receitas-despesas);

}

window.salvar = async function(){

const valor = parseFloat(document.getElementById("valor").value);

if(isNaN(valor)) return alert("Digite um valor válido");

const tipo = document.getElementById("tipo").value;
const categoria = document.getElementById("categoria").value;

await addDoc(collection(db,"transactions"),{
valor: valor,
tipo: tipo,
categoria: categoria,
data: new Date()
});

document.getElementById("valor").value="";

carregar();

}

window.excluir = async function(id){

await deleteDoc(doc(db,"transactions",id));
carregar();

}

carregar();
