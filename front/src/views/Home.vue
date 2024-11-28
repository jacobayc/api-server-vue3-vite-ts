<template>
  <div>
    <h1>Item Details</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="item">
      <h2>{{ item.name }}</h2>
      <p>ID: {{ item.id }}</p>
      <p>Description: {{ item.description }}</p>
      <p>Price: ${{ item.price }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const item = ref<Item | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchItem = async () => {
  loading.value = true
  error.value = null
  try {
    const PROXY = '/proxy';
    const response = await fetch(`${PROXY}/item`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    item.value = await response.json()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
  } else {
    error.value = String(err)
  }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchItem()
})
</script>