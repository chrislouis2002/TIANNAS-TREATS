<template>
  <div
    class="bgg"
    :id="`menu-category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`"
  >
    <div class="q-pa-sm imgcc" style="display: flex; justify-content: center">
      <div class="img-tray-outer">
        <div class="img-tray-inner">
          <img class="category-image" :src="'category_images/' + image" />
        </div>
      </div>
    </div>

    <div style="min-width: 100%">
      <div class="title-cat">{{ category }}</div>
      <div v-if="description" class="food-info q-mb-md">{{ description }}</div>

      <div class="menu-grid">


<article
  v-for="(item, i) in foods"
  :key="item.id || i"
  :id="`menu-item-${item.id}`"
  class="menu-card"
  @click="openProduct(item)"
>


          <div class="menu-image-wrap">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="menu-item-image"
            />
            <div v-else class="menu-image-placeholder">
              <q-icon name="restaurant" size="42px" />
            </div>
          </div>


          <div class="menu-card-content">
            <div class="menu-card-title">{{ item.name }}</div>


            <div v-if="item.size" class="menu-card-size">
              {{ item.size }}
            </div>


            <div v-if="item.description" class="menu-card-description">
              {{ item.description }}
            </div>


            <div class="menu-card-bottom">
              <div class="menu-card-price">
                {{
                  new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(item.price)
                }}
              </div>


              <div class="quantity-controls">
                <q-btn
                  dense
                  flat
                  round
                  icon="remove"
                  :style="{ color: 'hsla(0, 69%, 80%, 1)' }"
                  @click.stop="decreaseQuantity(item)"
                />


                <span class="quantity-display">
                  {{ cart[item.id] || 0 }}
                </span>


                <q-btn
                  dense
                  flat
                  round
                  icon="add"
                  :style="{ color: 'hsla(0, 69%, 80%, 1)' }"
                  @click.stop="increaseQuantity(item)"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>

  <!-- 🧩 DIALOG BOX -->
  <q-dialog
    v-model="showDialog"
    persistent
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card class="dialog-card">
      <q-card-section>
        <div class="dialog-image-container">
          <img
            v-if="selectedItem?.image"
            :src="selectedItem.image"
            alt="food image"
            class="dialog-image"
          />
        </div>
        <div class="dialog-details">
          <h4>{{ selectedItem?.name }}</h4>
          <p>
            {{ selectedItem?.description || "" }}
          </p>
          <h5>
            {{
              new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(selectedItem?.price || 0)
            }}
          </h5>

          <div
            class="quantity-controls"
            style="justify-content: center; margin-top: 10px"
          >
            <q-btn
              dense
              flat
              icon="remove"
              color="pink-4"
              @click="decreaseQuantity(selectedItem)"
            />
            <span class="quantity-display">{{
              cart[selectedItem?.id] || 0
            }}</span>
            <q-btn
              dense
              flat
              icon="add"
              color="pink-4"
              @click="increaseQuantity(selectedItem)"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat label="Close" color="white" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useMenu } from "stores/menus";

export default defineComponent({
  name: "MenuList",
  props: {
    foods: { type: Array, default: () => [] },
    category: { type: String, default: null },
    image: { type: String, default: null },
    categoryIndex: { type: Number, default: undefined },
    description: { type: String, default: undefined },
  },

  setup(props) {
    const store = useMenu();
    const router = useRouter();




const openProduct = (item) => {
  router.push({
    name: "product",
    params: {
      id: item.id,
    },
    query: {
      category: props.category || undefined,
      scrollTo: String(item.id),
    },
  });
};




    const showDialog = ref(false);
    const selectedItem = ref(null);

    const openDialog = (item) => {
      selectedItem.value = item;
      showDialog.value = true;
    };

    const cartQuantities = computed(() => {
      const q = {};
      store.cart.forEach((item) => {
        q[item.id] = item.quantity;
      });
      return q;
    });

    const increaseQuantity = (item) => {
      store.addToCart(item);
    };

    const decreaseQuantity = (item) => {
      store.decreaseQuantity(item);
    };

    return {
      store,
      cart: cartQuantities,
      increaseQuantity,
      decreaseQuantity,
      showDialog,
      selectedItem,
      openDialog,
      openProduct,
    };
  },
});
</script>

