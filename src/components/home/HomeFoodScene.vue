

<template>
  <section
    class="home-food-scene"
    aria-label="Tianna's Treats — a world of delicious creations"
  >
    <div class="food-scene-inner">
      <!-- Cinematic food video -->
      <video
        class="food-scene-video"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        aria-label="Miniature chefs creating delicious treats"
      >
        <!-- Mobile portrait video -->
        <source
          src="/videos/73e487ad-a233-4ae6-991c-13498b3053c3%20(1).mp4"
          type="video/mp4"
          media="(max-width: 600px)"
        />


        <!-- Optional desktop video -->
        
        <source
          src="/videos/85b29245-2597-448c-8b29-f8ad6acaf56d.mp4"
          type="video/mp4"
        />
       
      </video>


      <!-- Atmospheric overlays -->
      <div class="food-scene-shade" aria-hidden="true"></div>
      <div class="food-scene-grain" aria-hidden="true"></div>


      <!-- Brand signature -->
      <div class="food-brand">
        <span class="brand-mark">T</span>
        <span class="brand-name">TIANNA'S TREATS</span>
      </div>


      <!-- Left editorial caption -->
      <div class="food-scene-caption food-caption-left">
        <span class="caption-eyebrow">
          <span class="eyebrow-line"></span>
          MADE WITH LOVE
        </span>


        <h2>
          Your Cravings,
          <br />
          <span>Always Satisfied.</span>
        </h2>


        <p class="caption-description">
          Little details.
          <br />
          Unforgettable deliciousness.
        </p>


        <span class="caption-flourish" aria-hidden="true">✳</span>
      </div>


      <!-- Right editorial caption -->
      <div class="food-scene-caption food-caption-right">
        <span class="caption-number">01 / THE EXPERIENCE</span>


        <p class="right-caption-copy">
          Your Stomach Called
          <br />
          and <em>we answered.</em>
        </p>


        <span class="caption-heart" aria-hidden="true">♡</span>
      </div>


      <!-- Bottom signature -->
      <div class="food-scene-footer">
        <span class="footer-note">
          FRESHLY MADE. ALWAYS DELICIOUS.
        </span>


        <span class="footer-decoration" aria-hidden="true">
          ✳ &nbsp; ♥ &nbsp; ✳
        </span>
      </div>
    </div>
  </section>
</template>


<style>
/* ---------------------------------------
   GLOBAL RESET — REMOVE PAGE SIDE GAPS
---------------------------------------- */


:global(*) {
  box-sizing: border-box;
}


:global(html),
:global(body),
:global(#app) {
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
}


:global(html),
:global(body) {
  overflow-x: hidden;
}


/* ---------------------------------------
   TIANNA'S TREATS — CINEMATIC FOOD HERO
---------------------------------------- */


.home-food-scene {
  --cream: #fff8ef;
  --chocolate: #48271d;
  --caramel: #e99a48;
  --soft-white: rgba(255, 248, 239, 0.88);


  position: relative;
  width: 100vw;
  max-width: none;
  margin-left: calc(50% - 50vw);
  padding: 0;
  color: var(--cream);
  background: #17100d;
  overflow: hidden;
}


/* Full-width main stage */


.food-scene-inner {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: none;
  aspect-ratio: 16 / 9;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #171713;
}


/* Full-bleed video — no side borders */


.food-scene-video {
  position: absolute;
  inset: 0;
  z-index: -3;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  object-fit: cover;
  object-position: center;
  border: 0;
  outline: 0;
  background: #17100d;
}

/* Cinematic edge shading */


.food-scene-shade {
  position: absolute;
  z-index: -2;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      rgba(20, 12, 9, 0.62) 0%,
      rgba(20, 12, 9, 0.24) 28%,
      rgba(20, 12, 9, 0.04) 52%,
      rgba(20, 12, 9, 0.2) 74%,
      rgba(20, 12, 9, 0.55) 100%
    ),
    linear-gradient(
      180deg,
      rgba(20, 12, 9, 0.48) 0%,
      transparent 24%,
      transparent 70%,
      rgba(20, 12, 9, 0.6) 100%
    );
}


