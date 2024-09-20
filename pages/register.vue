<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../services/authService";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

const email = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");
const router = useRouter();

const { $auth, $db } = useNuxtApp();
const auth = $auth as Auth;
const db = $db as Firestore;

const register = async () => {
  try {
    debugger;
    if (!email.value) throw new Error("E-mail inválido.");
    if (!password.value) throw new Error("Senha inválida.");

    await registerUser({
      email: email.value,
      password: password.value,
      auth: auth,
      db: db,
    });

    router.push("/create-store");
  } catch (e: any) {
    error.value = e.message;
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 class="text-center">Crie a sua conta!</h1>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            outlined
            required
          />
          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            outlined
            required
          />
          <v-btn color="primary" type="submit" block> Registrar </v-btn>
          <v-alert v-if="error" type="error" class="mt-4">
            {{ error }}
          </v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
../services/auth../services/authService
