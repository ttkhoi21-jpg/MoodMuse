import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyAn3Ymh38v3j4jwiXCP-GQFM_qi7xoWOZc",

  authDomain: "moodmuse-a870c.firebaseapp.com",

  projectId: "moodmuse-a870c",

  storageBucket: "moodmuse-a870c.firebasestorage.app",

  messagingSenderId: "1096149287602",

  appId: "1:1096149287602:web:5f65a3fe62ad49dd03ffab",

  measurementId: "G-SWC0ZJSP34"

};

initializeApp(firebaseConfig);
createApp(App).use(router).mount('#app')
