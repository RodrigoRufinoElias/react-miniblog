import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmR9J-MDiX_v444G0O_moEywazRKR1NlA",
  authDomain: "react-miniblog-b0c9b.firebaseapp.com",
  projectId: "react-miniblog-b0c9b",
  storageBucket: "react-miniblog-b0c9b.appspot.com",
  messagingSenderId: "623351619790",
  appId: "1:623351619790:web:1a0a4b5ad74fcaeb6b709f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };