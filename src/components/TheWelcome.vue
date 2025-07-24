<script setup>
// redirectToLink
const redirectToLink = () => {
  window.location.href = 'https://api.anix.app/release/download/latest';
}
</script>

<template>
  <div class="app-intro" style="border-radius: 10px;">
    <!-- Your content here -->
    <img alt="Vue logo" class="logo" src="@/assets/app-intro.jpeg" width="100%" height="auto" style="border-radius: 10px; display: block; margin: 0 auto;" />
    <!-- 横向摆放两个按钮 -->
    <div class="flex flex-row p-5 w-full justify-around">
      <div class="flex flex-col justify-center items-center">
        <button class="rounded-button" @click="redirectToLink">
          Download <span class="text-sm text-red-900" >MacOS</span>
        </button>
        <div class="text-xs my-1 text-gray-400">
          Support 14.0 or later
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <a class="rounded-button" href="https://afdian.com/a/animacx?tab=feed">
          Download <span class="text-sm text-red-900" >iOS</span>
        </a>
        <div class="text-xs my-1 text-gray-400">
          Support 17.0 or later
        </div>
      </div>
    </div>

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
  background: linear-gradient(135deg, #f78fb3, #e667af);
  color: white;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(247, 143, 179, 0.4);
}

.rounded-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(230, 103, 175, 0.5);
}
</style>
