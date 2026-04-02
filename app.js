let user=localStorage.getItem('user');
let trans=JSON.parse(localStorage.getItem('trans'))||[];
let chart;

function checar(){
 if(user){
  loginScreen.style.display='none';
  app.style.display='block';
  render();
 }
}

function login(){
 let email=document.getElementById('email').value;
 if(!email)return;
 localStorage.setItem('user',email);
 user=email;
 checar();
}

function logout(){
 localStorage.removeItem('user');
 location.reload();
}

function toggleMenu(){
 menu.classList.toggle('hidden');
}

function save(){
 localStorage.setItem('trans',JSON.stringify(trans));
}

function add(tipo){
 let v=parseFloat(valor.value);
 let d=descricao.value;
 let dt=data.value;
 if(!v||!d)return;
 trans.push({v,d,tipo,dt});
 save();
 render();
}

function zerar(){
 trans=[];
 save();
 render();
}

function render(){
 let rec=0,des=0;
 lista.innerHTML='';
 trans.forEach(t=>{
  let li=document.createElement('li');
  li.innerText=`${t.dt} - ${t.d} - R$ ${t.v}`;
  lista.appendChild(li);
  if(t.tipo==='receita')rec+=t.v; else des+=t.v;
 });

 let saldo=rec-des;
 saldoEl=document.getElementById('saldo');
 saldoEl.innerText='Saldo: R$ '+saldo.toFixed(2);

 if(chart)chart.destroy();
 chart=new Chart(grafico,{
  type:'doughnut',
  data:{
    labels:['Receitas','Despesas'],
    datasets:[{data:[rec,des]}]
  }
 });
}

checar();
