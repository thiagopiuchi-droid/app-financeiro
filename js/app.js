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

function atualizar(){
let lista=document.getElementById('lista');lista.innerHTML='';
let saldo=0;
dados.forEach((d,i)=>{
saldo+=d.tipo==='receita'?d.valor:-d.valor;
let li=document.createElement('li');
li.innerHTML=`${d.desc} - R$ ${format(d.valor)}<br>📅 ${new Date(d.data).toLocaleDateString('pt-BR')} | ${d.categoria}
<button onclick="remover(${i})">🗑️</button>`;
lista.appendChild(li);
});
document.getElementById('saldo').innerText='Saldo: R$ '+format(saldo);
preencherFiltro();
}

function preencherFiltro(){
let select=document.getElementById('filtroMes');
let meses=[...new Set(dados.map(d=>d.data.slice(0,7)))];
select.innerHTML='<option value="">Todos</option>';
meses.forEach(m=>{
let o=document.createElement('option');
o.value=m;o.text=m;select.appendChild(o);
});
}

function filtrar(){
let mes=document.getElementById('filtroMes').value;
if(!mes)return atualizar();
let lista=document.getElementById('lista');lista.innerHTML='';
dados.filter(d=>d.data.startsWith(mes)).forEach(d=>{
let li=document.createElement('li');
li.innerHTML=`${d.desc} - R$ ${format(d.valor)}<br>📅 ${new Date(d.data).toLocaleDateString('pt-BR')} | ${d.categoria}`;
lista.appendChild(li);
});
}

function toggleDark(){document.body.classList.toggle('dark');}

window.onload=atualizar;