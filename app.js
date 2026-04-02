let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

function salvar() {
  localStorage.setItem('transacoes', JSON.stringify(transacoes));
}

function atualizar() {
  const lista = document.getElementById('historico');
  lista.innerHTML = '';

  let receitas = 0;
  let despesas = 0;

  transacoes.forEach(t => {
    const li = document.createElement('li');
    li.innerText = `${t.data} - ${t.descricao} - R$ ${t.valor}`;
    lista.appendChild(li);

    if (t.tipo === 'receita') receitas += t.valor;
    else despesas += t.valor;
  });

  const saldo = receitas - despesas;
  document.getElementById('saldo').innerText =
    'Saldo: R$ ' + saldo.toFixed(2);
}

function adicionar(tipo) {
  const valor = parseFloat(document.getElementById('valor').value);
  const descricao = document.getElementById('descricao').value;
  const data = document.getElementById('data').value;

  if (!valor || !descricao) return;

  transacoes.push({ valor, descricao, tipo, data });

  salvar();
  atualizar();
}

function zerar() {
  transacoes = [];
  salvar();
  atualizar();
}

atualizar();
