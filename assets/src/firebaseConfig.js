import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBwENKcrhQRB0BTLU6SE3oRXI2lC_ImjbU",
  authDomain: "pedrogabriel-authfirebase.firebaseapp.com",
  projectId: "pedrogabriel-authfirebase",
  storageBucket: "pedrogabriel-authfirebase.appspot.com",
  messagingSenderId: "680294922939",
  appId: "1:680294922939:web:b5cb3b3a1b5710080f079e",
  measurementId: "G-JY72SKY0MB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;