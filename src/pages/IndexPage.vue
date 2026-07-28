<template>
  <div id="body">
    <!-- ✅ Top navigation -->
    <MenuNavigation :categories="cat_name_list" />

    <div id="header-section" class="q-pa-sm">
      <div class="logobx"><img src="logoo.png" id="logo" /></div>
      <div id="menu">MENU</div>
    </div>

    <!-- ✅ Global  Bar -->
    <div class="q-pa-md flex flex-center">
      <q-input
        v-model="searchQuery"
        placeholder="Search for a food item..."
        filled
        dense
        rounded
        standout="bg-red text-white"
        input-class="text-white"
        class="search-bar"
      >
        <template v-slot:append>
          <q-icon name="search" color="white" />
        </template>
      </q-input>
    </div>

   <!-- ✅ Display each category and its items -->
<div class="q-ma-sm">
  <div class="q-ma-sm">
<div v-for="(category, index) in filteredMenu" :key="index">
    <MenuList
      :foods="category.items"
      :category="category.category"
    :image="categoryImages[category.category]"
      :categoryIndex="index"
      :description="category.description"

    />
  </div>
</div>

</div>


    <!-- ✅ Floating Cart Button -->
    <div
      @click.stop="cart_list = true"
      v-if="store.cart.length"
      style="position: fixed; z-index: 20"
      class="cart-outer"
    >
      <div class="cart-inner">
        <img
          src="13.png"
          style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
          "
        />
      </div>
      <span class="cart-count">{{ store.cart.length }}</span>
    </div>

    <!-- ✅ Footer sections -->
    <FirstFooter />
    <LastFooter />

    <!-- ✅ Cart Modal -->
    <q-dialog v-model="cart_list" persistent>
      <q-card class="cartm">
        <div style="margin-bottom: 2.5rem; padding: 5px 5px">
          <q-btn
            @click.stop="cart_list = false"
            flat
            class="float-right bg-red-2 text-red"
            fab-mini
          >
            <q-icon name="close" />
          </q-btn>
        </div>

        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 400px; max-width: 450px"
        >
          <div
            v-for="(item, i) in store.cart"
            :key="i"
            class="listx"
            style="
              position: relative;
              padding: 10px;
              min-width: 100%;
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: 30% 75%;
              justify-content: space-between;
            "
          >
            <div style="display: flex; justify-content: flex-start">
              <div class="outer-countindex">
                <div class="inner-countindex">{{ i + 1 }}</div>
              </div>
            </div>

            <div class="food-infoindex text-white">
              <div>
                <div>{{ item.name }}</div>
                <div v-if="item.size" style="font-family: 'rubik'">
                  {{ item.size }}
                </div>
              </div>

              <q-btn
                style="position: absolute; right: 0.5rem; top: 1.5rem"
                @click.stop="store.removeFromCart(item)"
                flat
                class="bg-transparent text-red"
                fab-mini
              >
                <q-icon name="close" />
              </q-btn>

              <div>
                Price
                {{
                  new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(item.price)
                }}
              </div>

              <!-- Quantity controls -->
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-top: 5px;
                "
              >
                <q-btn
                  dense
                  flat
                  icon="remove"
                  @click="store.decreaseQuantity(item)"
                />
                <span>{{ item.quantity }}</span>
                <q-btn dense flat icon="add" @click="store.addToCart(item)" />
              </div>
            </div>
          </div>
        </q-scroll-area>

        <!-- ✅ Checkout Button -->
        <div style="text-align: center; margin-top: 1rem; padding: 10px">
          <q-btn
            color="red"
            label="Checkout"
            class="q-px-lg q-py-sm"
            to="/checkout"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import MenuList from "components/MenuList.vue";
import MenuNavigation from "components/MenuNavigation.vue";
import LastFooter from "components/LastFooter.vue";
import FirstFooter from "components/FirstFooter.vue";
import { useMenu } from "stores/menus";

