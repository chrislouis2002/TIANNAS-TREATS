

<template>
  <section class="favourites-section">
    <div class="section-container">
      <div class="section-heading-wrap">
        <div>
          <span class="section-eyebrow">our best sellers</span>
          <h2 class="section-heading">CUSTOMER FAVES</h2>
        </div>


        <q-btn
          label="VIEW ALL →"
          flat
          class="popular-view-all desktop-only-btn"
          @click="router.push('/menu')"
        />
      </div>


      <Swiper
        :breakpoints="breakpoints"
        :space-between="12"
        :loop="true"
        :autoplay="{
          delay: 2800,
          disableOnInteraction: false
        }"
        :modules="[Autoplay]"
        class="signature-swiper"
      >
        <SwiperSlide
          v-for="dish in signatureDishes"
          :key="dish.id"
        >
          <div
            class="dish-card"
            role="button"
            tabindex="0"
            @click="openPopularDish(dish)"
            @keydown.enter="openPopularDish(dish)"
            @keydown.space.prevent="openPopularDish(dish)"
          >
            <div class="dish-image-wrap">
              <img
                :src="dish.image"
                :alt="dish.name"
                class="dish-image"
                loading="lazy"
              />
            </div>


            <div class="dish-card-content">
              <h3>{{ dish.name }}</h3>


              <div class="dish-card-bottom">
                <span class="dish-price">
                  ₦{{ Number(dish.price || 0).toLocaleString() }}
                </span>


                <q-btn
                  round
                  unelevated
                  icon="add"
                  size="sm"
                  class="dish-add-btn"
                  aria-label="Add to cart"
                  @click.stop="menuStore.addToCart(dish)"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>


      <p
        v-if="!menuStore.loading && signatureDishes.length === 0"
        class="favourites-empty"
      >
        Our customer favourites will appear here soon.
      </p>
    </div>
  </section>
</template>


<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { useMenu } from 'src/stores/menus'


import 'swiper/css'
import 'swiper/css/autoplay'


const router = useRouter()
const menuStore = useMenu()


// Keep the original Admin-controlled selection.
const signatureDishes = computed(() =>
  menuStore.menu
    .flatMap(category => category.items || [])
    .filter(item => item.popular === true && item.available !== false)
)


// Open the selected dish and pass its category to the product page.
function openPopularDish(dish) {
  const menuCategory = menuStore.menu.find(category =>
    (category.items || []).some(
      item => String(item.id) === String(dish.id)
    )
  )


  router.push({
    name: 'product',
    params: {
      id: dish.id
    },
    query: {
      category: menuCategory?.category || ''
    }
  })
}


// Original responsive slider settings.
const breakpoints = {
  0: { slidesPerView: 2.15 },
  390: { slidesPerView: 2.35 },
  480: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 4 }
}


onMounted(async () => {
  if (!menuStore.menu.length && !menuStore.loading) {
    await menuStore.fetchMenu()
  }
})
</script>


<style scoped>
.favourites-section {
  padding: 55px 0 65px;
  background: var(--tt-page-bg, #fffaf5);
  color: var(--tt-text, #35251d);
}


.section-container {
  width: min(1200px, 100%);
  margin-inline: auto;
  padding-inline: 20px;
  box-sizing: border-box;
}


.section-heading-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}


.section-eyebrow {
  display: block;
  margin-bottom: 6px;
  color: var(--tt-orange, #e87519);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}


.section-heading {
  margin: 0;
  color: var(--tt-text, #35251d);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 1.15;
}


.popular-view-all {
  color: var(--tt-orange, #e87519);
  font-weight: 700;
  white-space: nowrap;
}


.signature-swiper {
  width: 100%;
  padding: 4px 2px 20px;
  overflow: hidden;
  touch-action: pan-y pinch-zoom;
}


.signature-swiper :deep(.swiper-slide) {
  height: auto;
}


.dish-card {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: var(--tt-surface, #fff);
  border: 1px solid var(--tt-border, #eee5de);
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(61, 35, 20, 0.07);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.dish-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(61, 35, 20, 0.12);
}


.dish-card:focus-visible {
  outline: 2px solid var(--tt-orange, #e87519);
  outline-offset: 3px;
}


.dish-image-wrap {
  width: 100%;
  aspect-ratio: 1 / 0.78;
  overflow: hidden;
  background: var(--tt-soft-orange, #f4eee9);
}


.dish-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}


.dish-card:hover .dish-image {
  transform: scale(1.04);
}


.dish-card-content {
  position: relative;
  min-height: 62px;
  padding: 9px 36px 10px 9px;
}


.dish-card-content h3 {
  margin: 0;
  color: var(--tt-text, #35251d);
  font-size: 0.82rem;
  line-height: 1.25;
  font-weight: 700;
  text-transform: capitalize;
  overflow-wrap: anywhere;
}


.dish-card-bottom {
  display: flex;
  align-items: center;
  margin-top: 7px;
}


.dish-price {
  color: var(--tt-orange, #e87519);
  font-size: 0.85rem;
  font-weight: 800;
  line-height: 1.2;
}


.dish-add-btn {
  position: absolute;
  right: 7px;
  bottom: 7px;
  width: 28px;
  height: 28px;
  min-height: 28px;
  background: var(--tt-orange, #f4511e) !important;
  color: #fff !important;
}


.dish-add-btn :deep(.q-icon) {
  font-size: 17px;
}


.favourites-empty {
  padding: 20px 0;
  color: var(--tt-muted, #89796d);
  text-align: center;
}


@media (max-width: 599px) {
  .favourites-section {
    padding: 35px 0 40px;
  }


  .section-container {
    padding-inline: 12px;
  }


  .section-heading-wrap {
    gap: 10px;
    margin-bottom: 16px;
  }


  .section-heading-wrap .section-eyebrow {
    margin-bottom: 5px;
    font-size: 0.62rem;
  }


  .section-heading {
    font-size: 1.45rem;
  }


  .popular-view-all {
    font-size: 0.7rem;
  }


  .signature-swiper {
    padding-bottom: 12px;
  }


  .dish-card {
    border-radius: 9px;
  }


  .dish-image-wrap {
    aspect-ratio: 1 / 0.82;
  }


  .dish-card-content {
    min-height: 55px;
    padding: 7px 27px 8px 7px;
  }


  .dish-card-content h3 {
    font-size: 0.78rem;
    line-height: 1.2;
  }


  .dish-price {
    font-size: 0.75rem;
  }


  .dish-add-btn {
    right: 5px;
    bottom: 5px;
    width: 22px;
    height: 22px;
    min-height: 22px;
  }


  .dish-add-btn :deep(.q-icon) {
    font-size: 13px;
  }
}


@media (prefers-reduced-motion: reduce) {
  .dish-card,
  .dish-image {
    transition: none;
  }
}
</style>

