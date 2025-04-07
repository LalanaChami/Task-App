import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "@config/firebase";
import { saveUserToStorage, getUserFromStorage } from "@utils/storageUtils";

import { ref, set, get, update } from "firebase/database";
import { db } from "@config/firebase";

const USERS_PATH = "users";

export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: displayName || userCredential.user.displayName,
      lastLogin: new Date().toISOString(),
    };
    await saveUserToStorage(userData);

    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      lastLogin: new Date().toISOString(),
    };
    await saveUserToStorage(userData);

    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      const storedUser = await getUserFromStorage();
      if (storedUser) {
        console.log("User is logged out but app has stored user data");
      }
    }
    callback(user);
  });
};

export const getCurrentUser = (auth1) => {
  console.log(auth1);
  return auth.currentUser;
};

export const getStoredUserData = async () => {
  return await getUserFromStorage();
};

export const saveUserToDatabase = async (userData) => {
  try {
    const userRef = ref(db, `${USERS_PATH}/${userData.uid}`);
    await set(userRef, {
      email: userData.email,
      displayName: userData.displayName,
      createdAt: userData.createdAt || Date.now(),
      lastLogin: userData.lastLogin || Date.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving user to database:", error);
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const userRef = ref(db, `${USERS_PATH}/${userId}`);
    await update(userRef, {
      ...updateData,
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = ref(db, `${USERS_PATH}/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    }
    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return { success: false, error: error.message };
  }
};
