let dados = JSON.parse(localStorage.getItem('dados'))||[];

function salvar(){localStorage.setItem('dados',JSON.stringify(dados));}
function format(v){return Number(v).toFixed(2);}

function add(tipo){
let desc=document.getElementById('desc').value;
let valor=parseFloat(document.getElementById('valor').value);
let data=document.getElementById('data').value||new Date().toISOString().split('T')[0];
let categoria=document.getElementById('categoria').value;
if(!desc||!valor)return alert('Preencha tudo');
dados.push({desc,valor,tipo,data,categoria});
salvar();atualizar();
}

function remover(i){dados.splice(i,1);salvar();atualizar();}

function limparTudo(){
if(confirm('Apagar tudo?')){
dados=[];salvar();atualizar();
}
}

function atualizar(){
let lista=document.getElementById('lista');lista.innerHTML='';
let saldo=0, receitas=0, despesas=0;

dados.forEach((d,i)=>{
saldo+=d.tipo==='receita'?d.valor:-d.valor;
if(d.tipo==='receita') receitas+=d.valor;
else despesas+=d.valor;

let li=document.createElement('li');
li.innerHTML=`${d.desc} - R$ ${format(d.valor)}<br>📅 ${new Date(d.data).toLocaleDateString('pt-BR')} | ${d.categoria}
<button onclick="remover(${i})">🗑️</button>`;
lista.appendChild(li);
});

document.getElementById('saldo').innerText='Saldo: R$ '+format(saldo);

desenharGrafico(receitas, despesas);
}

function desenharGrafico(r,d){
let c=document.getElementById('grafico');
let ctx=c.getContext('2d');
ctx.clearRect(0,0,c.width,c.height);

let total=r+d||1;
let pr=r/total;
let pd=d/total;

ctx.fillRect(0,0,c.width*pr,c.height);
ctx.fillRect(c.width*pr,0,c.width*pd,c.height);
}

function toggleDark(){document.body.classList.toggle('dark');}

window.onload=atualizar;
