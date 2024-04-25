// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "swiftcart-ecommerce-site.firebaseapp.com",
  projectId: "swiftcart-ecommerce-site",
  storageBucket: "swiftcart-ecommerce-site.appspot.com",
  messagingSenderId: "356738186813",
  appId: "1:356738186813:web:c33e239a3c45434c7d3454"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app