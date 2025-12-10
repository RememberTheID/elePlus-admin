<script setup>
import 'virtual:uno.css'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const dark = ref(false)

const changeTheme = () => {
  if (dark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
