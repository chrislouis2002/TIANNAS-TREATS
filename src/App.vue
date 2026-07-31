<template>
  <div>
    <!-- Loader (shows first) -->
    <div v-if="loading" class="loader-container">
      <div class="food-loader">
  <video autoplay muted loop playsinline>
          <source src="/slider/3D-Chef-Dancing.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>        <p>Tasty meals you can always trust...</p>
      </div>
    </div>

    <!-- Main App (shows after loading finishes) -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)

// Show loader briefly, then display site
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000) // 2 seconds
})
</script>

<style>
/* Full-screen loader style */
.loader-container {
  position: fixed;
  inset: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 9999;
}

/* Loader image */
.food-loader img {
  width: 120px;
  height: auto;
  animation: bounce 1s infinite;
}

/* Text under loader */
.food-loader p {
  margin-top: 10px;
  font-size: 1.1rem;
  color: #e53935;
  font-weight: 600;
  text-align: center;
}

/* Subtle bounce effect */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
