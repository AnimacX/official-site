<script setup>
import { ref, computed } from 'vue'

const beta = defineModel({ type: Boolean })

const pointerStartX = ref(0)
const pointerStartY = ref(0)
const isDragging = ref(false)
const dragRatio = ref(0)      // 0→1, how far the fill has covered
const swipeDir = ref(null)    // 'left' | 'right' | null — drag direction
const SWIPE_THRESHOLD = 60
const MAX_DRAG = 120          // pixels for full cover

function onPointerDown(e) {
  pointerStartX.value = e.clientX
  pointerStartY.value = e.clientY
  isDragging.value = true
  dragRatio.value = 0
  swipeDir.value = null
  e.target.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!isDragging.value) return
  const deltaX = e.clientX - pointerStartX.value
  const deltaY = e.clientY - pointerStartY.value

  if (Math.abs(deltaX) < Math.abs(deltaY) && Math.abs(deltaX) < 5) {
    dragRatio.value = 0
    swipeDir.value = null
    return
  }

  swipeDir.value = deltaX < 0 ? 'left' : 'right'
  dragRatio.value = Math.min(1, Math.abs(deltaX) / MAX_DRAG)
}

function onPointerUp(e) {
  isDragging.value = false
  const deltaX = e.clientX - pointerStartX.value
  const deltaY = e.clientY - pointerStartY.value

  if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
    beta.value = !beta.value  // always toggle, regardless of direction
    dragRatio.value = 0
    swipeDir.value = null
    return
  }

  dragRatio.value = 0
  swipeDir.value = null

  if (Math.abs(deltaX) < 5) {
    // tap → download
    redirectToLink()
  }
}

function redirectToLink() {
  const url = `https://api.anix.app/release/download/${beta.value ? 'pre_release' : 'latest'}`
  window.location.href = url
}

// Fill overlay that wipes in from the swipe-direction edge, colour = destination
const fillStyle = computed(() => {
  const pct = dragRatio.value * 100
  if (pct === 0 || !swipeDir.value) return { display: 'none' }

  // Always toggling → destination is opposite of current, fill colour follows
  const toBeta = !beta.value
  const fromRight = swipeDir.value === 'left'

  return {
    display: 'block',
    width: `${pct}%`,
    right: fromRight ? '0' : 'auto',
    left: fromRight ? 'auto' : '0',
    background: toBeta
      ? 'linear-gradient(135deg, #a29bfe, #6c5ce7)'   // purple (→ beta)
      : 'linear-gradient(135deg, #f78fb3, #e667af)',   // pink  (→ stable)
    transition: isDragging.value ? 'none' : 'width 0.2s ease',
  }
})
</script>

<template>
  <div class="app-intro" style="border-radius: 10px;">
    <!-- Your content here -->
    <img alt="Vue logo" class="logo" src="@/assets/app-intro.jpeg" width="100%" height="auto" style="border-radius: 10px; display: block; margin: 0 auto;" />
    <!-- 横向摆放两个按钮 -->
    <div class="flex flex-row p-5 w-full justify-around">
      <div class="flex flex-col justify-center items-center">
        <div class="btn-wrapper">
          <button
            class="rounded-button swipe-download-btn"
            :class="{ 'beta-active': beta }"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
          >
            <div class="swipe-fill" :style="fillStyle"></div>
            <span class="swipe-arrow left">‹</span>
            <span class="btn-inner">
              Download <span class="text-sm text-red-900">MacOS</span>
            </span>
            <span class="swipe-arrow right">›</span>
          </button>
          <span class="version-badge" :class="{ beta: beta }">
            {{ beta ? 'Beta' : 'Stable' }}
          </span>
        </div>
        <div class="text-xs my-1 text-gray-400">
          Support 14.0 or later
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <a class="rounded-button" href="https://afdian.com/a/animacx?tab=feed">
          Download <span class="text-sm pl-1 text-red-900">iOS</span>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 200px;
  background: linear-gradient(135deg, #f78fb3, #e667af);
  color: white;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(247, 143, 179, 0.4);
  text-decoration: none;
  text-align: center;
}

.rounded-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(230, 103, 175, 0.5);
}

/* ── Wrapper for button + badge ── */
.btn-wrapper {
  position: relative;
  display: inline-block;
}

/* ── Swipe-download button ── */
.swipe-download-btn {
  user-select: none;
  touch-action: none;
  position: relative;
  overflow: hidden;
}

.swipe-download-btn.beta-active {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7);
  box-shadow: 0 4px 12px rgba(162, 155, 254, 0.4);
}

.swipe-download-btn.beta-active:hover {
  box-shadow: 0 6px 16px rgba(108, 92, 231, 0.5);
}

/* Fill overlay that wipes in from one edge during drag */
.swipe-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  pointer-events: none;
  z-index: 0;
}

/* Content sits above the fill */
.btn-inner {
  position: relative;
  z-index: 1;
}

/* ── Swipe-hint arrows (visible on hover) ── */
.swipe-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0);
  pointer-events: none;
  transition: color 0.35s ease, opacity 0.35s ease;
  opacity: 0;
}

.swipe-arrow.left  { left: 0.65em; }
.swipe-arrow.right { right: 0.65em; }

.swipe-download-btn:hover .swipe-arrow {
  color: rgba(255, 255, 255, 0.45);
  opacity: 1;
}

/* ── Version badge on the button outline ── */
.version-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(20%, -35%);
  font-size: 0.6rem;
  background: linear-gradient(135deg, #f78fb3, #e667af);
  color: white;
  padding: 0.15em 0.55em;
  border-radius: 999px;
  letter-spacing: 0.5px;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  pointer-events: none;
}

.version-badge.beta {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7);
}

/* ── Hint text ── */
.swipe-hint-text {
  opacity: 0.7;
}
</style>
