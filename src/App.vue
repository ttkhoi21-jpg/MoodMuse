<template>
   <div id="app">
    <nav class="flex space-x-4 justify-center">
      <router-link to="/home">Home</router-link>
      <template v-if="!isLoggedin">
      <router-link to="/signin">Sign in</router-link>
      <router-link to="/login">Log in</router-link>
      </template>
      <router-link to="/feed">Feed</router-link>
      <button @click="handleSignout" v-if="isLoggedin">Log out</button>
      <button @click="handleSearch" v-if="isLoggedin">Search</button>
      <button @click="handleRating" v-if=isLoggedin>Rate</button>
      <button @click="toggleTheme">Toggle Theme</button>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
const isLoggedin = ref(false);
const router = useRouter();
let auth;
onMounted(() =>{
  auth = getAuth();
  onAuthStateChanged(auth, (user => {
    if(user)
      isLoggedin.value = true;
    else
      isLoggedin.value = false;
  }));
  document.body.classList.add("light");
});
const handleSignout = () => {
  signOut(auth).then(() => {
  router.push("/")
  });
}
const theme = ref("light");
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.body.className = theme.value;
};
const handleSearch = () => {
  router.push("/search")
};
const handleRating = () => {
  router.push("/rate")
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body.light { 
  background-image: url('@/assets/light.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: black;
}
body.dark { 
  background-image: url('@/assets/dark.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
}

</style>
