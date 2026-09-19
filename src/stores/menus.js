
import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "src/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export const useMenu = defineStore("menu", {
  state: () => ({
    menu: [],
    loading: false,
    cart: [],
  }),

  getters: {
    // ✅ Total price of items in cart
    cartTotal: (state) =>
      state.cart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      ),

    // ✅ Total quantity (useful for floating badge)
    totalItems: (state) =>
      state.cart.reduce((sum, item) => sum + (item.quantity || 0), 0),

    // ✅ Get quantity of a specific item by id
    getQuantity: (state) => (id) => {
      const found = state.cart.find((c) => c.id === id);
      return found ? found.quantity : 0;
    },
  },

  actions: {
    // ✅ Fetch menu from Firestore and group by category
    async fetchMenu() {
      this.loading = true;
      this.menu = [];

      try {
        const menuCollection = collection(db, "menu");
        const categorySnapshots = await getDocs(menuCollection);
        const groupedMenu = {};

        categorySnapshots.forEach((doc) => {
          const data = doc.data();
          const categoryName = data.category?.trim() || "Uncategorized";

          if (!groupedMenu[categoryName]) {
            groupedMenu[categoryName] = {
              category: categoryName,
              description: data.category_description || "",
              category_image: data.category_image || "",
              items: [],
            };
          }

          groupedMenu[categoryName].items.push({
            id: doc.id,
            name: data.name || "Unnamed Item",
            price: parseFloat(data.price) || 0,
            image: data.image || "",
            description: data.description || "",
            size: data.size || "",
          });
        });

        this.menu = Object.values(groupedMenu);
        console.log("✅ Grouped menu loaded:", this.menu);
      } catch (err) {
        console.error("❌ Error fetching grouped menu:", err);
      } finally {
        this.loading = false;
      }
    },

    // ✅ Add item to cart (used by + button)
    addToCart(item) {
      const existing = this.cart.find((c) => c.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },

    // ✅ Remove item completely from cart (used when user deletes)
    removeFromCart(item) {
      this.cart = this.cart.filter((c) => c.id !== item.id);
    },

    // ✅ Decrease item quantity (used by - button)
    decreaseQuantity(item) {
      const existing = this.cart.find((c) => c.id === item.id);
      if (existing) {
        existing.quantity -= 1;
        if (existing.quantity <= 0) {
          this.removeFromCart(item);
        }
      }
    },

    // ✅ Clear entire cart
    clearCart() {
      this.cart = [];
    },
  },
});
