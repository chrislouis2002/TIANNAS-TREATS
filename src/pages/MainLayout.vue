<template>
  <q-layout view="hHh lpR fFf" :class="!isExcluded ? 'bg-dark-layout' : ''">
    <!-- Header -->
    <q-header elevated class="bg-black">
      <q-toolbar>

        <!-- Hamburger button for mobile -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="lt-md"
        />
        <q-toolbar-title class="title">
          <q-btn flat to="/" label="TIANNA'S TREATS" />
        </q-toolbar-title>

        <!-- Desktop navigation buttons -->
        <div class="gt-sm">
          <q-btn flat to="/" label="Menu" />
          <!-- <q-btn flat to="/menu" label="Menu" /> -->
          <!-- <q-btn flat to="/about" label="About" /> -->
          <q-btn flat to="/checkout" label="Checkout" />
          <q-btn flat to="/login" label="Admin Login" />
        </div>

      </q-toolbar>
    </q-header>

    <!-- Drawer (slides in on mobile) -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      class="bg-black text-white lt-md"
    >
      <q-btn
        flat
        round
        dense
        icon="close"
        @click="leftDrawerOpen = false"
        class="text-white drawer-close-btn"
      />
      <q-list>
        <q-item clickable to="/">
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable to="/menu">
          <q-item-section>Menu</q-item-section>
        </q-item>
        <q-item clickable to="/checkout">
          <q-item-section>Checkout</q-item-section>
        </q-item>
        <q-item clickable to="/login">
          <q-item-section>Admin Login</q-item-section>
        </q-item>
        <q-item clickable to="/about">
          <q-item-section>About Us</q-item-section>
        </q-item>
        <q-item clickable to="/find">
          <q-item-section>Find Us</q-item-section>
        </q-item>
        <q-item clickable to="/events">
          <q-item-section>Events And Catering</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <router-view />

      <!-- Footer hidden only on excluded pages -->
      <FooterSection v-if="!isExcluded" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import FooterSection from 'src/components/FooterSection.vue'

const leftDrawerOpen = ref(false)
const route = useRoute()

// Pages where footer & background should NOT show
const excludePages = ['login', 'admin', 'checkout']

// ✅ Make it reactive so it updates on route change
const isExcluded = computed(() => excludePages.includes(route.name))
</script>

<style>
.title {
  font-size: 1.3rem;
  font-weight: bold;
}

.bg-dark-layout {
  background-color: #07070a;
}
</style>
