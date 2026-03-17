// ===== CONFIG =====
const saldoEl = document.getElementById("saldo");
const listaEl = document.getElementById("lista");

let movimentos = JSON.parse(localStorage.getItem("movimentos")) || [];

function salvarMovimento() {
  const descricao = document.getElementById("descricao").value;
  const valorInput = document.getElementById("valor").value;
  const tipo = document.getElementById("tipo").value;

  const valor = parseFloat(valorInput.replace(",", "."));

  if (!descricao || isNaN(valor)) {
    alert("Preencha corretamente!");
    return;
  }

  movimentos.push({ descricao, valor, tipo });
  localStorage.setItem("movimentos", JSON.stringify(movimentos));

  atualizarTela();
}

function atualizarTela() {
  listaEl.innerHTML = "";

  let saldo = 0;
  let receitas = 0;
  let despesas = 0;

  movimentos.forEach((item) => {
    const valor = parseFloat(item.valor) || 0;

    const li = document.createElement("li");
    li.textContent = `${item.descricao} - R$ ${valor.toFixed(2)} (${item.tipo})`;
    listaEl.appendChild(li);

    if (item.tipo === "receita") {
      saldo += valor;
      receitas += valor;
    } else {
      saldo -= valor;
      despesas += valor;
    }
  });

  saldoEl.innerText = `R$ ${(saldo || 0).toFixed(2)}`;
  atualizarGrafico(receitas, despesas);
}

let chart;

function atualizarGrafico(receitas, despesas) {
  const ctx = document.getElementById("grafico").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Receitas", "Despesas"],
      datasets: [{
        data: [receitas || 0, despesas || 0]
      }]
    }
  });
}

function zerarDados() {
  if (confirm("Apagar tudo?")) {
    localStorage.removeItem("movimentos");
    movimentos = [];
    atualizarTela();
  }
}

atualizarTela();
