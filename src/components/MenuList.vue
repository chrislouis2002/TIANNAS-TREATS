<template>
  <div class="bgg">
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

      <div class="listxcont">
        <div
          class="listx"
          v-for="(item, i) in foods"
          :key="i"
          style="
            padding: 10px;
            min-width: 100%;
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: 30% 75%;
            justify-content: space-between;
          "
        >
          <div style="display: flex; justify-content: flex-start">
            <div class="outer-count">
              <div class="inner-count">{{ i + 1 }}</div>
            </div>
          </div>

          <div class="food-info">
            <div>
              <div>
                {{ item.name }}
                <div class="view-btn-container"></div>
              </div>
              <div v-if="item.size">{{ item.size }}</div>
              <div class="btncc">
                <div class="quantity-controls">
                  <q-btn
                    label="View"
                    :style="{ color: 'hsla(0, 69%, 80%, 1)' }"
                    unelevated
                    class="view-btn"
                    @click="openDialog(item)"
                  />

                  <q-btn
                    dense
                    flat
                    icon="remove"
                    :style="{ color: 'hsla(0, 69%, 80%, 1)' }"
                    @click="decreaseQuantity(item)"
                  />
                  <span class="quantity-display">{{ cart[item.id] || 0 }}</span>

                  <q-btn
                    dense
                    flat
                    icon="add"
                    :style="{ color: 'hsla(0, 69%, 80%, 1)' }"
                    @click="increaseQuantity(item)"
                  />
                </div>
              </div>
            </div>

            <div>
              Price
              {{
                new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(item.price)
              }}
            </div>
          </div>
        </div>
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

  setup() {
    const store = useMenu();

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
  background: rgb(8, 13, 10);
  margin-top: 1rem;
  border-radius: 25px;
}
.title-cat {
  overflow: break-word;
  font-size: 25px;
  font-family: "rubik";
  padding-top: 1rem;
  color: rgba(255, 255, 255, 1);
  text-shadow: 1px 1px rgb(0, 0, 0);
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
  color: rgba(255, 255, 255, 0.9);
  min-width: 20px;
  text-align: center;
  font-size: 16px;
}

/* ===== Dialog styles ===== */
.dialog-card {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
backdrop-filter: blur(5px);
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
  color: rgba(255, 255, 255, 0.7);
}
.dialog-details h5 {
  margin-top: 10px;
  color: #ffcdd2;
}
</style>
