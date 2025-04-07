import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_STORAGE_KEY = "@tasks";
const USER_STORAGE_KEY = "@user";

export const saveTasksToStorage = async (userId, tasks) => {
  try {
    const tasksData = {
      userId,
      tasks,
      lastUpdated: new Date().toISOString(),
    };
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksData));
    return true;
  } catch (error) {
    console.error("Error saving tasks to storage:", error);
    return false;
  }
};

export const getTasksFromStorage = async () => {
  try {
    const tasksData = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (tasksData) {
      return JSON.parse(tasksData);
    }
    return null;
  } catch (error) {
    console.error("Error getting tasks from storage:", error);
    return null;
  }
};

export const saveUserToStorage = async (userData) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error("Error saving user to storage:", error);
    return false;
  }
};

export const getUserFromStorage = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error("Error getting user from storage:", error);
    return null;
  }
};

export const clearUserFromStorage = async () => {
  try {
    // await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing user from storage:", error);
    return false;
  }
};

export const clearTasksFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
    // await AsyncStorage.removeItem(USER_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing user from storage:", error);
    return false;
  }
};
