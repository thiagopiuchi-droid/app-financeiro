let balance = 0;

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadData(user.uid);
  }
});

function addTransaction() {
  const desc = document.getElementById('desc').value;
  const value = Number(document.getElementById('value').value);
  const type = document.getElementById('type').value;

  const user = auth.currentUser;

  db.collection("transactions").add({
    uid: user.uid,
    desc,
    value,
    type,
    date: new Date()
  }).then(() => location.reload());
}

function loadData(uid) {
  const list = document.getElementById('list');
  list.innerHTML = "";
  balance = 0;

  db.collection("transactions").where("uid", "==", uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();

        if (data.type === "receita") balance += data.value;
        else balance -= data.value;

        const li = document.createElement("li");
        li.innerHTML = `${data.desc} - R$ ${data.value} 
        <button onclick="deleteItem('${doc.id}')">X</button>`;
        list.appendChild(li);
      });

      document.getElementById('balance').innerText = balance;
    });
}

function deleteItem(id) {
  db.collection("transactions").doc(id).delete()
    .then(() => location.reload());
}

function resetAll() {
  const user = auth.currentUser;

  db.collection("transactions").where("uid", "==", user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    }).then(() => location.reload());
}
