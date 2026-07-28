<template>
  <footer class="q-pa-lg bg-black text-white">
    <div class="footer-container">
      <!-- Brand / Logo -->
      <div class="footer-section flex flex-center">
        <img src="/logoo.png" alt="Logo" class="footer-logo" />
      </div>

      <!-- Contact Info -->
      <div class="footer-section">
          <p class="text-h6 text-weight-medium text-yellow-6 q-my-lg">VISIT US</p>
        <p>📍 Along Ekwueme Square Road opposite Clinix, close to X-fit Aroma, Awka Anambra</p>
        <p>📞 +234 706 963 7571</p>
        <p>📞 +234 812 969 1245</p>
        <p>📩 tiannarosita@gmail.com</p>
      </div>

      <!-- Working Hours -->
      <div class="footer-section">
                  <p class="text-h6 text-weight-medium text-yellow-6 q-my-lg">OPENING HOURS</p>

        <p>Mon - Sat: 10AM - 6PM</p>
        <p>Sun: 12PM - 9PM</p>
      </div>

      <!-- Social Links -->
      <div class="footer-section flex flex-center">
        <div class="row items-center q-gutter-sm">
          <q-btn
            flat
            round
            icon="fa-brands fa-instagram"
            href="https://www.instagram.com/tiannas_treats.ng/?hl=en"
            target="_blank"
            class="text-white"
          />
          <q-btn
            flat
            round
            icon="fa-brands fa-facebook"
            href="https://m.facebook.com/TiannastreatsGranola/"
            target="_blank"
            class="text-white"
          />
          <q-btn
            flat
            round
            icon="fa-brands fa-whatsapp"
            href="https://wa.me/+2347069637571"
            target="_blank"
            class="text-white"
          />
        </div>
      </div>
    </div>

    <div class="footer-bottom q-mt-md text-center">
      © {{ new Date().getFullYear() }} Tianna Rosita Gourmet • All Rights Reserved
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  display: flex;
  flex-direction: column; /* mobile */
  gap: 20px;
}

@media (min-width: 768px) {
  .footer-container {
    flex-direction: row; /* desktop */
    justify-content: space-between;
    align-items: flex-start;
  }
}

.footer-section {
  flex: 1 1 250px;
}

.footer-logo {
  width: 150px;
  height: 150px;
}

.footer-bottom {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
