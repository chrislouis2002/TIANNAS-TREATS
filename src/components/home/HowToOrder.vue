

<template>
  <!-- HOW TO ORDER -->
  <section class="order-section">
    <div class="section-container">
      <div class="centered-heading">
        <span class="section-eyebrow">SIMPLE & EASY</span>


        <h2 class="section-heading">HOW TO ORDER</h2>


        <p class="section-intro">
          Your favourite meal is only a few clicks away.
        </p>
      </div>


      <div class="order-steps">
        <div
          v-for="(step, index) in orderSteps"
          :key="step.number"
          class="order-step"
          :class="{ 'clickable-step': step.route }"
        >
          <div class="step-number">
            {{ step.number }}
          </div>


          <div class="step-visual">
            <img
              :src="step.image"
              :alt="step.title"
              class="step-image"
              draggable="false"
            />
          </div>


          <h3>{{ step.title }}</h3>


          <p>{{ step.description }}</p>


          <div
            v-if="index < orderSteps.length - 1"
            class="order-step-arrow"
            aria-hidden="true"
          >
            <q-icon name="arrow_forward" />
          </div>


          <button
            v-if="step.route"
            type="button"
            class="step-action"
            :aria-label="`${step.title} — continue`"
            @click="$router.push(step.route)"
          >
            Learn more
            <q-icon name="arrow_forward" />
          </button>
        </div>
      </div>


      <div class="order-cta">
        <q-btn
          label="ORDER FOOD NOW"
          unelevated
          class="orange-btn large-orange-btn"
          @click="$router.push('/menu')"
        />
      </div>
    </div>
  </section>
</template>


<script setup>
const orderSteps = [
  {
    number: "01",
    image: "/how-to-order/browse-menu.png",
    title: "Browse Menu",
    description:
      "Explore our delicious dishes and choose your favourites.",
    route: "/menu",
  },
  {
    number: "02",
    image: "/how-to-order/add-to-cart.png",
    title: "Add to Cart",
    description:
      "Select your meals and add them to your order.",
    route: "/menu",
  },
  {
    number: "03",
    image: "/how-to-order/checkout.png",
    title: "Checkout",
    description:
      "Confirm your details and pay securely.",
    route: "/checkout",
  },
  {
    number: "04",
    image: "/how-to-order/enjoy.png",
    title: "Enjoy",
    description:
      "Relax while your freshly prepared meal comes to you.",
    route: null,
  },
];
</script>



<style scoped>
/* ===========================
   HOW TO ORDER
=========================== */


.order-section {
  position: relative;
  overflow: hidden;
  padding: 100px 24px;
  background:
    radial-gradient(
      circle at 10% 15%,
      rgba(243, 159, 24, 0.09),
      transparent 30%
    ),
    linear-gradient(180deg, #fffaf5 0%, #fff5eb 100%);
  color: #422718;
}


.section-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}


/* Heading */


.centered-heading {
  max-width: 620px;
  margin: 0 auto 60px;
  text-align: center;
}


.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  color: #c36e36;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 3px;
}


.section-eyebrow::before,
.section-eyebrow::after {
  width: 22px;
  height: 1px;
  background: #d9a47d;
  content: "";
}


.section-heading {
  margin: 0;
  color: #482817;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  letter-spacing: -1.2px;
  line-height: 1.15;
}


.section-intro {
  margin: 16px 0 0;
  color: #8c7565;
  font-size: 16px;
  line-height: 1.8;
}


/* Steps */


.order-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}


.order-step {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  padding: 28px 20px 24px;
  text-align: center;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(188, 137, 99, 0.17);
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(91, 53, 29, 0.035);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}


.order-step.clickable-step:hover {
  transform: translateY(-6px);
  border-color: rgba(195, 110, 54, 0.4);
  box-shadow: 0 18px 38px rgba(91, 53, 29, 0.09);
}


.step-number {
  position: absolute;
  top: 18px;
  left: 18px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: #a65c2f;
  background: #fff0e1;
  border: 1px solid #f2ddca;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 800;
}


.step-visual {
  display: grid;
  width: 100%;
  max-width: 180px;
  aspect-ratio: 1 / 0.85;
  margin: 20px 0 22px;
  place-items: center;
  background: radial-gradient(
    circle,
    #fff0df 0%,
    rgba(255, 240, 223, 0.35) 68%,
    transparent 100%
  );
  border-radius: 22px;
}


