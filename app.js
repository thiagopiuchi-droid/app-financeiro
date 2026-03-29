let lista = []
let saldo = 0
let chart

function entrar(){
  document.getElementById("login").classList.add("hidden")
  document.getElementById("app").classList.remove("hidden")
}

function add(tipo){
  let desc = document.getElementById("desc").value
  let valor = Number(document.getElementById("valor").value)
  let categoria = document.getElementById("categoria").value
  let data = document.getElementById("data").value

  if(!desc || !valor) return alert("Preencha tudo")

  if(tipo === "despesa") valor *= -1

  lista.push({desc, valor, categoria, data})
  atualizar()
}

function atualizar(){
  saldo = lista.reduce((a,b)=>a+b.valor,0)
  document.getElementById("saldo").innerText = "Saldo: R$ " + saldo.toFixed(2)

  let hist = document.getElementById("historico")
  hist.innerHTML = ""

  lista.slice().reverse().forEach(item=>{
    hist.innerHTML += `
      <div>
        ${item.desc} - R$ ${item.valor}
        <br>${item.data} | ${item.categoria}
      </div>
    `
  })

  desenharGrafico()
}

function limpar(){
  if(confirm("Apagar tudo?")){
    lista = []
    atualizar()
  }
}

function desenharGrafico(){
  let receitas = lista.filter(i=>i.valor>0).reduce((a,b)=>a+b.valor,0)
  let despesas = lista.filter(i=>i.valor<0).reduce((a,b)=>a+b.valor,0)

  let ctx = document.getElementById("grafico").getContext("2d")

  if(chart) chart.destroy()

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Receitas', 'Despesas'],
      datasets: [{
        data: [receitas, Math.abs(despesas)],
        backgroundColor: ['#00c853', '#ff1744']
      }]
    }
  })
}
