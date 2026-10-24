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


    <!-- ✅ Footer sections -->
    <FirstFooter />
    <LastFooter />

    
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, nextTick } from "vue";
import MenuList from "components/MenuList.vue";
import MenuNavigation from "components/MenuNavigation.vue";
import LastFooter from "components/LastFooter.vue";
import FirstFooter from "components/FirstFooter.vue";
import { useMenu } from "stores/menus";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "IndexPage",
  components: {
    MenuList,
    LastFooter,
    FirstFooter,
    MenuNavigation,
  },
  meta: {
    title: "Menu — Tianna's Treats | Delicious Meals in Awka",
    meta: [
      {
        name: "description",
        content:
          "Discover our menu at Tianna's Treats! Enjoy Nigerian and Continental dishes, freshly made and available for delivery in Awka.",
      },
      {
        property: "og:title",
        content: "Menu — Tianna's Treats | Order Delicious Meals in Awka",
      },
      {
        property: "og:description",
        content:
          "Explore the Tianna's Treats menu and order freshly cooked meals for delivery or pickup in Awka, Anambra.",
      },
      {
        property: "og:image",
        content: "/logoo.png",
      },
    ],
  },

  setup() {
    const store = useMenu();
    const route = useRoute();
    const searchQuery = ref("");
    const cat_name_list = ref([]);
    const categoryImages = {
  // Starters: "starters.jpeg",
  Pizza: "pizza.png",
  Extras: "Loaded-Fries-735x490.webp",
  Salads: "salad.jpeg",
  Drinks: "fruitdrinks.png",
  "Sandwiches & Wraps": "wraps.jpg",
  "Shawarma": "wraps.jpg",
  "Parfait And Desserts": "dessert.jpg",
  "Milkshakes & Smoothies": "milkshake.png",
  "Grills And Fries/Finger Foods": "fingerfoods&sides.jpeg",
  "Rice Dishes": "rice.jpg",
  "Pasta Dishes": "pasta.jpeg",
  Burger: "burgers.png",
  Bakery: "dessert.jpg",
  Cocktails: "wine.png",
  Soups: "catfish-peppersoup.jpg",
  "Specialty Sauces": "sauces.jpeg",
  "Breakfast/Brunch": "english_breakfast.jpeg"

  // Add all your real category names here!
};



    // ✅ Fetch menu from Firestore when page loads


onMounted(async () => {
  await store.fetchMenu();


  // Sort each category's items alphabetically
  store.menu.forEach((category) => {
    if (category.items && Array.isArray(category.items)) {
      category.items.sort((a, b) => a.name.localeCompare(b.name));
    }
  });


  // Build category name list for top navigation
  cat_name_list.value = store.menu.map((cat) => cat.category);


  // Restore the exact food card when returning from a product page
  const productId = route.query.scrollTo;


  if (productId) {
    await nextTick();


    // Wait briefly for the menu cards to appear in the page
    requestAnimationFrame(() => {
      const target = document.getElementById(`menu-item-${productId}`);


      if (target) {
        target.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      }
    });
  }
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


#body {
  background: rgba(0, 0, 0, 0.8);
  background-image: url("../bg1.jpg");
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
