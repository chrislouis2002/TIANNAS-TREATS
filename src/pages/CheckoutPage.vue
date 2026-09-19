<template>
  <q-page class="checkout-page q-pa-md">
    <div class="checkout-container">


      <h2 class="checkout-title">Checkout</h2>


      <q-card class="checkout-card q-pa-md q-mb-md">
        <h3 class="text-h6 q-mb-sm">Your Order</h3>


        <q-list bordered separator>
          <q-item
            v-for="(item, i) in store.cart"
            :key="i"
          >
            <q-item-section>
              <q-item-label>
                {{ item.name }}
                <span v-if="item.size">({{ item.size }})</span>
              </q-item-label>


              <q-item-label caption>
                Qty: {{ item.quantity }}
              </q-item-label>
            </q-item-section>


            <q-item-section side>
              ₦{{ (item.price * item.quantity).toLocaleString() }}
            </q-item-section>
          </q-item>
        </q-list>


        <div class="checkout-total">
          Total: ₦{{ store.cartTotal.toLocaleString() }}
        </div>
      </q-card>




      <template v-if="!bankTransferStarted">


        <q-card class="checkout-card q-pa-md q-mb-md">
          <h3 class="text-h6 q-mb-sm">Your Details</h3>


          <q-input
            v-model="customer.name"
            label="Full Name"
            outlined
            dense
            class="q-mb-sm"
          />


          <q-input
            v-model="customer.email"
            label="Email"
            type="email"
            outlined
            dense
            class="q-mb-sm"
          />


          <q-input
            v-model="customer.phone"
            label="Phone Number"
            outlined
            dense
          />
        </q-card>




        <q-card class="checkout-card payment-option q-mb-md">
          <q-card-section>
            <div class="payment-option-title">
              <span>💳</span>


              <div>
                <strong>Paystack</strong>


                <div class="payment-unavailable">
                  Temporarily Unavailable
                </div>
              </div>
            </div>


            <p class="payment-note">
              Online card payments are temporarily unavailable.
              Please use Bank Transfer for now.
            </p>
          </q-card-section>
        </q-card>




        <q-card class="checkout-card payment-option">
          <q-card-section>


            <div class="payment-option-title">
              <span>🏦</span>


              <div>
                <strong>Bank Transfer</strong>


                <div class="payment-available">
                  Available Now
                </div>
              </div>
            </div>


            <p class="payment-note">
              Transfer the exact amount to our business account.
            </p>


            <q-btn
              label="Pay by Bank Transfer"
              color="red"
              class="full-width q-py-sm"
              :disable="
                !customer.name ||
                !customer.email ||
                !customer.phone ||
                !store.cart.length
              "
              :loading="startingTransfer"
              @click="startBankTransfer"
            />


          </q-card-section>
        </q-card>


      </template>




      <q-card
        v-if="bankTransferStarted"
        class="checkout-card bank-transfer-card q-pa-md"
      >


        <div class="transfer-header">
          <h3>🏦 Bank Transfer</h3>


          <div class="timer">
            Time remaining:
            <strong>{{ formattedTime }}</strong>
          </div>
        </div>


        <q-separator class="q-my-md" />




        <div class="transfer-amount">
          <span>Amount to Transfer</span>


          <strong>
            ₦{{ store.cartTotal.toLocaleString() }}
          </strong>
        </div>




        <div class="bank-details">


          <div class="bank-detail">
            <span>Bank Name</span>
            <strong>Moniepoint</strong>
          </div>


          <div class="bank-detail">
            <span>Account Name</span>
            <strong>Tiannas Treats Cafe</strong>
          </div>


          <div class="bank-detail account-number">
            <span>Account Number</span>
            <strong>7069637571</strong>
          </div>


        </div>




        <q-banner
          v-if="transferExpired"
          class="expired-banner q-mt-md"
        >
          Your bank transfer session has expired.
          Please refresh the page and start again.
        </q-banner>




        <template v-else>


          <p class="transfer-instructions">
            Please transfer the exact amount above to the account details
            provided. After completing your transfer, click the button below
            and send your payment receipt to us on WhatsApp.
          </p>


          <q-btn
            label="I've Made the Transfer — Send Receipt on WhatsApp"
            color="green"
            class="full-width q-py-sm"
            @click="sendReceiptToWhatsApp"
          />


        </template>


      </q-card>


    </div>
  </q-page>
</template>




<script>
import {
  defineComponent,
  reactive,
  ref,
  computed,
  onBeforeUnmount
} from "vue";


import { useMenu } from "stores/menus";
import { db } from "src/firebase";


import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";




