
window.onload = function(){

const ctx = document.getElementById("grafico");

new Chart(ctx,{

type:"doughnut",

data:{

labels:["Alimentação","Transporte","Lazer"],

datasets:[{

data:[300,200,150]

}]

}

});

}
