<script setup>
import {ref} from "vue";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
const database = getFirestore();
const search = ref("");
const results = ref([]);
async function searchEntry() {
  try {
    const entryRef = collection(database, "entries")
    const tags = search.value
      .split(",")
      .map(tag => tag.trim())
    const q = query(entryRef, where("tags", "array-contains-any", tags))
    const querySnap = await getDocs(q)
    results.value = querySnap.docs.map(doc => doc.data());
  }catch(err){
    console.error("Can't find entry")
  }
}
function downloadEntry(entry) {
  const order = {text: entry.text, tags: entry.tags, summary: entry.summary, suggestion: entry.suggestion}
  const content = JSON.stringify(order, null, 1)
  const blob = new Blob([content], {type: "application/json"})
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url;
  link.download = "entry.json"
  link.click()
  URL.revokeObjectURL(url)
  }
</script>
<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md">
      <div class="mb-4">
        <label class="block mb-2 font-medium text-white">Search by tag:</label>
        <textarea
          v-model="search"
          placeholder="work, family, etc."
          rows="2"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button @click="searchEntry" class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Search</button>
        <div class="space-y-2">
  <div
    v-for="entry in results"
    :key="entry.id"
    class="p-3 bg-gray-800 text-white rounded-lg"
  >
    <p class="font-medium">{{ entry.text }}</p>
    <p class="font-medium">Tags: {{ entry.tags.join(", ") }}</p>
    <p class="font-medium">Summary: {{ entry.summary }}</p>
    <p class="font-medium">Suggestion: {{ entry.suggestion }}</p>
    <button @click="downloadEntry(entry)" class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Download</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>