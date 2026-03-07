
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function login(){
const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;
auth.signInWithEmailAndPassword(email,senha);
}

function cadastrar(){
const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;
auth.createUserWithEmailAndPassword(email,senha);
}

function logout(){
auth.signOut();
}

auth.onAuthStateChanged(user=>{

if(user){

document.getElementById("login").style.display="none";
document.getElementById("app").style.display="block";

document.getElementById("usuario").innerText=user.email;

carregar();

}else{

document.getElementById("login").style.display="block";
document.getElementById("app").style.display="none";

}

});

function salvar(){

const descricao = document.getElementById("descricao").value;
const valor = parseFloat(document.getElementById("valor").value);
const tipo = document.getElementById("tipo").value;

db.collection("movimentos").add({
descricao,
valor,
tipo,
data:new Date()
});

}

function carregar(){

let saldo=0;

db.collection("movimentos").orderBy("data","desc")
.onSnapshot(snapshot=>{

const lista = document.getElementById("lista");
lista.innerHTML="";
saldo=0;

snapshot.forEach(doc=>{

const item = doc.data();

const li = document.createElement("li");

const valorFormatado = "R$ "+item.valor;

li.innerHTML = `<span>${item.descricao}</span><strong>${valorFormatado}</strong>`;

lista.appendChild(li);

if(item.tipo=="receita"){
saldo+=item.valor;
}else{
saldo-=item.valor;
}

});

document.getElementById("saldo").innerText="R$ "+saldo;

});

}
