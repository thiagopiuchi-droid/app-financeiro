
const firebaseConfig = {
  apiKey: "AIzaSyAji6ROLmn3BkD92gZnQOMjRDgMX1hFd74",
  authDomain: "app-financeiro-7043f.firebaseapp.com",
  projectId: "app-financeiro-7043f",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
