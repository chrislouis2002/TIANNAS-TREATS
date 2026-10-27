<template>
  <section class="treats-scene">
    <header class="site-header">
      <a class="brand" href="#" aria-label="Tianna's Treats Cafe home">
        <span class="brand-heart">♥</span>
        <span class="brand-name">Tianna's Treats Cafe</span>
        <span class="brand-tagline">FOOD · CAFÉ · TREATS</span>
      </a>



      <a
        class="header-order"
        :href="whatsappUrl('Hi Tiannas Treats! Please send me your menu.')"
        target="_blank"
        rel="noopener noreferrer"
      >
        <q-icon name="chat" size="17px" />
        <span>Order on WhatsApp</span>
      </a>
    </header>

    <!-- Hero scene -->
    <main id="home" class="hero">
      <div class="hero-copy">
        <p class="eyebrow">A LITTLE JOY IN EVERY BITE</p>

        <h1>
          Delivery in
          <span>Minutes.</span>
        </h1>

        <!-- <p class="hero-description">
          Good food, lovely treats, and moments worth coming back for.
        </p> -->

        <!-- <a
          class="order-button"
          :href="whatsappUrl('Hi Tiannas Treats! Please send me your menu.')"
          target="_blank"
          rel="noopener noreferrer"
        >
          <q-icon name="chat" size="21px" />
          <span>Order Now</span>
          <q-icon name="arrow_forward" size="20px" />
        </a> -->

        <div class="order-button">
        <q-btn
          label="ORDER FOOD NOW"
          unelevated
          class="orange-btn large-orange-btn"
          @click="$router.push('/menu')"
        />
      </div>
      </div>

      <!-- Replaceable food artwork -->
      <div class="food-artwork">
        <div v-if="!foodImageAvailable" class="food-placeholder">
          <q-icon name="restaurant" size="54px" />
          <strong>Your food artwork goes here</strong>
          <span>food-with-chefs.png</span>
        </div>

        <img
          v-else
          :src="'/minichefs.png'"
          class="food-image"
          alt="Tianna signature food with miniature chefs"
          draggable="false"
          @error="foodImageAvailable = false"
        />

        <span class="food-sparkle sparkle-one">✦</span>
        <span class="food-sparkle sparkle-two">✧</span>
      </div>

      <!-- Functional Instagram-style phone -->
      <div class="phone-position">
        <div class="phone">
          <div class="phone-screen">
            <!-- iPhone status bar -->
            <div class="status-bar">
              <span>9:41</span>
              <span class="dynamic-island"></span>
              <div class="status-icons">
                <q-icon name="signal_cellular_alt" size="14px" />
                <q-icon name="wifi" size="14px" />
                <q-icon name="battery_full" size="17px" />
              </div>
            </div>

            <!-- Instagram header -->
            <header class="chat-header">
              <button class="header-icon" type="button" aria-label="Back">
                <q-icon name="chevron_left" size="27px" />
              </button>

              <div class="avatar-ring">
                <div class="avatar">TR</div>
              </div>

              <div class="profile-details">
                <div class="profile-name">
                  tiannas_treats.ng
                  <q-icon name="verified" size="12px" color="info" />
                </div>
                <div class="profile-subtitle">
                  {{ isTyping ? 'typing...' : 'Tianna’s Treats Café' }}
                </div>
              </div>

              <button class="header-icon" type="button" aria-label="Call">
                <q-icon name="call" size="19px" />
              </button>

              <button
                class="header-icon"
                type="button"
                aria-label="Video call"
              >
                <q-icon name="videocam" size="22px" />
              </button>
            </header>

            <!-- Scrollable conversation -->
            <div
              ref="messageList"
              class="messages"
              aria-label="Demo Instagram conversation"
              aria-live="polite"
              @scroll="onScroll"
            >
              <div class="conversation-date">TODAY</div>

              <div
                v-for="message in messages"
                :key="message.id"
                class="message-row"
                :class="message.from === 'me' ? 'sent' : 'received'"
              >
                <div
                  v-if="message.from === 'cafe'"
                  class="message-avatar"
                >
                  TR
                </div>

                <div class="message-content">
                  <div
                    v-if="message.kind === 'media'"
                    class="food-message"
                  >
                    <img
                      :src="message.image"
                      :alt="message.alt"
                    />
                    <p v-if="message.caption">{{ message.caption }}</p>
                  </div>

                  <div
                    v-else-if="message.kind === 'sticker'"
                    class="sticker-message"
                  >
                    {{ message.text }}
                  </div>

                  <div
                    v-else
                    class="bubble"
                    :class="message.from"
                  >
                    {{ message.text }}
                  </div>

                  <div v-if="message.from === 'me'" class="message-meta">
                    {{ message.time }}
                    <q-icon name="done_all" size="12px" class="read-check" />
                  </div>
                </div>
              </div>

              <div v-if="isTyping" class="typing-row">
                <div class="message-avatar">TR</div>
                <div class="typing-bubble">
                  <i></i><i></i><i></i>
                </div>
              </div>
            </div>

            <!-- Phone keyboard composer -->
            <form class="composer" @submit.prevent="sendMessage">
              <button
                class="composer-icon"
                type="button"
                aria-label="Focus message input"
                @click="focusInput"
              >
                <q-icon name="photo_camera" size="20px" />
              </button>

              <input
                ref="messageInput"
                v-model="draft"
                class="message-input"
                type="text"
                maxlength="500"
                autocomplete="off"
                placeholder="Message..."
                aria-label="Type your message"
                @focus="pauseDemo"
                @blur="resumeDemo"
              />

              <a
                class="composer-icon whatsapp-shortcut"
                :href="whatsappUrl(draft.trim() || defaultOrderMessage)"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Continue on WhatsApp"
                title="Order directly on WhatsApp"
              >
                <q-icon name="chat" size="19px" />
              </a>

              <button
                v-if="draft.trim()"
                class="send-button"
                type="submit"
                aria-label="Send message"
              >
                <q-icon name="arrow_forward" size="20px" />
              </button>

              <button
                v-else
                class="composer-icon heart-button"
                type="button"
                aria-label="Send heart"
                @click="sendHeart"
              >
                <q-icon name="favorite_border" size="22px" />
              </button>
            </form>

            <div class="home-indicator-area">
              <div class="home-indicator"></div>
            </div>
          </div>
        </div>

        <div class="phone-caption">
          <span class="online-dot"></span>
          Chat with Tianna's Treats Cafe
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

