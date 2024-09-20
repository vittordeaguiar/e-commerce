<script setup lang="ts">
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

authStore.checkAuth();

watchEffect(() => authStore.isAuthenticated);

const logout = () => authStore.logout();
</script>

<template>
  <nav class="flex items-center justify-between p-4 border-b border-zinc-400">
    <section>
      <h1 class="text-xl">E-commerce</h1>
    </section>
    <section class="flex items-center space-x-6">
      <v-spacer></v-spacer>
      <v-btn v-if="!authStore.isAuthenticated" to="/login">Entrar</v-btn>
      <v-btn v-if="!authStore.isAuthenticated" to="/register">Cadastrar</v-btn>
      <v-btn v-if="authStore.isAuthenticated" @click="logout">Sair</v-btn>
    </section>
  </nav>
</template>