/* Subtle editorial texture */


.food-scene-grain {
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  opacity: 0.13;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}


/* Brand signature */


.food-brand {
  position: absolute;
  top: 6%;
  left: 5%;
  display: flex;
  align-items: center;
  gap: 11px;
  color: var(--cream);
}


.brand-mark {
  display: grid;
  width: 37px;
  height: 37px;
  place-items: center;
  border: 1px solid rgba(255, 248, 239, 0.75);
  border-radius: 50%;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
  font-style: italic;
  line-height: 1;
}


.brand-name {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
}


/* Shared caption layout */


.food-scene-caption {
  position: absolute;
  z-index: 2;
  color: var(--cream);
  pointer-events: none;
}


.food-caption-left {
  top: 25%;
  left: 5%;
  width: 33%;
  max-width: 400px;
}


.caption-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 19px;
  color: var(--soft-white);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
}


.eyebrow-line {
  display: inline-block;
  width: 24px;
  height: 1px;
  background: var(--caramel);
}


.food-caption-left h2 {
  margin: 0;
  color: var(--cream);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 4.4vw, 68px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.055em;
  text-wrap: balance;
}


.food-caption-left h2 span {
  color: #f3bd83;
  font-style: italic;
  font-weight: 400;
}


.caption-description {
  margin: 20px 0 0;
  color: rgba(255, 248, 239, 0.83);
  font-family: Arial, Helvetica, sans-serif;
  font-size: clamp(11px, 1.05vw, 14px);
  font-weight: 400;
  line-height: 1.85;
  letter-spacing: 0.025em;
}


.caption-flourish {
  display: inline-block;
  margin-top: 23px;
  color: var(--caramel);
  font-size: 22px;
  animation: flourish-turn 14s linear infinite;
}


/* Right-hand editorial note */


.food-caption-right {
  top: 28%;
  right: 5%;
  width: 22%;
  max-width: 270px;
  text-align: right;
}


.caption-number {
  display: inline-block;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 248, 239, 0.4);
  color: var(--soft-white);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
  letter-spacing: 0.16em;
}


.right-caption-copy {
  margin: 17px 0 0;
  color: var(--cream);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(20px, 2.35vw, 34px);
  font-weight: 400;
  line-height: 1.32;
  letter-spacing: -0.035em;
}


.right-caption-copy em {
  color: #f3bd83;
  font-weight: 400;
}


.caption-heart {
  display: inline-block;
  margin-top: 17px;
  color: #f0ad71;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
  animation: heart-breathe 3s ease-in-out infinite;
}


/* Bottom signature */


.food-scene-footer {
  position: absolute;
  right: 5%;
  bottom: 5%;
  left: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 248, 239, 0.28);
}


.footer-note {
  color: rgba(255, 248, 239, 0.85);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.17em;
}


.footer-decoration {
  color: #f3bd83;
  font-size: 12px;
  letter-spacing: 0.08em;
}


/* Decorative motion */


@keyframes flourish-turn {
  from {
    transform: rotate(0deg);
  }


  to {
    transform: rotate(360deg);
  }
}


@keyframes heart-breathe {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }


  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}


/* ---------------------------------------
   TABLET
---------------------------------------- */


@media (min-width: 601px) and (max-width: 900px) {
  .food-scene-inner {
    width: 100%;
    aspect-ratio: 4 / 3;
  }


  .food-caption-left {
    top: 26%;
    width: 37%;
  }


  .food-caption-right {
    top: 29%;
    width: 24%;
  }


  .food-caption-left h2 {
    font-size: clamp(36px, 5vw, 52px);
  }


  .right-caption-copy {
    font-size: clamp(22px, 3vw, 29px);
  }
}


/* ---------------------------------------
   MOBILE — EDGE-TO-EDGE PORTRAIT HERO
---------------------------------------- */


