import {
  type Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "vue3-toastify";
import { useAuthStore } from "../stores/authStore";

interface RegisterUserData {
  email: string;
  password: string;
  auth: Auth;
  db: ReturnType<typeof getFirestore>;
}

export const registerUser = async ({
  email,
  password,
  auth,
  db,
}: RegisterUserData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Salva os dados do usuário no Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
      uid: user.uid,
    });

    toast.success("Conta criada com sucesso!");

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

interface LoginUserData {
  email: string;
  password: string;
  auth: Auth;
}

export const loginUser = async ({ email, password, auth }: LoginUserData) => {
  const authStore = useAuthStore();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const idToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    const idTokenCookie = useCookie("idToken");
    const refreshTokenCookie = useCookie("refreshToken");

    idTokenCookie.value = idToken;
    refreshTokenCookie.value = refreshToken;

    authStore.isAuthenticated = true;

    return user;
  } catch (error: any) {
    toast.error("Erro ao realizar o login.");
    throw new Error(error.message);
  }
};
