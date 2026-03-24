let balance=0;

auth.onAuthStateChanged(user=>{
if(!user){
window.location.href='index.html';
}else{
load(user.uid);
}
});

function addTransaction(){
const desc=document.getElementById('desc').value;
const value=Number(document.getElementById('value').value);
const type=document.getElementById('type').value;
const user=auth.currentUser;

db.collection("transactions").add({
uid:user.uid,desc,value,type,date:new Date()
}).then(()=>location.reload());
}

function load(uid){
const list=document.getElementById('list');
list.innerHTML="";
balance=0;

db.collection("transactions").where("uid","==",uid).get()
.then(snap=>{
snap.forEach(doc=>{
const d=doc.data();

if(d.type==="receita") balance+=d.value;
else balance-=d.value;

const li=document.createElement("li");
li.innerHTML=`${d.desc} - R$ ${d.value} <button onclick="del('${doc.id}')">X</button>`;
list.appendChild(li);
});
document.getElementById('balance').innerText=balance;
});
}

function del(id){
db.collection("transactions").doc(id).delete().then(()=>location.reload());
}

function resetAll(){
const user=auth.currentUser;
db.collection("transactions").where("uid","==",user.uid).get()
.then(snap=>{
snap.forEach(doc=>doc.ref.delete());
}).then(()=>location.reload());
}
