<template>
  <div class="flex justify-center">
    <div>
      <h1 class="text-xl text-center mb-4 text-white">Create an Account</h1>
      <input type="text" placeholder="Email" v-model="email" class="w-full mb-3 px-3 py-2 border rounded"/>
      <input type="password" placeholder="Password" v-model="password" class="w-full mb-3 px-3 py-2 border rounded"/>
      <button @click="signin" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter()
const signin = () => {
const auth = getAuth()
createUserWithEmailAndPassword(auth, email.value, password.value)
.then((data) => {
  console.log("Account created successfully");
  router.push('/feed')
  })
.catch((error) => {
  console.log(error.code);
  alert(error.message);
  })
}
</script>