export default defineComponent({
  name: "IndexPage",
  components: {
    MenuList,
    LastFooter,
    FirstFooter,
    MenuNavigation,
  },
  meta: {
    title: "Menu — Tianna Rosita Gourmet | Delicious Meals in Awka",
    meta: [
      {
        name: "description",
        content:
          "Discover our menu at Tianna Rosita Gourmet! Enjoy Nigerian and Continental dishes, freshly made and available for delivery in Awka.",
      },
      {
        property: "og:title",
        content: "Menu — Tianna Rosita Gourmet | Order Delicious Meals in Awka",
      },
      {
        property: "og:description",
        content:
          "Explore the Tianna Rosita Gourmet menu and order freshly cooked meals for delivery or pickup in Awka, Anambra.",
      },
      {
        property: "og:image",
        content: "/logo.png",
      },
    ],
  },

  setup() {
    const store = useMenu();
    const searchQuery = ref("");
    const cart_list = ref(false);
    const cat_name_list = ref([]);
    const categoryImages = {
  Starters: "starters.jpeg",
  Pizza: "pizza.png",
  Extras: "Loaded-Fries-735x490.webp",
  Salads: "salad.jpeg",
  Drinks: "wine.png",
  Desserts: "dessert.jpg",
  "Finger Foods & Sides": "fingerfoods&sides.jpeg",
  "Main Dishes": "rice.jpg",
  "Burgers/Sandwiches/Wraps": "burgers.png"

  // Add all your real category names here!
};



    // ✅ Fetch menu from Firestore when page loads
   onMounted(async () => {
  await store.fetchMenu();

  // ✅ Sort each category's items alphabetically
  store.menu.forEach(category => {
    if (category.items && Array.isArray(category.items)) {
      category.items.sort((a, b) => a.name.localeCompare(b.name));
    }
  });

  // ✅ Build category name list for top navigation
  cat_name_list.value = store.menu.map(cat => cat.category);
});



    // ✅ Filter menu by search
const filteredMenu = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return store.menu; // ✅ No search? Show everything normally.

  // ✅ Loop through categories and filter items inside them
  return store.menu
    .map(category => {
      const filteredItems = category.items.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      return {
        ...category,
        items: filteredItems
      };
    })
    .filter(category => category.items.length > 0); // ✅ Only keep categories with results
});





    // ✅ Select item to add to cart (fixed to pick exact item)
const select = (selectedItem) => {
  store.addToCart(selectedItem);
};




    return {
      store,
      searchQuery,
      filteredMenu,
      cart_list,
      select,
      cat_name_list,
      categoryImages,
    };
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: "martian";
  src: url("../Martian_Mono/MartianMono-VariableFont_wdth.ttf");
}

@font-face {
  font-family: "rubik";
  src: url("../Rubik_Spray_Paint/RubikSprayPaint-Regular.ttf");
}
.cartm {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 25px;
}
.cart-count {
  font-family: "rubik";
  font-size: 20px;
  transform: translate(-30px, -20px);
  color: rgba(0, 0, 0, 1);
}
#body {
  background: rgba(0, 0, 0, 0.8);
  background-image: url("../6.png");
  background-repeat: no-repeat;
  min-width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.intro-pics {
  border: 5px solid;
  border-width: 5px;
  border-image: linear-gradient(
      45deg,
      rgba(229, 115, 115, 1),
      rgba(255, 215, 64, 1)
    )
    1;
}

@media screen and (min-width: 640px) {
  .logo-box-ch {
  }
  #body {
    background-size: 100vw 100vh;
  }

  #info-box {
    font-size: 4rem;
    position: relative;
  }
  .intro-pics {
    width: 100px;
    height: 100px;
    margin: 1rem 0.5rem;
  }
  .cartm {
    max-width: 600px;
    min-width: 350px;
    padding: 3px;
  }
  .food-infoindex {
    font-size: 10px;
  }
  .logobx {
    width: 250px;
    height: 250px;
  }
  #logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

#info-box {
  color: white;
  text-align: center;
  font-family: "martian";
  text-shadow: 1.5px 1.5px rgba(0, 0, 0, 0.4);
}
@media screen and (max-width: 620px) {
  .logobx {
    width: 250px;
    height: 250px;
  }
  #logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  #info-box {
    font-size: 1.8rem;
  }
  .blend {
    display: none;
  }
  .intro-pics {
    width: 90px;
    height: 90px;
    margin: 0px 5px;
  }
  .cartm {
    width: 100%;
    padding: 3px;
  }
  #body {
    background-size: 100% auto;
    background-attachment: fixed;
    background-position: top;

    -webkit-background-size: 100% auto;
    -webkit-background-attachment: fixed;
    -webkit-background-position: top;

    -moz-background-size: 100% auto;
    -moz-background-attachment: fixed;
    -moz-background-position: top;
  }
}
#menu {
  font-family: "rubik";
  text-align: center;
  color: white;
  font-size: 40px;
}
.blend {
  position: absolute;
  width: 800px;
  height: 800px;
  background: linear-gradient(
    45deg,
    rgba(229, 115, 115, 0.1),
    rgba(255, 215, 64, 0.1)
  );
  top: -520px;
  right: -50px;
  border-bottom-left-radius: 50%;
  transition: width 2s;
}
.intimg {
  object-fit: fill;
  width: 100%;
  height: 100%;
}
.cart-outer {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 1);
  border-radius: 100%;
  top: 3rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.5), -1px -1px 20px rgba(0, 0, 0, 0.5);
}
.cart-inner {
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 100%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2), -1px -1px 10px rgba(0, 0, 0, 0.2);
}
.outer-countindex {
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 100%;
  background: rgba(229, 115, 115, 1);
}
.inner-countindex {
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: "martian";
  color: white;
  border-radius: 100%;
  box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 0.5),
    inset -1px -1px 10px rgba(0, 0, 0, 0.5);
  background: rgba(229, 115, 115, 1);
}
.food-infoindex {
  font-family: "martian";
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.listx {
  border-bottom: 1.1px solid rgba(229, 115, 115, 0.6);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
#header-section {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  grid-row-gap: 1rem;
  justify-content: center;
}

.search-bar {
  max-width: 500px; /* keeps it from stretching too wide */
  width: 100%; /* takes available space */
  border-radius: 25px; /* rounded pill look */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* soft shadow */
  background: rgba(229, 115, 115, 0.9); /* subtle red background */
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.7); /* softer white placeholder */
  font-style: italic;
}
</style>