export default defineComponent({
  name: "CheckoutPage",


  setup() {
    const store = useMenu();


    const customer = reactive({
      name: "",
      email: "",
      phone: ""
    });


    const bankTransferStarted = ref(false);
    const startingTransfer = ref(false);
    const transferExpired = ref(false);


    const timeRemaining = ref(15 * 60);


    let timerInterval = null;


    const orderId = ref(null);




    const formattedTime = computed(() => {
      const minutes = Math.floor(timeRemaining.value / 60);
      const seconds = timeRemaining.value % 60;


      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    });




    const saveOrder = async (orderData) => {
      const orderRef = await addDoc(
        collection(db, "orders"),
        {
          ...orderData,
          createdAt: serverTimestamp()
        }
      );


      return orderRef.id;
    };




    const startCountdown = () => {
      clearInterval(timerInterval);


      timerInterval = setInterval(() => {
        if (timeRemaining.value <= 0) {
          clearInterval(timerInterval);
          transferExpired.value = true;
          return;
        }


        timeRemaining.value--;
      }, 1000);
    };




    const startBankTransfer = async () => {
      if (
        !customer.name ||
        !customer.email ||
        !customer.phone ||
        !store.cart.length
      ) {
        return;
      }


      startingTransfer.value = true;


      try {
        const newOrderId = await saveOrder({
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,


          items: store.cart.map((item) => ({
            ...item
          })),


          total: store.cartTotal,


          paymentMethod: "bank_transfer",


          status: "awaiting_payment_confirmation",


          transferSessionStartedAt: new Date().toISOString()
        });


        orderId.value = newOrderId;


        bankTransferStarted.value = true;
        transferExpired.value = false;
        timeRemaining.value = 15 * 60;


        startCountdown();


      } catch (error) {
        console.error(
          "Error starting bank transfer:",
          error
        );


        alert(
          "Something went wrong while creating your order. Please try again."
        );


      } finally {
        startingTransfer.value = false;
      }
    };




    const sendReceiptToWhatsApp = () => {
      if (transferExpired.value) {
        return;
      }


      clearInterval(timerInterval);


      const orderItems = store.cart
        .map(
          (item) =>
            `• ${item.name}${
              item.size ? ` (${item.size})` : ""
            } × ${item.quantity}`
        )
        .join("\n");




      const message =
`Hello Tiannas Treats Cafe,


I have completed my bank transfer.


Order ID: ${orderId.value}


Name: ${customer.name}


Phone: ${customer.phone}


Amount Paid: ₦${store.cartTotal.toLocaleString()}


Order:
${orderItems}


I will attach my transfer receipt below.`;




      const whatsappNumber = "2348129691245";


      const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`;




      window.open(
        whatsappUrl,
        "_blank"
      );
    };




    onBeforeUnmount(() => {
      clearInterval(timerInterval);
    });




    return {
      store,
      customer,
      bankTransferStarted,
      startingTransfer,
      transferExpired,
      formattedTime,
      startBankTransfer,
      sendReceiptToWhatsApp
    };
  }
});
</script>




<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #fff;
}


.checkout-container {
  width: min(720px, 100%);
  margin: 0 auto;
}


.checkout-title {
  font-family: "rubik", sans-serif;
  color: #2b1712;
}


.checkout-card {
  background: #fff;
  color: #2b1712;
  border: 1px solid #eaded6;
  border-radius: 20px;
  box-shadow: 0 8px 28px rgba(43, 23, 18, 0.06);
}


.checkout-total {
  margin-top: 18px;
  text-align: right;
  font-size: 20px;
  font-weight: 700;
  color: #f4511e;
}


.payment-option {
  overflow: hidden;
}


.payment-option-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 17px;
}


.payment-option-title > span {
  font-size: 28px;
}


.payment-unavailable {
  margin-top: 3px;
  font-size: 13px;
  color: #b3261e;
}


.payment-available {
  margin-top: 3px;
  font-size: 13px;
  color: #2e7d32;
}


.payment-note {
  margin: 16px 0;
  color: #806f68;
  line-height: 1.6;
}


.bank-transfer-card {
  margin-top: 10px;
}


.transfer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}


.transfer-header h3 {
  margin: 0;
}


.timer {
  color: #806f68;
}


.timer strong {
  margin-left: 5px;
  color: #f4511e;
}


.transfer-amount {
  padding: 18px;
  border-radius: 16px;
  background: #fff7f1;
  text-align: center;
}


.transfer-amount span {
  display: block;
  font-size: 14px;
  color: #806f68;
}


.transfer-amount strong {
  display: block;
  margin-top: 6px;
  font-size: 28px;
  color: #f4511e;
}


.bank-details {
  margin-top: 20px;
}


.bank-detail {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #eaded6;
}


.bank-detail span {
  color: #806f68;
}


.account-number strong {
  font-size: 18px;
  letter-spacing: 1px;
}


.transfer-instructions {
  margin: 22px 0;
  line-height: 1.7;
  color: #806f68;
}


.expired-banner {
  background: #fff0ee;
  color: #b3261e;
  border-radius: 12px;
}


.full-width {
  width: 100%;
}


@media screen and (max-width: 600px) {
  .checkout-page {
    padding: 16px 10px;
  }


  .transfer-header {
    align-items: flex-start;
    flex-direction: column;
  }


  .bank-detail {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
