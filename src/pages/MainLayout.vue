<template>
  <q-layout view="hHh lpR fFf" :class="!isExcluded ? 'bg-dark-layout' : ''">
    <!-- Header -->
    <q-header elevated class="tt-header">
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
          <q-btn flat to="/" label="TIANNA'S TREATS CAFE" />
        </q-toolbar-title>

        <!-- Desktop navigation buttons -->
        <div class="gt-sm">
          <q-btn flat to="/" label="Home" />
          <q-btn flat to="/menu" label="Menu" />
          <!-- <q-btn flat to="/about" label="About Us" /> -->
          <q-btn flat to="/checkout" label="Checkout" />

        </div>

      </q-toolbar>
    </q-header>

    <!-- Drawer (slides in on mobile) -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      class="tt-drawer lt-md"
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
        <!-- <q-item clickable to="/about">
          <q-item-section>About Us</q-item-section>
        </q-item>
        <q-item clickable to="/find">
          <q-item-section>Find Us</q-item-section>
        </q-item> -->
        <!-- <q-item clickable to="/events">
          <q-item-section>Events And Catering</q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <router-view />

      <!-- Footer hidden only on excluded pages -->
      <FooterSection v-if="!isExcluded" />
    </q-page-container>
    <FloatingCart />
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import FooterSection from 'src/components/FooterSection.vue'
import FloatingCart from 'src/components/FloatingCart.vue'
const leftDrawerOpen = ref(false)
const route = useRoute()

// Pages where footer & background should NOT show
const excludePages = ['login', 'admin', 'checkout']

// ✅ Make it reactive so it updates on route change
const isExcluded = computed(() => excludePages.includes(route.name))
</script>

<style>


.title {
  font-family: "Arial Black", "Impact", sans-serif;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.5px;
  color: #32180d;
  text-transform: uppercase;
  -webkit-text-stroke: 0.4px currentColor;
}




.tt-header {
  background: #fffaf4 !important;
  color: #35251d !important;
  border-bottom: 1px solid #eee1d4;
  box-shadow: 0 2px 12px rgba(53, 37, 29, 0.06);
}


.tt-header .q-btn {
  color: #35251d;
}


.tt-header .q-btn:hover {
  color: #e87519;
}


.tt-drawer {
  background: #ffffff !important;
  color: #35251d !important;
  border-right: 1px solid #eee1d4;
}


.tt-drawer .q-item {
  color: #35251d;
  border-radius: 10px;
  margin: 4px 10px;
}


.tt-drawer .q-item:hover {
  background: #fff0df;
  color: #e87519;
}


.drawer-close-btn {
  color: #35251d !important;
}


.bg-dark-layout {
  background-color: #f7f4ff;
}
</style>
