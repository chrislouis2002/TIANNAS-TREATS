<template>
  <q-page class="q-pa-md">

    <h2 class="text-h5 q-mb-md">Checkout</h2>

    <!-- Order Summary -->
    <q-card class="q-pa-md q-mb-md">
      <h3 class="text-h6 q-mb-sm">Your Order</h3>
      <q-list bordered>
        <q-item v-for="(item, i) in store.cart" :key="i">
          <q-item-section>
            <q-item-label>
              {{ item.name }}
              <span v-if="item.size">({{ item.size }})</span>
            </q-item-label>
            <q-item-label caption>Qty: {{ item.quantity }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            ₦{{ (item.price * item.quantity).toLocaleString() }}
          </q-item-section>
        </q-item>
      </q-list>

      <div class="text-right text-h6 q-mt-md">
        Total: ₦{{ store.cartTotal.toLocaleString() }}
      </div>
    </q-card>

    <!-- Customer Info -->
    <q-card class="q-pa-md q-mb-md">
      <h3 class="text-h6 q-mb-sm">Your Details</h3>
      <q-input v-model="customer.name" label="Full Name" outlined dense class="q-mb-sm" />
      <q-input v-model="customer.email" label="Email" type="email" outlined dense class="q-mb-sm" />
      <q-input v-model="customer.phone" label="Phone Number" outlined dense />
    </q-card>

    <!-- Pay Button -->
    <q-btn
      color="red"
      label="Pay with Paystack"
      class="full-width q-py-sm"
      @click="payWithPaystack"
      :disable="!customer.name || !customer.email"
    />

  </q-page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useMenu } from "stores/menus";
import { db } from "src/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default defineComponent({
  name: "CheckoutPage",
  setup() {
    const store = useMenu();

    // Customer details
    const customer = reactive({
      name: "",
      email: "",
      phone: ""
    });

    // Save order to Firestore
    const saveOrder = async (orderData) => {
      try {
        await addDoc(collection(db, "orders"), {
          ...orderData,
          createdAt: serverTimestamp() // ✅ Firebase timestamp
        });
        console.log("✅ Order saved to Firebase!");
      } catch (error) {
        console.error("❌ Error saving order:", error);
      }
    };

    // Paystack Payment
    const payWithPaystack = () => {
      if (!window.PaystackPop) {
        alert("Paystack SDK not loaded yet!");
        return;
      }

      let handler = window.PaystackPop.setup({
        key: "pk_test_436ce659a2a6e0834a4920baa4fbefba581ec064", // Replace with your Paystack PUBLIC KEY
        email: customer.email,
        amount: store.cartTotal * 100, // in kobo
        currency: "NGN",
        ref: "" + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
          custom_fields: [
            {
              display_name: customer.name,
              variable_name: "mobile_number",
              value: customer.phone
            }
          ]
        },
        callback: (response) => {
          alert("Payment successful! Reference: " + response.reference);

          // Build the order object
          const orderData = {
            customerName: customer.name,  // ✅ Save customer name
            customerEmail: customer.email,
            customerPhone: customer.phone,
            items: store.cart,
            total: store.cartTotal,
            paymentRef: response.reference,
            status: "paid"
          };

          // Save to Firestore
          saveOrder(orderData);
        },
        onClose: function () {
          alert("Transaction cancelled.");
        }
      });

      handler.openIframe();
    };

    return { store, customer, payWithPaystack };
  }
});
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
