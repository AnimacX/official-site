<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      立即下载，享受MacOS上的最佳追番体验！更多信息和资料请访问：
      <a href="https://github.com/animacx/animacx" target="_blank" rel="noopener">Gihub</a> -
      <a href="https://afdian.net/a/animacx/" target="_blank" rel="noopener">爱发电</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
