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
        <a class="rounded-button" href="https://afdian.com/p/6df8ed802d9d11f0bee652540025c377">
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
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  background-color: var(--vt-c-tint);
  color: white;
}
</style>
