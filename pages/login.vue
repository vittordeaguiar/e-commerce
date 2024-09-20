<script setup lang="ts">
import { ref } from "vue";
import { loginUser } from "../services/authService";
import type { Auth } from "firebase/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const { $auth } = useNuxtApp();
const auth = $auth as Auth;
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");

const login = async () => {
  try {
    await loginUser({
      email: email.value,
      password: password.value,
      auth: auth,
    });
    await router.push("/dashboard");
    toast.success("Login realizado com sucesso!");
  } catch (error: any) {
    error.value = error.message;
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 class="text-center">Entre na sua conta!</h1>
        <v-form @submit.prevent="login">
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
          <v-btn color="primary" type="submit" block> Entrar </v-btn>
          <v-alert v-if="error" type="error" class="mt-4">
            {{ error }}
          </v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
../services/auth../services/authService
