<template>
  <div class="flex justify-center">
    <div>
      <h1 class="text-xl text-center mb-4 text-white">Welcome back</h1>
      <input
        type="text" placeholder="Email" v-model="email" class="w-full mb-3 px-3 py-2 border rounded"/>
      <input type="password" placeholder="Password" v-model="password" class="w-full mb-3 px-3 py-2 border rounded"/>
      <button @click="signin" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Log in</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter()
const signin = () => {
signInWithEmailAndPassword(getAuth(), email.value, password.value)
.then((data) => {
  console.log("Logged in successfully");
  router.push('/feed')
  })
.catch((error) => {
  console.log(error.code);
    switch (error.code) {
      case "auth/invalid-email":
        alert("Invalid email address.");
        break;
      case "auth/user-not-found":
        alert("Account not found.");
        break;
      case "auth/wrong-password":
        alert("Invalid password");
        break;
    }
  })
}
</script>