import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ isAuthenticated: false }),
  actions: {
    checkAuth() {
      const idToken = useCookie("idToken");
      this.isAuthenticated = !!idToken.value;
    },
    logout() {
      const idToken = useCookie("idToken");
      const refreshToken = useCookie("refreshToken");
      idToken.value = null;
      refreshToken.value = null;
      this.isAuthenticated = false;
      window.location.reload();
    },
  },
});
