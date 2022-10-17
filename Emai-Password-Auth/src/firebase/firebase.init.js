// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlQsY5A3cjZOuLlJ7mITYlLhsDlT-DXT0",
  authDomain: "email-password-auth-d92a8.firebaseapp.com",
  projectId: "email-password-auth-d92a8",
  storageBucket: "email-password-auth-d92a8.appspot.com",
  messagingSenderId: "922736798587",
  appId: "1:922736798587:web:8dd5a6adf879f86cfb2bde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;