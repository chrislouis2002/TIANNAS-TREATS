<template>
  <q-page class="tt-page">
    <HomeFoodScene />
    <HomeSearch />
    <InstagramChat />
    <HowToOrder />

    <CustomerFavourites />
  </q-page>
</template>

<script setup>
import HomeFoodScene from 'src/components/home/HomeFoodScene.vue'
import CustomerFavourites from 'src/components/home/CustomerFavourites.vue'
import InstagramChat from 'src/components/home/InstagramChat.vue';
import HomeSearch from 'src/components/HomeSearch.vue';
import HowToOrder from 'src/components/home/HowToOrder.vue';
</script>

<style scoped>
.tt-page {
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
}
</style>
