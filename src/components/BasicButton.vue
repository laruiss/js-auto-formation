<template>
  <button
    class="btn"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { defineProps } from '@vue/runtime-core'

defineProps({
  text: {
    type: String,
    default: 'OK',
  },
})
</script>

<style scoped>
.btn {
  font-weight: 600;
  background-color: var(--ok-color);
  color: var(--almost-white);
  padding: 1em;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  margin: 1em;
  cursor: pointer;
}
</style>