/*
 * FOOD IMAGE:
 * Put your image at:
 * public/images/food-with-chefs.png
 *
 * You can change this path whenever you want to use another image.
 */
const foodImage = '/images/food-with-chefs.png'
const foodImageAvailable = ref(true)

/*
 * Replace with your actual WhatsApp business number.
 * Use country code and digits only, without + or spaces.
 */
const WHATSAPP_NUMBER = '2347069637571'

const defaultOrderMessage =
  "Hi Tianna's Treats! I would like to place an order. Please send me your menu."

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// This is a simulated demonstration, not a live Instagram account.
const conversation = [
  {
    from: 'me',
    kind: 'text',
    text: 'Heyyy Tianna! 🧡 I just placed an order from your website!'
  },
  {
    from: 'cafe',
    kind: 'text',
    text: 'Hey foodie! 😍 You came to the right place!'
  },
  {
    from: 'cafe',
    kind: 'text',
    text: 'Yes Mabel! your order is confirmed'
  },
  {
    from: 'cafe',
    kind: 'text',
    text: 'Your  order is a Double King Burger, cheesy pepperoni pizza, fries, asun rice and a strawberry milkshake'
  },
  {
    from: 'cafe',
    kind: 'text',
    text: 'It is currently being prepared and would get to you as soon as possible'
  },
  
  
  {
    from: 'me',
    kind: 'text',
    text: "Thank youuu. Please don’t keep me waiting oo. I'm already salivating 🤤"
  },
  {
    from: 'cafe',
    kind: 'text',
    text: 'No long wait here! your goodies will get to you quickly, Fresh, hot and packed with flavour!😊'
  },
  {
    from: 'me',
    kind: 'text',
    text: 'Amazing, I can’t wait! 🤤'
  },
  {
    from: 'me',
    kind: 'text',
    text: 'waittt, my food is here already?! You guys are fast! 😍'
  },
  {
    from: 'cafe',
    kind: 'sticker',
    text: '🥰🧡'
  },
  {
    from: 'me',
    kind: 'media',
    image:
      '/slider/igchat-image.png',
    alt: 'A delicious rice dish',
    caption: 'This FOOD IS INSANELY GOOD!!! Thanks a lot 🤤'
  },
  {
    from: 'cafe',
    kind: 'text',
    text: "You're welcome. Your cravings deserve the best! ✨"
  }
]


const messages = ref([])
const draft = ref('')
const isTyping = ref(false)
const messageList = ref(null)
const messageInput = ref(null)

