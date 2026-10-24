<template>
  <div class="product-page">
    <div v-if="loading" class="product-state">
      Loading product...
    </div>


    <div v-else-if="!product" class="product-state">
      <h3>Product not found</h3>


      <q-btn
        label="Back to Menu"
        color="primary"
        to="/menu"
        class="q-mt-md"
      />
    </div>


    <div v-else class="product-container">


      <!-- Back button -->
      <q-btn
        flat
        icon="arrow_back"
        label="Back to Menu"
        color="#e87519"
        @click="goBackToMenu"
        class="back-btn"
      />


      <!-- Main product -->
      <section class="product-hero">


        <div class="product-image-section">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="product-main-image"
          />


          <div v-else class="product-image-placeholder">
            <q-icon name="restaurant" size="70px" />
          </div>
        </div>


        <div class="product-details">


          <div class="product-category">
            {{ productCategory }}
          </div>


          <h1>{{ product.name }}</h1>


          <div v-if="product.size" class="product-size">
            {{ product.size }}
          </div>


          <p class="product-description">
            {{ product.description || "Freshly prepared and made to order." }}
          </p>


          <div class="product-price">
            {{
              new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(product.price)
            }}
          </div>


          <!-- Quantity and cart -->
          <div class="product-actions">


            <div class="quantity-controls product-quantity">
              <q-btn
                dense
                flat
                round
                icon="remove"
                color="#e87519"
                @click="decreaseQuantity"
              />


              <span class="quantity-display">
                {{ quantity }}
              </span>


              <q-btn
                dense
                flat
                round
                icon="add"
                color="#e87519"
                @click="increaseQuantity"
              />
            </div>


            <q-btn
              unelevated
              color="#e87519"
              icon="add_shopping_cart"
              label="Add to Cart"
              class="add-cart-btn"
              @click="addToCart"
            />


          </div>


        </div>
      </section>


      <!-- Related foods -->
      <section v-if="relatedFoods.length" class="related-section">


        <div class="related-heading">
          <div>
            <div class="related-kicker">MORE TO ENJOY</div>
            <h2>You may also like</h2>
          </div>


          <q-btn
            flat
            label="View Menu"
            color="#e87519"
            to="/menu"
          />
        </div>


        <div class="related-grid">


          <article
            v-for="item in relatedFoods"
            :key="item.id"
            class="related-card"
            @click="openProduct(item)"
          >


            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="related-image"
            />


            <div v-else class="related-placeholder">
              <q-icon name="restaurant" size="38px" />
            </div>


            <div class="related-content">
              <div class="related-name">{{ item.name }}</div>


              <div class="related-price">
                {{
                  new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(item.price)
                }}
              </div>
            </div>


          </article>


        </div>
      </section>


    </div>
  </div>
</template>


<script>
import { defineComponent, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMenu } from "stores/menus";


export default defineComponent({
  name: "ProductPage",


  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useMenu();




    // Return to the correct menu category when this product
    // was opened from Homepage Popular Picks.


const goBackToMenu = () => {
  const query = {};


  if (route.query.category) {
    query.category = route.query.category;
  }


  if (route.query.scrollTo) {
    query.scrollTo = route.query.scrollTo;
  }


  router.push({
    path: "/menu",
    query,
  });
};




    const productId = computed(() => route.params.id);


    onMounted(async () => {
      if (!store.menu.length) {
        await store.fetchMenu();
      }
    });


    const productCategoryData = computed(() => {
      return store.menu.find((category) =>
        category.items.some((item) => item.id === productId.value)
      );
    });


    const product = computed(() => {
      return productCategoryData.value?.items.find(
        (item) => item.id === productId.value
      ) || null;
    });


    const productCategory = computed(() => {
      return productCategoryData.value?.category || "";
    });


    const quantity = computed(() => {
      const item = store.cart.find(
        (item) => item.id === productId.value
      );


      return item ? item.quantity : 0;
    });


    const relatedFoods = computed(() => {
      if (!product.value) return [];


      // First suggest foods from the same category
      const sameCategory = productCategoryData.value?.items
        .filter((item) => item.id !== product.value.id) || [];


      // If there are not enough foods in that category,
      // add foods from other categories.
      const otherFoods = store.menu
        .flatMap((category) => category.items)
        .filter((item) =>
          item.id !== product.value.id &&
          !sameCategory.some((food) => food.id === item.id)
        );


      return [...sameCategory, ...otherFoods].slice(0, 4);
    });


    const increaseQuantity = () => {
      if (product.value) {
        store.addToCart(product.value);
      }
    };


    const decreaseQuantity = () => {
      if (product.value) {
        store.decreaseQuantity(product.value);
      }
    };


    const addToCart = () => {
      if (product.value) {
        store.addToCart(product.value);
      }
    };


    const openProduct = (item) => {
      router.push({
        name: "product",
        params: {
          id: item.id,
        },
      });
    };


    return {
      goBackToMenu,
      store,
      product,
      productCategory,
      relatedFoods,
      quantity,
      loading: computed(() => store.loading),
      increaseQuantity,
      decreaseQuantity,
      addToCart,
      openProduct,
    };
  },
});
</script>


