const firebaseConfig = {
  apiKey: "AIzaSyAji6ROLmn3BkD92gZnQOMjRDgMX1hFd74",
  authDomain: "app-financeiro-7043f.firebaseapp.com",
  projectId: "app-financeiro-7043f",
  storageBucket: "app-financeiro-7043f.appspot.com",
  messagingSenderId: "877961043361",
  appId: "1:877961043361:web:b76ac2a7089a33ab173fe0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();