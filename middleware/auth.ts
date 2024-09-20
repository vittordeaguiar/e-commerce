export default defineNuxtRouteMiddleware((to, from) => {
  const idTokenCookie = useCookie("idToken");
  const router = useRouter();
  if (!idTokenCookie.value) return router.push("/login");
});
