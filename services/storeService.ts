import { Firestore, doc, setDoc } from "firebase/firestore";

interface CreateStoreData {
  storeName: string;
  storeSegment: string;
  userId: string;
  db: Firestore;
}

export const createStoreInFirestore = async ({
  storeName,
  storeSegment,
  userId,
  db,
}: CreateStoreData) => {
  try {
    await setDoc(doc(db, "stores", userId), {
      storeName,
      storeSegment,
      ownerId: userId,
      createdAt: new Date(),
    });
    return true;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao criar a loja.");
  }
};
