import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { getCurrentUser } from "./auth";

export const getCities = async () => {
  const userId = getCurrentUser()?.uid;
  try {
    const q = query(collection(db, "cities"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const subscribeToCities = (callback) => {
  const userId = getCurrentUser()?.uid;
  console.log(userId);

  try {
    const q = query(collection(db, "cities"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(cities);
    });

    return unsubscribe;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCity = async (cityId) => {
  try {
    const docRef = doc(db, "cities", cityId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCity = async ({
  country,
  name,
  date,
  emoji,
  position,
  note,
}) => {
  try {
    const res = await addDoc(collection(db, "cities"), {
      userId: getCurrentUser()?.uid,
      country,
      name,
      date: Timestamp.fromDate(new Date(date)),
      emoji,
      position,
      note,
    });
    return res.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCity = async (cityId) => {
  try {
    const cityRef = doc(db, "cities", cityId);
    await deleteDoc(cityRef);
  } catch (error) {
    throw new Error(error.message);
  }
};
