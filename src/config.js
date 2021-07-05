import firebase from "firebase/app"; 
import 'firebase/firestore';
 
 const firebaseConfig = {
    apiKey: "AIzaSyCQP59rFtNyuFff1nRkA0XkxsY2RGdsavk",
      authDomain: "miau-cofee.firebaseapp.com",
      projectId: "miau-cofee",
      storageBucket: "miau-cofee.appspot.com",
      messagingSenderId: "733729980388",
      appId: "1:733729980388:web:e91132b9ecb45b634e11f1"
 };
 
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export {firebase}