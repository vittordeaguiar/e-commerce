<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { createStoreInFirestore } from "../services/storeService";

const storeName = ref<string>("");
const storeSegment = ref<string>("");
const error = ref<string>("");
const router = useRouter();
const { $db, $auth } = useNuxtApp();
const auth = $auth as Auth;
const db = $db as Firestore;

const createStore = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado.");

    if (!storeName.value) throw new Error("Nome da loja é obrigatório.");
    if (!storeSegment.value) throw new Error("Segmento é obrigatório.");

    // Chama a service para criar a loja no Firestore
    await createStoreInFirestore({
      storeName: storeName.value,
      storeSegment: storeSegment.value,
      userId: user.uid,
      db: db,
    });

    // Redireciona para a página de cadastro de produtos
    router.push("/add-products");
  } catch (e: any) {
    error.value = e.message;
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 class="text-center">Crie a sua loja!</h1>
        <v-form @submit.prevent="createStore">
          <v-text-field
            v-model="storeName"
            label="Nome da Loja"
            outlined
            required
          />
          <v-text-field
            v-model="storeSegment"
            label="Segmento da Loja"
            outlined
            required
          />
          <v-btn color="primary" type="submit" block> Criar Loja </v-btn>
          <v-alert v-if="error" type="error" class="mt-4">
            {{ error }}
          </v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
../services/store../services/storeService