<style scoped>
/* ===== Your original styles (unchanged) ===== */
.img-tray-outer {
  border-radius: 100%;
  background: linear-gradient(
    45deg,
    rgba(229, 115, 115, 1),
    rgba(255, 215, 64, 1)
  );
  padding: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 1), -1px -1px 5px rgba(0, 0, 0, 1);
}
.img-tray-inner {
  border-radius: 100%;
  background: linear-gradient(
    45deg,
    rgba(229, 115, 115, 1),
    rgba(255, 215, 64, 1)
  );
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  box-shadow: 3px 1px 15px rgba(255, 255, 255, 0.5),
    -3px -1px 15px rgba(255, 255, 255, 0.5);
}
@media screen and (min-width: 640px) {
  .img-tray-outer {
    width: 260px;
    height: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-tray-inner {
    width: 230px;
    height: 230px;
  }
  .bgg {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 30% 60%;
    justify-content: space-between;
  }
  .title-cat {
    text-align: left;
  }
  .food-info {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 70% 20%;
    justify-content: center;
  }
}

@media screen and (max-width: 620px) {
  .img-tray-outer {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-tray-inner {
    width: 180px;
    height: 180px;
  }
  .bgg {
  }
  .title-cat {
    text-align: center;
  }
  .imgcc {
    padding-top: 2rem;
  }
  .listx {
    border-bottom: 1.1px solid rgba(229, 115, 115, 0.6);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .listxcont {
    padding-bottom: 1.2rem;
  }
}
.food-info {
  font-family: "martian";
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}
.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}
.bgg {
  background: #fff;
  margin-top: 1rem;
  border-radius: 25px;
  border: 1px solid #eaded6;
  box-shadow: 0 8px 28px rgba(43, 23, 18, 0.06);
}
.title-cat {
  overflow: break-word;
  font-size: 25px;
  font-family: "rubik";
  padding-top: 1rem;
  color: #2b1712;
  text-shadow: none;
}
.outer-count {
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 100%;
  background: rgba(229, 115, 115, 1);
}
.inner-count {
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: "martian";
  color: white;
  border-radius: 100%;
  box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 0.5),
    inset -1px -1px 10px rgba(0, 0, 0, 0.5);
  background: rgba(229, 115, 115, 1);
}
.btncc {
  margin: 5px 0px;
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
}
.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  background: rgba(229, 115, 115, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
}
.quantity-controls:hover {
  background: rgba(229, 115, 115, 0.25);
}
.quantity-display {
  font-weight: bold;
  color: #2b1712;
  min-width: 20px;
  text-align: center;
  font-size: 16px;
}

/* ===== Dialog styles ===== */
.dialog-card {
  background: #ffffff;
  color: #2b1712;
  border-radius: 20px;
  max-width: 400px;
  width: 90%;
  border: 1px solid #eaded6;
  box-shadow: 0 20px 60px rgba(43, 23, 18, 0.18);
}

.dialog-image-container {
  text-align: center;
  margin-bottom: 10px;
}
.dialog-image {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.dialog-details h4 {
  margin: 0;
  font-size: 22px;
}
.dialog-details p {
  font-size: 15px;
  color: #806f68;
}
.dialog-details h5 {
  margin-top: 10px;
  color: #f4511e;
}
</style>


<style scoped>
/* ===== New menu image-card grid ===== */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  padding: 18px 12px 24px;
}


.menu-card {
  min-width: 0;
  overflow: hidden;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #eaded6;
  box-shadow: 0 8px 22px rgba(43, 23, 18, 0.08);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}


.menu-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(43, 23, 18, 0.12);
}


.menu-image-wrap {
  width: 100%;
  aspect-ratio: 1 / 0.82;
  overflow: hidden;
  background: #fff7f1;
}


.menu-item-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}


.menu-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(229, 115, 115, 0.8);
  background: linear-gradient(
    135deg,
    rgba(229, 115, 115, 0.12),
    rgba(255, 215, 64, 0.08)
  );
}


.menu-card-content {
  padding: 14px;
}


.menu-card-title {
  font-family: "martian";
  font-size: 15px;
  line-height: 1.35;
  font-weight: 700;
  color: #2b1712;
}


.menu-card-size {
  margin-top: 5px;
  font-family: "rubik";
  font-size: 13px;
  color: #806f68;
}


.menu-card-description {
  margin-top: 7px;
  font-family: "martian";
  font-size: 12px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.65);
}


.menu-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 14px;
}


.menu-card-price {
  font-family: "martian";
  font-size: 14px;
  font-weight: 700;
  color: #f4511e;
}


.menu-card .quantity-controls {
  flex-shrink: 0;
  padding: 3px 6px;
}


@media screen and (max-width: 620px) {
  .menu-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    padding: 12px 6px 20px;
  }


  .menu-image-wrap {
    aspect-ratio: 1 / 0.9;
  }


  .menu-card-content {
    padding: 10px;
  }


  .menu-card-title {
    font-size: 12px;
    line-height: 1.3;
  }


  .menu-card-size {
    font-size: 11px;
  }


  .menu-card-description {
    font-size: 10px;
    line-height: 1.35;
  }


  .menu-card-bottom {
    margin-top: 10px;
    gap: 4px;
    flex-wrap: wrap;
  }


  .menu-card-price {
    font-size: 11px;
  }


  .menu-card .quantity-controls {
    padding: 2px 4px;
    gap: 2px;
  }


  .quantity-display {
    font-size: 12px;
    min-width: 14px;
  }
}
</style>
