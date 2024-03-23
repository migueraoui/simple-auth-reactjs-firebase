import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    //Your Firebqse config
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;
