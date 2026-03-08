
import { db } from "./firebase.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.addTransaction = async function(){

const valor = document.getElementById("valor").value;
const tipo = document.getElementById("tipo").value;
const categoria = document.getElementById("categoria").value;

await addDoc(collection(db,"transactions"),{

valor:Number(valor),
tipo,
categoria,
data:new Date()

});

alert("Transação salva");

}
