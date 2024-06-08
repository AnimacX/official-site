<script setup>
// redirectToLink
const redirectToLink = () => {
  window.open('https://api.anix.app/statistics/release/download/latest?s=www.anix.app', '_blank');
}
</script>

<template>
  <div class="app-intro" style="border-radius: 10px;">
    <!-- Your content here -->
    <img alt="Vue logo" class="logo" src="@/assets/app-intro.jpeg" width="100%" height="auto" style="border-radius: 10px; display: block; margin: 0 auto;" />
    <button class="rounded-button" @click="redirectToLink">🚀 Download</button>
  </div>
</template>

<style>
.app-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.rounded-button {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  background-color: var(--vt-c-tint);
  color: white;
  margin: 25px 0;
}
</style>
