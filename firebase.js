const firebaseConfig = {
  apiKey: "AIzaSyAji6ROLmn3BkD92gZnQOMjRDgMX1hFd74",
  authDomain: "app-financeiro-7043f.firebaseapp.com",
  projectId: "app-financeiro-7043f",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