<style scoped>


.product-page {
  min-height: 100vh;
  padding: 30px 16px 60px;
  background: var(--tt-page-bg);
  color: var(--tt-text);
  font-family: "martian", sans-serif;
}


.product-page,
.product-page * {
  box-sizing: border-box;
}


.product-container {
  width: min(1100px, 100%);
  margin: 0 auto;
}


.product-state {
  min-height: 60vh;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 12px;
  text-align: center;
  color: var(--tt-text);
}


.product-state h3 {
  margin: 0;
  color: var(--tt-brown);
  font-family: "manrope", sans-serif;
}


.back-btn {
  margin-bottom: 24px;
  color: var(--tt-orange);
}


.product-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
  gap: 40px;
  align-items: center;
  padding: 22px;
  border: 1px solid var(--tt-border);
  border-radius: 28px;
  background: var(--tt-surface);
  color: var(--tt-text);
  box-shadow: 0 12px 35px rgba(53, 37, 29, 0.07);
}


.product-image-section {
  overflow: hidden;
  min-width: 0;
  aspect-ratio: 1 / 0.9;
  border-radius: 22px;
  background: var(--tt-soft-orange);
}


.product-main-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.product-image-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: var(--tt-orange);
}


.product-category,
.related-kicker {
  color: var(--tt-orange);
  font-family: "manrope", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.8px;
  text-transform: uppercase;
}


.product-details {
  min-width: 0;
}


.product-details h1 {
  margin: 10px 0;
  color: var(--tt-brown);
  font-family: "manrope", sans-serif;
  font-size: clamp(30px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.12;
  overflow-wrap: anywhere;
}


.product-size {
  display: inline-block;
  margin: 4px 0 12px;
  padding: 6px 12px;
  border: 1px solid var(--tt-border);
  border-radius: 999px;
  background: var(--tt-soft-orange);
  color: var(--tt-brown);
  font-size: 13px;
}


.product-description {
  max-width: 520px;
  margin: 12px 0;
  color: var(--tt-muted);
  font-size: 14px;
  line-height: 1.8;
}


.product-price {
  margin: 24px 0;
  color: var(--tt-orange);
  font-family: "manrope", sans-serif;
  font-size: clamp(23px, 3vw, 30px);
  font-weight: 700;
}


.product-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}


.product-quantity {
  justify-content: center;
}


.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border: 1px solid var(--tt-border);
  border-radius: 14px;
  background: var(--tt-soft-orange);
  color: var(--tt-text);
}


.quantity-display {
  min-width: 26px;
  text-align: center;
  color: var(--tt-text);
  font-weight: 700;
}


.add-cart-btn {
  min-height: 48px;
  padding: 0 22px;
  border-radius: 14px;
  background: var(--tt-orange);
  color: #ffffff;
  font-weight: 700;
}


.add-cart-btn:hover {
  background: var(--tt-orange-hover);
}


.related-section {
  margin-top: 55px;
}


.related-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}


.related-heading h2 {
  margin: 5px 0 0;
  color: var(--tt-brown);
  font-family: "manrope", sans-serif;
  font-size: clamp(24px, 3vw, 32px);
}


.related-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}


.related-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--tt-border);
  border-radius: 18px;
  background: var(--tt-surface);
  color: var(--tt-text);
  box-shadow: 0 8px 24px rgba(53, 37, 29, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease,
    box-shadow 0.2s ease;
}


.related-card:hover {
  transform: translateY(-4px);
  border-color: var(--tt-orange);
  box-shadow: 0 14px 30px rgba(53, 37, 29, 0.09);
}


.related-image,
.related-placeholder {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 0.78;
}


.related-image {
  object-fit: cover;
}


.related-placeholder {
  display: grid;
  place-items: center;
  background: var(--tt-soft-orange);
  color: var(--tt-orange);
}


.related-content {
  padding: 14px;
}


.related-name {
  color: var(--tt-brown);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
  overflow-wrap: anywhere;
}


.related-price {
  margin-top: 8px;
  color: var(--tt-orange);
  font-size: 13px;
  font-weight: 700;
}


@media (max-width: 800px) {
  .product-page {
    padding: 18px 12px 42px;
  }


  .product-hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
    padding: 14px;
    border-radius: 22px;
  }


  .product-image-section {
    aspect-ratio: 1 / 0.82;
  }


  .product-details {
    padding: 4px 6px 12px;
  }


  .product-details h1 {
    font-size: clamp(28px, 7vw, 40px);
  }


  .product-actions {
    gap: 10px;
  }


  .add-cart-btn {
    flex: 1;
    min-width: 150px;
  }


  .related-section {
    margin-top: 38px;
  }


  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }


  .related-content {
    padding: 11px;
  }
}


@media (max-width: 380px) {
  .product-page {
    padding-inline: 8px;
  }


  .product-hero {
    padding: 10px;
  }


  .product-actions {
    align-items: stretch;
  }


  .product-quantity {
    align-self: center;
  }


  .add-cart-btn {
    flex-basis: 100%;
  }


  .related-grid {
    gap: 8px;
  }
}


</style>