@media (max-width: 600px) {
  .home-food-scene {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
    background: #17100d;
  }


  .food-scene-inner {
    width: 100%;
    max-width: none;
    height: 88svh;
    min-height: 560px;
    max-height: 820px;
    aspect-ratio: auto;
    margin: 0;
    padding: 0;
  }


  .food-scene-video {
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }


  .food-scene-shade {
    background:
      linear-gradient(
        180deg,
        rgba(20, 12, 9, 0.64) 0%,
        rgba(20, 12, 9, 0.12) 21%,
        rgba(20, 12, 9, 0.02) 42%,
        rgba(20, 12, 9, 0.12) 65%,
        rgba(20, 12, 9, 0.72) 100%
      ),
      linear-gradient(
        90deg,
        rgba(20, 12, 9, 0.16),
        transparent 45%,
        rgba(20, 12, 9, 0.1)
      );
  }


  .food-brand {
    top: 25px;
    left: 22px;
    gap: 9px;
  }


  .brand-mark {
    width: 34px;
    height: 34px;
    font-size: 21px;
  }


  .brand-name {
    font-size: 9px;
    letter-spacing: 0.16em;
  }


  /* Headline */


  .food-caption-left {
    top: 13%;
    left: 23px;
    width: 70%;
    max-width: 300px;
  }


  .caption-eyebrow {
    gap: 8px;
    margin-bottom: 13px;
    font-size: 8px;
    letter-spacing: 0.17em;
  }


  .eyebrow-line {
    width: 19px;
  }


  .food-caption-left h2 {
    font-size: clamp(35px, 10vw, 48px);
    line-height: 1.04;
    letter-spacing: -0.055em;
  }


  .caption-description {
    margin-top: 12px;
    font-size: 11px;
    line-height: 1.7;
  }


  .caption-flourish {
    margin-top: 12px;
    font-size: 18px;
  }


  /* Right caption */


  .food-caption-right {
    top: auto;
    right: 22px;
    bottom: 15%;
    width: 49%;
    max-width: 210px;
  }


  .caption-number {
    padding-bottom: 7px;
    font-size: 7px;
    letter-spacing: 0.13em;
  }


  .right-caption-copy {
    margin-top: 10px;
    font-size: clamp(20px, 5.8vw, 27px);
    line-height: 1.2;
  }


  .caption-heart {
    margin-top: 8px;
    font-size: 24px;
  }


  /* Footer */


  .food-scene-footer {
    right: 22px;
    bottom: 22px;
    left: 22px;
    gap: 8px;
    padding-top: 12px;
  }


  .footer-note {
    font-size: 7px;
    line-height: 1.5;
    letter-spacing: 0.12em;
  }


  .footer-decoration {
    font-size: 10px;
    white-space: nowrap;
  }
}


/* Smaller mobile screens */


@media (max-width: 380px) {
  .food-scene-inner {
    height: 85svh;
    min-height: 520px;
  }


  .food-caption-left {
    left: 18px;
    width: 76%;
  }


  .food-caption-left h2 {
    font-size: 34px;
  }


  .caption-description {
    font-size: 10px;
  }


  .food-caption-right {
    right: 18px;
    width: 52%;
  }


  .right-caption-copy {
    font-size: 20px;
  }


  .food-scene-footer {
    right: 18px;
    left: 18px;
  }


  .footer-note {
    font-size: 6px;
  }
}


/* Landscape phones */


@media (max-width: 900px) and (orientation: landscape) {
  .food-scene-inner {
    width: 100%;
    height: 100svh;
    min-height: 360px;
    max-height: none;
    aspect-ratio: auto;
  }


  .food-caption-left {
    top: 25%;
  }


  .food-caption-right {
    top: 27%;
    bottom: auto;
  }


  .food-scene-footer {
    bottom: 16px;
  }
}

@media (max-width: 600px) {
  .home-food-scene {
    width: 100vw;
    max-width: none;
    margin-left: calc(50% - 50vw);
    padding: 0;
  }


  .food-scene-inner {
    width: 100%;
    max-width: none;
    margin: 0;
  }


  .food-scene-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Respect reduced-motion preferences */


@media (prefers-reduced-motion: reduce) {
  .caption-flourish,
  .caption-heart {
    animation: none;
  }
}
</style>

