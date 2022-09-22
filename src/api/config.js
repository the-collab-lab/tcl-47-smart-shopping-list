import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk3IEwNQC_f7J65FEnyO8kSXt4Pb4GOmA",
  authDomain: "tcl-47-smart-shopping-li-6b6a7.firebaseapp.com",
  projectId: "tcl-47-smart-shopping-li-6b6a7",
  storageBucket: "tcl-47-smart-shopping-li-6b6a7.appspot.com",
  messagingSenderId: "290419846158",
  appId: "1:290419846158:web:dcf3e988e15da91972205f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
