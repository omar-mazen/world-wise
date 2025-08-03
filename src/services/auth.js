import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { app } from "./firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const signup = async (userName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: userName });
  } catch (error) {
    throw new Error(error.message);
  }
};
export const signin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getCurrentUser = () => {
  try {
    return auth.currentUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (newData) => {
  const user = auth.currentUser;
  await updateProfile(user, newData);
};
export const updateUserPassword = async (newPassword) => {
  const user = auth.currentUser;
  updatePassword(user, newPassword);
};
export const authInstance = auth;
