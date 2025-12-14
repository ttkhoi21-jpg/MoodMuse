<script setup>
import OpenAI from 'openai';
import { onMounted, ref } from 'vue';
import { getFirestore, collection, addDoc } from "firebase/firestore";
const text = ref("");
const tags = ref("");
const entries = ref([]);
const database = getFirestore();
const client = new OpenAI({
      apiKey: process.env.VUE_APP_OPENAI_KEY,
      dangerouslyAllowBrowser: true
    })
    async function saveEntry() {
        try {
          const response = await client.responses.create({
            model:'gpt-4.1-mini',
            input: `
              Create a summary and a suggestion for this entry.
              Format:
              Summary: <summary>
              Suggestion: <suggestion>
              Entry:${text.value}`
            })
          const result = response.output[0].content[0].text
          const summaryFound = result.match(/Summary:(.*)Suggestion:/s)
          const suggestionFound = result.match(/Suggestion:(.*)/s)
          let summary;
          if(summaryFound){
            summary = summaryFound[1].trim()
          }
          else {
            summary = ""
          }
          let suggestion;
          if(suggestionFound){
            suggestion = suggestionFound[1].trim()
          }
          else {
            suggestion = ""
          }
          await addDoc(collection(database, "entries"), {
            text: text.value,
            tags: tags.value.split(","),
            summary,
            suggestion
        })
        alert("Entry saved")
        text.value = "";
        tags.value = "";
        } catch (err) {
          console.error("Can't save entry")
        }
    }
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-white">Write an Entry</h2>
      <div class="mb-4">
        <label class="block mb-2 font-medium text-white">Entry</label>
        <textarea
          v-model="text"
          placeholder="Write about your day..."
          rows="6"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
  <div class="mb-4">
        <label class="block mb-2 font-medium text-white">Tags</label>
        <textarea
          v-model="tags"
          placeholder="work, family, etc."
          rows="2"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        @click="saveEntry" class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Save</button>
    </div>
  </div>
</template>

