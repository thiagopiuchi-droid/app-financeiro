
import { db } from "./firebase-config.js";
import { 
  collection, 
  addDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const lista = document.getElementById("lista");
const saldoEl = document.getElementById("saldo");

let grafico;

// SALVAR MOVIMENTO
window.salvar = async function(){

  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  await addDoc(collection(db,"movimentos"),{
    descricao,
    valor,
    tipo,
    data: new Date()
  });

  // limpa campos
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

// ATUALIZAÇÃO EM TEMPO REAL
function iniciarListener(){

  const ref = collection(db,"movimentos");

  onSnapshot(ref,(snapshot)=>{

    lista.innerHTML="";

    let receitas = 0;
    let despesas = 0;

    snapshot.forEach((doc)=>{

      const d = doc.data();

      const li = document.createElement("li");
      li.innerText = `${d.descricao} - R$ ${d.valor} (${d.tipo})`;

      lista.appendChild(li);

      if(d.tipo === "receita"){
        receitas += d.valor;
      } else {
        despesas += d.valor;
      }

    });

    saldoEl.innerText = (receitas - despesas).toFixed(2);

    desenharGrafico(receitas,despesas);

  });

}

// DESENHAR GRÁFICO
function desenharGrafico(receitas,despesas){

  const ctx = document.getElementById("grafico");

  if(!ctx) return;

  if(grafico) grafico.destroy();

  grafico = new Chart(ctx,{
    type:'doughnut',
    data:{
      labels:['Receitas','Despesas'],
      datasets:[{
        data:[receitas,despesas]
      }]
    }
  });

}

iniciarListener();
