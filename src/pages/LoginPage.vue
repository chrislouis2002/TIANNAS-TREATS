<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-md" style="max-width:400px; width:100%;">
      <q-card-section>
        <div class="text-h6">Restaurant Admin Login</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" label="Email" type="email" class="q-mb-md" />
        <q-input v-model="password" label="Password" type="password" class="q-mb-md" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click="login" label="Login" color="primary" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, authReady, db } from "src/firebase";
import { useRouter } from "vue-router";


const email = ref("");
const password = ref("");
const router = useRouter();

const ADMIN_EMAIL = "tiannastreats.gifts@gmail.com";


async function login() {
  try {
    await authReady;


    const credential = await signInWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value
    );


    if (credential.user.email?.toLowerCase() !== ADMIN_EMAIL) {
      await signOut(auth);
      alert("This account is not authorized to access the admin dashboard.");
      return;
    }


    const redirect = router.currentRoute.value.query.redirect;
    await router.replace(
      typeof redirect === "string" && redirect.startsWith("/")
        ? redirect
        : "/admin"
    );
  } catch (err) {
    alert("Login failed: " + err.message);
  }
}
</script>
