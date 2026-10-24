<template>

    <!-- SEARCH -->
    <section class="home-search-section">
      <div class="home-search-container">


        <div class="home-search-label">
          <span>WHAT ARE YOU CRAVING?</span>
        </div>


        <div class="home-search-box">
          <q-icon name="search" class="home-search-icon" />


          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for food, drinks, desserts..."
            aria-label="Search for food, drinks, desserts"
          />


        </div>


        <div v-if="searchQuery.trim() && searchResults.length" class="home-search-results">
          <button
            v-for="item in searchResults"
            :key="item.id"
            type="button"
            class="home-search-result"
            @click="$router.push(`/product/${item.id}`)"
          >
            <img :src="item.image" :alt="item.name" />


            <span class="home-search-result-info">
              <strong>{{ item.name }}</strong>
              <small>{{ item.category }}</small>
            </span>


            <span class="home-search-result-price">
              ₦{{ Number(item.price || 0).toLocaleString() }}
            </span>
          </button>
        </div>


        <div v-else-if="searchQuery.trim() && !searchResults.length" class="home-search-empty">
          <q-icon name="search_off" />
          <span>No food found for "{{ searchQuery }}"</span>
        </div>



      </div>
    </section>


</template>




<script setup>
import { ref, computed, onMounted } from "vue";
import { useMenu } from "stores/menus";


const menuStore = useMenu();


// Homepage search
const searchQuery = ref("");


const searchResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();


  if (!query) return [];


  return menuStore.menu
    .flatMap((category) =>
      (category.items || []).map((item) => ({
        ...item,
        category: category.category,
      }))
    )
    .filter((item) => {
      const name = (item.name || "").toLowerCase();
      const description = (item.description || "").toLowerCase();
      const category = (item.category || "").toLowerCase();


      return (
        name.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    })
    .slice(0, 8);
});


onMounted(async () => {
  if (!menuStore.menu.length) {
    await menuStore.fetchMenu();
  }
});
</script>





<style scoped>
.home-search-section {
  position: relative;
  width: 100%;
  padding: 48px 20px 56px;
  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(218, 165, 112, 0.10),
      transparent 65%
    ),
    #fffaf6;
  z-index: 10;
}


.home-search-container {
  position: relative;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}


.home-search-label {
  margin-bottom: 16px;
  text-align: center;
}


.home-search-label span {
  display: inline-block;
  color: #a66b43;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2.8px;
  line-height: 1.5;
}


.home-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 66px;
  padding: 0 24px;
  gap: 15px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #eadbd0;
  border-radius: 18px;
  box-shadow:
    0 8px 24px rgba(91, 53, 29, 0.05),
    0 2px 5px rgba(91, 53, 29, 0.025);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}


.home-search-box:focus-within {
  border-color: #c58b60;
  box-shadow:
    0 0 0 4px rgba(197, 139, 96, 0.12),
    0 12px 30px rgba(91, 53, 29, 0.08);
  transform: translateY(-1px);
}


.home-search-icon {
  flex-shrink: 0;
  color: #a66b43;
  font-size: 24px;
}


.home-search-box input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 64px;
  padding: 0;
  color: #35241b;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
}


.home-search-box input::placeholder {
  color: #a89a90;
  opacity: 1;
  font-weight: 400;
}


.home-search-results {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  right: 0;
  z-index: 100;
  max-height: 420px;
  overflow-y: auto;
  padding: 8px;
  background: #ffffff;
  border: 1px solid #f0e5dc;
  border-radius: 18px;
  box-shadow: 0 18px 50px rgba(55, 35, 22, 0.14);
  animation: search-dropdown-in 0.2s ease-out;
}


.home-search-result {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 76px;
  gap: 14px;
  padding: 10px 12px;
  text-align: left;
  color: #35241b;
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}


.home-search-result:hover,
.home-search-result:focus-visible {
  background: #fff5ed;
  outline: none;
}


.home-search-result:active {
  transform: scale(0.99);
}


.home-search-result img {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  object-fit: cover;
  background: #f7eee7;
  border-radius: 12px;
}


.home-search-result-info {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 5px;
}


.home-search-result-info strong {
  overflow: hidden;
  color: #35241b;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.home-search-result-info small {
  overflow: hidden;
  color: #9a8170;
  font-size: 12px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.home-search-result-price {
  flex-shrink: 0;
  color: #a66b43;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
}


.home-search-empty {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 78px;
  padding: 18px;
  color: #8e7768;
  background: #ffffff;
  border: 1px solid #f0e5dc;
  border-radius: 16px;
  box-shadow: 0 14px 35px rgba(55, 35, 22, 0.09);
  font-size: 14px;
  text-align: center;
}


.home-search-empty .q-icon {
  color: #bd8a68;
  font-size: 21px;
}


@keyframes search-dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }


  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* Tablet */
@media (max-width: 768px) {
  .home-search-section {
    padding: 36px 20px 42px;
  }


  .home-search-container {
    max-width: 600px;
  }


  .home-search-box {
    min-height: 60px;
    padding: 0 19px;
    gap: 12px;
    border-radius: 16px;
  }


  .home-search-box input {
    height: 58px;
    font-size: 14px;
  }


  .home-search-label span {
    font-size: 10px;
    letter-spacing: 2.3px;
  }
}


/* Mobile */
@media (max-width: 480px) {
  .home-search-section {
    padding: 28px 16px 34px;
  }


  .home-search-label {
    margin-bottom: 12px;
  }


  .home-search-label span {
    font-size: 9px;
    letter-spacing: 2px;
  }


  .home-search-box {
    min-height: 56px;
    padding: 0 15px;
    gap: 10px;
    border-radius: 14px;
  }


  .home-search-icon {
    font-size: 21px;
  }


  .home-search-box input {
    height: 54px;
    font-size: 13px;
  }


  .home-search-box input::placeholder {
    font-size: 12px;
  }


  .home-search-results {
    top: calc(100% + 8px);
    max-height: 340px;
    padding: 6px;
    border-radius: 15px;
  }


  .home-search-result {
    min-height: 66px;
    gap: 10px;
    padding: 8px;
  }


  .home-search-result img {
    width: 46px;
    height: 46px;
    border-radius: 10px;
  }


  .home-search-result-info strong {
    font-size: 12px;
  }


  .home-search-result-info small {
    font-size: 11px;
  }


  .home-search-result-price {
    font-size: 12px;
  }


  .home-search-empty {
    min-height: 68px;
    padding: 14px 10px;
    font-size: 12px;
  }
}


/* Reduced motion accessibility */
@media (prefers-reduced-motion: reduce) {
  .home-search-box,
  .home-search-result {
    transition: none;
  }


  .home-search-results {
    animation: none;
  }
}
</style>