.step-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  transition: transform 0.35s ease;
}


.order-step:hover .step-image {
  transform: scale(1.06) rotate(-2deg);
}


.order-step h3 {
  margin: 0 0 10px;
  color: #492b1b;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.35;
}


.order-step p {
  max-width: 240px;
  margin: 0;
  color: #8b7768;
  font-size: 13px;
  line-height: 1.8;
}


/* Step action */


.step-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 18px;
  padding: 0;
  color: #b66432;
  background: transparent;
  border: 0;
  font: inherit;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: color 0.2s ease;
}


.step-action:hover {
  color: #773812;
}


.step-action:focus-visible {
  outline: 2px solid #b66432;
  outline-offset: 5px;
  border-radius: 4px;
}


/* Connector arrow */


.order-step-arrow {
  position: absolute;
  top: 48%;
  right: -25px;
  z-index: 2;
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  color: #b86d3d;
  background: #fffaf5;
  border: 1px solid #f0ddcb;
  border-radius: 50%;
  font-size: 16px;
}


/* Main CTA */


.order-cta {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}


:deep(.large-orange-btn) {
  min-height: 54px;
  padding: 0 30px;
  color: #fff !important;
  background: linear-gradient(135deg, #b85e2b, #873d19) !important;
  border-radius: 999px;
  box-shadow: 0 10px 24px rgba(142, 65, 25, 0.2);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}


:deep(.large-orange-btn:hover) {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(142, 65, 25, 0.28);
}


/* ===========================
   TABLET
=========================== */


@media (max-width: 1024px) {
  .order-section {
    padding: 80px 22px;
  }


  .order-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }


  .order-step {
    padding: 26px 22px;
  }


  .step-visual {
    max-width: 190px;
  }


  /* No connector arrows in a two-column layout */
  .order-step-arrow {
    display: none;
  }
}


/* ===========================
   MOBILE
=========================== */


@media (max-width: 600px) {
  .order-section {
    padding: 58px 16px 64px;
  }


  .centered-heading {
    margin-bottom: 32px;
  }


  .section-eyebrow {
    margin-bottom: 12px;
    font-size: 9px;
    letter-spacing: 2.4px;
  }


  .section-eyebrow::before,
  .section-eyebrow::after {
    width: 16px;
  }


  .section-heading {
    font-size: clamp(29px, 8vw, 36px);
    letter-spacing: -0.7px;
  }


  .section-intro {
    max-width: 300px;
    margin: 12px auto 0;
    font-size: 13px;
    line-height: 1.7;
  }


  .order-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }


  .order-step {
    padding: 18px 12px 17px;
    border-radius: 19px;
    box-shadow: 0 5px 18px rgba(91, 53, 29, 0.045);
  }


  .step-number {
    top: 12px;
    left: 12px;
    width: 30px;
    height: 30px;
    font-size: 10px;
  }


  .step-visual {
    width: 100%;
    max-width: 135px;
    aspect-ratio: 1 / 0.9;
    margin: 22px 0 14px;
    border-radius: 16px;
  }


  .order-step h3 {
    margin-bottom: 7px;
    font-size: 14px;
    line-height: 1.4;
  }


  .order-step p {
    font-size: 11px;
    line-height: 1.7;
  }


  .step-action {
    gap: 4px;
    margin-top: 13px;
    font-size: 10px;
  }


  .order-cta {
    margin-top: 30px;
  }


  :deep(.large-orange-btn) {
    width: 100%;
    max-width: 320px;
    min-height: 52px;
    font-size: 11px;
    letter-spacing: 0.8px;
  }
}


/* Small phones */


@media (max-width: 360px) {
  .order-section {
    padding-right: 12px;
    padding-left: 12px;
  }


  .order-steps {
    gap: 9px;
  }


  .order-step {
    padding: 16px 9px;
  }


  .step-number {
    top: 9px;
    left: 9px;
    width: 27px;
    height: 27px;
  }


  .order-step h3 {
    font-size: 13px;
  }


  .order-step p {
    font-size: 10px;
  }
}


/* Accessibility */


@media (prefers-reduced-motion: reduce) {
  .order-step,
  .step-image,
  .step-action,
  :deep(.large-orange-btn) {
    transition: none;
  }


  .order-step.clickable-step:hover,
  :deep(.large-orange-btn:hover) {
    transform: none;
  }
}


</style>