const whatsappOrderUrl = computed(() =>
  whatsappUrl(draft.value.trim() || defaultOrderMessage)
)

let sequenceIndex = 0
let demoTimer = null
let typingTimer = null
let resumeTimer = null
let destroyed = false
let paused = false
let visitorIsReading = false

function currentTime() {
  return new Intl.DateTimeFormat('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date())
}

function scrollToLatest(force = false) {
  nextTick(() => {
    if (
      messageList.value &&
      (force || !visitorIsReading)
    ) {
      messageList.value.scrollTop = messageList.value.scrollHeight
    }
  })
}

function clearDemoTimers() {
  clearTimeout(demoTimer)
  clearTimeout(typingTimer)
  demoTimer = null
  typingTimer = null
}

function scheduleNext(delay = 1600) {
  clearTimeout(demoTimer)

  if (!destroyed && !paused) {
    demoTimer = setTimeout(addNextMessage, delay)
  }
}

function addNextMessage() {
  if (destroyed || paused) return

  if (sequenceIndex >= conversation.length) {
    demoTimer = setTimeout(() => {
      if (destroyed || paused) return

      messages.value = []
      sequenceIndex = 0
      scrollToLatest(true)
      scheduleNext(700)
    }, 4000)

    return
  }

  const next = conversation[sequenceIndex]
  isTyping.value = next.from === 'cafe'

  typingTimer = setTimeout(() => {
    if (destroyed || paused) return

    isTyping.value = false

    messages.value.push({
      ...next,
      id: `demo-${Date.now()}-${sequenceIndex}`,
      time: currentTime()
    })

    sequenceIndex += 1
    scrollToLatest()
    scheduleNext(next.kind === 'media' ? 1800 : 1300)
  }, next.kind === 'media' ? 1400 : 950)
}

function pauseDemo() {
  paused = true
  clearDemoTimers()
  clearTimeout(resumeTimer)
  isTyping.value = false
}

function resumeDemo() {
  clearTimeout(resumeTimer)

  resumeTimer = setTimeout(() => {
    if (destroyed) return

    paused = false
    scheduleNext(1400)
  }, 2200)
}

function onScroll() {
  if (!messageList.value) return

  const distanceFromBottom =
    messageList.value.scrollHeight -
    messageList.value.scrollTop -
    messageList.value.clientHeight

  visitorIsReading = distanceFromBottom > 65
}

function sendMessage() {
  const text = draft.value.trim()
  if (!text) return

  clearDemoTimers()
  clearTimeout(resumeTimer)

  messages.value.push({
    id: `visitor-${Date.now()}`,
    from: 'me',
    kind: 'text',
    text,
    time: currentTime()
  })

  draft.value = ''
  paused = true
  isTyping.value = true
  visitorIsReading = false
  scrollToLatest(true)

  typingTimer = setTimeout(() => {
    if (destroyed) return

    isTyping.value = false

    messages.value.push({
      id: `reply-${Date.now()}`,
      from: 'cafe',
      kind: 'text',
      text:
        'Thanks for messaging us! 🧡 Tap the green WhatsApp icon to send your order to our team.',
      time: currentTime()
    })

    scrollToLatest(true)
    resumeDemo()
  }, 1200)
}

function sendHeart() {
  messages.value.push({
    id: `heart-${Date.now()}`,
    from: 'me',
    kind: 'sticker',
    text: '❤️'
  })

  visitorIsReading = false
  scrollToLatest(true)
}

function focusInput() {
  messageInput.value?.focus()
}

onMounted(() => {
  messages.value = [
    {
      id: 'opening-1',
      from: 'me',
      kind: 'text',
      text: 'Heyyy! 🧡 I want asun rice and a strawberry milkshake please!',
      time: '10:24 AM'
    },
    {
      id: 'opening-2',
      from: 'cafe',
      kind: 'text',
      text: 'Hey foodie! 😍 You came to the right place!',
      time: '10:25 AM'
    }
  ]

  sequenceIndex = 2
  scheduleNext(1200)
})

onUnmounted(() => {
  destroyed = true
  clearDemoTimers()
  clearTimeout(resumeTimer)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.treats-scene {
  --cream: #fbf0df;
  --ink: #32190d;
  --orange: #e95108;
  --muted: #987a65;

  position: relative;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
  padding: 0 clamp(20px, 6.2vw, 100px);
  background:
    radial-gradient(ellipse at 54% 67%, rgba(232, 174, 105, 0.12), transparent 36%),
    linear-gradient(112deg, #fcf3e5 0%, #fff1df 55%, #f9ead5 100%);
  color: var(--ink);
  font-family: Inter, "Segoe UI", Arial, sans-serif;
}

/* Header */

.site-header {
  position: relative;
  z-index: 5;
  display: flex;
  width: 100%;
  max-width: 1500px;
  min-height: 112px;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  margin: 0 auto;
}

.brand {
  position: relative;
  display: flex;
  min-width: 225px;
  flex-direction: column;
  align-items: flex-start;
  color: var(--ink);
  text-decoration: none;
}

.brand-name {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(25px, 2.8vw, 43px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.1;
}

.brand-heart {
  position: absolute;
  top: -18px;
  left: 55px;
  transform: rotate(15deg);
  color: var(--orange);
  font-size: 28px;
}

.brand-tagline {
  margin-top: 7px;
  padding-left: 18px;
  color: #d95d32;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 4px;
}


.header-order,
.order-button {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 40px;
  background: linear-gradient(135deg, #f26712, #df4400);
  color: white;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 5px 13px rgba(193, 79, 15, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.header-order {
  padding: 12px 18px;
  font-size: 12px;
}

.header-order:hover,
.order-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(193, 79, 15, 0.18);
}

/* Hero composition */

.hero {
  position: relative;
  display: grid;
  width: 100%;
  max-width: 1500px;
  min-height: min(760px, calc(100svh - 112px));
  grid-template-columns: minmax(245px, 0.9fr) minmax(0, 2.2fr);
  align-items: center;
  margin: 0 auto;
  padding: 20px 0 38px;
}

.hero-copy {
  position: relative;
  z-index: 3;
  align-self: center;
  margin-top: -15px;
}

.eyebrow {
  margin: 0 0 19px;
  color: #b46b3b;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
}

.hero-copy h1 {
  display: flex;
  flex-direction: column;
  margin: 0;
  color: #32180d;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(54px, 6.1vw, 94px);
  font-weight: 700;
  letter-spacing: -5px;
  line-height: 0.91;
}

.hero-copy h1 span {
  color: #df4b0b;
  font-style: italic;
  font-weight: 700;
}

.hero-description {
  max-width: 285px;
  margin: 22px 0 25px;
  color: #866c59;
  font-size: 13px;
  line-height: 1.8;
}

.order-button {
  min-height: 51px;
  gap: 12px;
  padding: 0 23px;
  font-size: 14px;
}

/* Food artwork area.
   Place your transparent food artwork at:
   public/images/food-with-chefs.png
*/

.food-artwork {
  position: absolute;
  z-index: 1;
  top: 5%;
  bottom: 1%;
  left: 17%;
  display: flex;
  width: 65%;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.food-image {
  display: block;
  width: 100%;
  max-width: 920px;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 22px 24px rgba(76, 44, 23, 0.13));
  animation: foodFloat 6s ease-in-out infinite;
}

.food-placeholder {
  display: flex;
  width: min(100%, 600px);
  min-height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px dashed rgba(169, 111, 67, 0.25);
  border-radius: 50%;
  color: #bd8b66;
  text-align: center;
}

.food-placeholder strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(15px, 2vw, 24px);
}

.food-placeholder span {
  font-size: 12px;
}

.food-sparkle {
  position: absolute;
  color: #d78d45;
}

.sparkle-one {
  top: 20%;
  left: 18%;
  font-size: 24px;
}

.sparkle-two {
  right: 18%;
  bottom: 23%;
  font-size: 35px;
}

/* Phone */

.phone-position {
  position: absolute;
  z-index: 4;
  top: 7%;
  right: 5%;
  display: flex;
  width: clamp(250px, 23vw, 330px);
  flex-direction: column;
  align-items: center;
  gap: 17px;
  animation: phoneFloat 5s ease-in-out infinite;
}

.phone {
  width: 100%;
  padding: 7px;
  border: 1px solid #55514d;
  border-radius: 42px;
  background: linear-gradient(135deg, #44413e, #090909 28%, #292725 68%, #080808);
  box-shadow:
    0 30px 55px rgba(50, 28, 13, 0.25),
    0 8px 18px rgba(0, 0, 0, 0.12),
    inset 0 0 0 2px #161616;
}

.phone-screen {
  display: flex;
  height: clamp(560px, 78svh, 720px);
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  border-radius: 35px;
  background: #080808;
  color: #f7f7f7;
}

.status-bar {
  position: relative;
  display: flex;
  min-height: 36px;
  align-items: center;
  justify-content: space-between;
  padding: 0 17px 0 21px;
  background: #080808;
  font-size: 11px;
  font-weight: 700;
}

.dynamic-island {
  position: absolute;
  top: 5px;
  left: 50%;
  width: 83px;
  height: 24px;
  transform: translateX(-50%);
  border-radius: 20px;
  background: #000;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 4px;
}

.chat-header {
  display: flex;
  min-height: 58px;
  align-items: center;
  gap: 7px;
  padding: 0 8px;
  border-bottom: 1px solid #242424;
  background: #101010;
}

.header-icon,
.composer-icon,
.send-button {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: #f6f6f6;
  cursor: pointer;
  text-decoration: none;
}

.header-icon {
  width: 23px;
  height: 35px;
}

.avatar-ring {
  display: grid;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  place-items: center;
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffce5e, #ff5c40, #bd38a3, #7848d5);
}

.avatar {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  border: 2px solid #111;
  border-radius: 50%;
  background: #e95812;
  color: white;
  font-family: Georgia, serif;
  font-size: 13px;
  font-weight: 700;
}

.profile-details {
  min-width: 0;
  flex: 1;
}

.profile-name {
  display: flex;
  align-items: center;
  gap: 3px;
  overflow: hidden;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

.profile-subtitle {
  overflow: hidden;
  margin-top: 3px;
  color: #999;
  font-size: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 9px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 14px 9px;
  background:
    radial-gradient(ellipse at 90% 100%, rgba(92, 52, 31, 0.07), transparent 60%),
    #080808;
  scrollbar-width: thin;
  scrollbar-color: #3b3b3b transparent;
  overscroll-behavior: contain;
}

.conversation-date {
  align-self: center;
  margin-bottom: 5px;
  color: #777;
  font-size: 8px;
  letter-spacing: 1px;
}

.message-row {
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 5px;
  animation: messageAppear 0.25s ease both;
}

.message-row.sent {
  justify-content: flex-end;
}

.message-row.received {
  justify-content: flex-start;
}

.message-avatar {
  display: grid;
  width: 21px;
  height: 21px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 50%;
  background: #e95812;
  color: white;
  font-family: Georgia, serif;
  font-size: 8px;
  font-weight: 700;
}

.message-content {
  display: flex;
  max-width: 85%;
  min-width: 0;
  flex-direction: column;
}

.bubble {
  padding: 8px 10px;
  border-radius: 16px;
  font-size: 10px;
  line-height: 1.5;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.bubble.me {
  border-bottom-right-radius: 5px;
  background: linear-gradient(135deg, #f16a17, #e84b04);
  color: white;
}

.bubble.cafe {
  border: 1px solid #303030;
  border-bottom-left-radius: 5px;
  background: #242424;
  color: #f4f4f4;
}

.food-message {
  max-width: 100%;
  overflow: hidden;
  padding: 4px;
  border: 1px solid #333;
  border-radius: 12px;
  background: #242424;
}

.food-message img {
  display: block;
  width: 100%;
  max-height: 130px;
  border-radius: 8px;
  object-fit: cover;
}

.food-message p {
  margin: 6px 4px 3px;
  color: white;
  font-size: 9px;
  line-height: 1.4;
}

.sticker-message {
  padding: 2px 5px;
  font-size: 32px;
}

.message-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  margin-top: 3px;
  color: #858585;
  font-size: 7px;
}

.read-check {
  color: #54aaff;
}

.typing-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.typing-bubble {
  display: flex;
  height: 28px;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
  border-radius: 15px;
  background: #242424;
}

.typing-bubble i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #aaa;
  animation: typingDot 0.9s infinite ease-in-out;
}

.typing-bubble i:nth-child(2) {
  animation-delay: 0.15s;
}

.typing-bubble i:nth-child(3) {
  animation-delay: 0.3s;
}

.composer {
  display: flex;
  min-height: 46px;
  align-items: center;
  gap: 6px;
  margin: 0 7px 5px;
  padding: 5px 6px;
  border: 1px solid #3b3b3b;
  border-radius: 25px;
  background: #1b1b1b;
}

.composer-icon {
  width: 23px;
  height: 28px;
}

.message-input {
  width: 0;
  min-width: 0;
  height: 31px;
  flex: 1;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #fff;
  font-family: inherit;
  font-size: 10px;
}

.message-input::placeholder {
  color: #aaa;
}

.whatsapp-shortcut {
  color: #48d17a;
}

.whatsapp-shortcut:hover {
  color: #80f2a6;
}

.heart-button {
  color: #f4f4f4;
}

.send-button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff791f, #e84d06);
  color: white;
}

.home-indicator-area {
  display: flex;
  min-height: 16px;
  align-items: center;
  justify-content: center;
  background: #080808;
}

.home-indicator {
  width: 85px;
  height: 4px;
  border-radius: 5px;
  background: #eee;
}

.phone-caption {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #795f4e;
  font-size: 11px;
  font-weight: 600;
}

.online-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4dbd79;
}

/* Motion */

@keyframes foodFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes phoneFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-9px);
  }
}

@keyframes messageAppear {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typingDot {
  0%, 60%, 100% {
    opacity: 0.45;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

/* Medium screens */

@media (max-width: 1050px) {
  .site-header {
    gap: 16px;
  }

  .brand {
    min-width: 190px;
  }

  .brand-name {
    font-size: 31px;
  }

  .brand-tagline {
    font-size: 8px;
    letter-spacing: 3px;
  }

  .navigation {
    gap: 17px;
  }

  .navigation a {
    font-size: 12px;
  }

  .header-order {
    padding: 11px 13px;
  }

  .hero {
    grid-template-columns: minmax(220px, 0.9fr) minmax(0, 2fr);
  }

  .food-artwork {
    left: 15%;
    width: 68%;
  }

  .phone-position {
    right: 0;
    width: clamp(235px, 27vw, 290px);
  }
}



/* Tablet and mobile layout */
@media (max-width: 760px) {
  .treats-scene {
    min-height: 100svh;
    padding: 0 22px 35px;
    overflow: hidden;
  }


  .site-header {
    min-height: 88px;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px 0;
  }


  .brand {
    min-width: 0;
  }


  .brand-name {
    font-size: 29px;
  }


  .brand-heart {
    top: -13px;
    left: 42px;
    font-size: 23px;
  }


  .brand-tagline {
    padding-left: 5px;
    font-size: 7px;
    letter-spacing: 2.6px;
  }


  .navigation {
    order: 3;
    width: 100%;
    justify-content: space-between;
    gap: 10px;
  }


  .navigation a {
    font-size: 12px;
  }


  .header-order {
    padding: 10px 13px;
    font-size: 10px;
  }


  .hero {
    display: flex;
    min-height: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 30px 0 15px;
  }


  .hero-copy {
    align-self: flex-start;
    width: 100%;
    margin: 0;
  }


  .eyebrow {
    margin-bottom: 13px;
    font-size: 9px;
  }


  .hero-copy h1 {
    font-size: clamp(56px, 12vw, 82px);
    letter-spacing: -3px;
  }


  .hero-description {
    max-width: 300px;
    margin: 15px 0 18px;
  }


  .order-button {
    min-height: 45px;
    padding: 0 18px;
  }


  /* Artwork sits behind the phone on mobile */
  .food-artwork {
    position: absolute;
    z-index: 1;
    top: 400px;
    right: 13%;
    bottom: auto;
    left: -18%;
    display: flex;
    width: 100%;
    height: 550px;
    min-height: 0;
    max-height: none;
    align-items: center;
    justify-content: center;
    margin: 0;
  }


  .food-image {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }


  .food-placeholder {
    min-height: 200px;
  }


  /* Keep the existing phone sizing and chat interface */
  .phone-position {
    position: relative;
    z-index: 2;
    top: auto;
    right: auto;
    width: min(100%, 310px);
    align-self: flex-end;
    margin: 20px 0 0 auto;
  }


  .phone-screen {
    height: 600px;
    max-height: 600px;
  }
}


/* Narrow phones */

@media (max-width: 380px) {
  .treats-scene {
    padding-right: 15px;
    padding-left: 15px;
  }

  .brand-name {
    font-size: 25px;
  }

  .header-order {
    gap: 5px;
    padding: 9px 10px;
    font-size: 9px;
  }

  .navigation a {
    font-size: 11px;
  }

  .phone-position {
    width: min(100%, 290px);
  }

  .phone-screen {
    height: 510px;
  }
}

/* Respect reduced-motion settings */

@media (prefers-reduced-motion: reduce) {
  .food-image,
  .phone-position,
  .message-row,
  .typing-bubble i {
    animation: none !important;
  }

  .header-order,
  .order-button {
    transition: none;
  }
}

</style>
