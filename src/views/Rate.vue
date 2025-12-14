<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md">
      <div class="mb-4">
        <label class="block mb-2 font-medium text-white">Rating</label>
        <textarea
        v-model="text"
          placeholder="Rate the service (1-10) and tell us your thoughts"
          rows="6"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        </div>
        <button @click="saveRating" class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Save</button>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from "firebase/firestore";
const text = ref("");
const ratings = ref("")
const database = getFirestore();
async function saveRating() {
    try{
    await addDoc(collection(database, "ratings"), {
        rating: text.value
    })
    alert("Rating saved")
    text.value = "";
    }catch(err){
        console.error("Can't save rating")
    }
}
</script>