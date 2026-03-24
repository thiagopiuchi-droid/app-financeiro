function register(){
const email=document.getElementById('email').value;
const password=document.getElementById('password').value;

auth.createUserWithEmailAndPassword(email,password)
.then(()=>alert('Conta criada!'))
.catch(e=>alert(e.message));
}

function login(){
const email=document.getElementById('email').value;
const password=document.getElementById('password').value;

auth.signInWithEmailAndPassword(email,password)
.then(()=>window.location.href='dashboard.html')
.catch(e=>alert(e.message));
}
