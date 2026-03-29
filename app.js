let lista=[]
let chart

window.onload=()=>{
 if(localStorage.getItem("logado")){
  entrarApp()
 }
}

function login(){
 localStorage.setItem("logado",true)
 entrarApp()
}

function entrarApp(){
 document.getElementById("login").classList.add("hidden")
 document.getElementById("app").classList.remove("hidden")
 carregarFirebase()
}

function logout(){
 localStorage.removeItem("logado")
 location.reload()
}

function toggleMenu(){
 document.getElementById("menu").classList.toggle("hidden")
}

function add(tipo){
 let desc=document.getElementById("desc").value
 let valor=Number(document.getElementById("valor").value)
 let categoria=document.getElementById("categoria").value
 let data=document.getElementById("data").value

 if(tipo==="despesa") valor*=-1

 let item={desc,valor,categoria,data}
 lista.push(item)
 salvarFirebase(item)
 atualizar()
}

function atualizar(){
 let saldo=lista.reduce((a,b)=>a+b.valor,0)
 document.getElementById("saldo").innerText="Saldo: R$ "+saldo.toFixed(2)

 let hist=document.getElementById("historico")
 hist.innerHTML=""

 lista.slice().reverse().forEach(i=>{
  hist.innerHTML+=`<div>${i.desc} - R$ ${i.valor}<br>${i.data} | ${i.categoria}</div>`
 })

 desenharGrafico()
}

function desenharGrafico(){
 let receitas=lista.filter(i=>i.valor>0).reduce((a,b)=>a+b.valor,0)
 let despesas=lista.filter(i=>i.valor<0).reduce((a,b)=>a+b.valor,0)

 let ctx=document.getElementById("grafico")

 if(chart) chart.destroy()

 chart=new Chart(ctx,{
  type:'doughnut',
  data:{
   labels:['Receitas','Despesas'],
   datasets:[{
    data:[receitas,Math.abs(despesas)],
    backgroundColor:['#00c853','#ff1744']
   }]
  }
 })
}

function limpar(){
 if(confirm("Apagar tudo?")){
  lista=[]
  atualizar()
 }
}

// FIREBASE
function salvarFirebase(item){
 db.collection("dados").add(item)
}

function carregarFirebase(){
 db.collection("dados").get().then(snap=>{
  lista=[]
  snap.forEach(doc=>{
   lista.push(doc.data())
  })
  atualizar()
 })
}
