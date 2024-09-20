import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { toast, type ToastOptions } from "vue3-toastify";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toasity, {
    autoClose: 5000,
    position: "top-right",
  } as ToastContainerOptions);

  return {
    provide: {
      toastify: (msg: string, options?: ToastOptions) => {
        toast(msg, {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
          ...options,
        });
      },
    },
  };
});
