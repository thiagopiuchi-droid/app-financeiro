let saldo=0;

document.getElementById("menuBtn").onclick=()=>{
 let m=document.getElementById("menu");
 m.style.display=m.style.display==="block"?"none":"block";
}

auth.onAuthStateChanged(user=>{
 if(user){
  document.getElementById("loginBox").style.display="none";
  document.getElementById("app").style.display="block";
  render();
 }else{
  document.getElementById("loginBox").style.display="block";
 }
});

function login(){
 let e=email.value;
 let s=senha.value;

 auth.signInWithEmailAndPassword(e,s)
 .catch(()=>auth.createUserWithEmailAndPassword(e,s));
}

function logout(){
 auth.signOut();
}

function addReceita(){
 salvar("receita",Number(valor.value),desc.value);
}

function addDespesa(){
 salvar("despesa",Number(valor.value),desc.value);
}

function salvar(tipo,valor,desc){
 db.collection("dados").add({tipo,valor,desc,data:new Date()});
 render();
}

function render(){
 lista.innerHTML="";
 db.collection("dados").get().then(s=>{
  saldo=0;
  s.forEach(doc=>{
   let d=doc.data();
   if(d.tipo==="receita")saldo+=d.valor; else saldo-=d.valor;

   let li=document.createElement("li");
   li.innerText=d.desc+" - "+d.valor;
   lista.appendChild(li);
  });
  saldoEl.innerText="Saldo: R$ "+saldo;
 });
}

function resetarDados(){
 db.collection("dados").get().then(s=>{
  s.forEach(doc=>doc.ref.delete());
  render();
 });
}

const saldoEl=document.getElementById("saldo");
