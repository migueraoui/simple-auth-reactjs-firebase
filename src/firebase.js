import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIkU4NVmNJoAgMvSbpmKtXjOKiKl1O7lU",
    authDomain: "learning-project-00000.firebaseapp.com",
    projectId: "learning-project-00000",
    storageBucket: "learning-project-00000.appspot.com",
    messagingSenderId: "955398821590",
    appId: "1:955398821590:web:54b4ca55ce89129a0a5b77"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;