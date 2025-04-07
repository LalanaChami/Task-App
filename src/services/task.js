import {
  ref,
  push,
  set,
  update,
  remove,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

import { db } from "@config/firebase";
import { saveTasksToStorage, getTasksFromStorage, clearTasksFromStorage } from "@utils/storageUtils";

const TASKS_PATH = "tasks";

export const createTask = async (userId, taskData) => {
  try {
    const taskWithMetadata = {
      ...taskData,
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completed: false,
    };

    const newTaskRef = push(ref(db, TASKS_PATH));
    await set(newTaskRef, taskWithMetadata);

    const newTask = { id: newTaskRef.key, ...taskWithMetadata };

    const { tasks: storedTasks } = (await getTasksFromStorage()) || { tasks: [] };
    const updatedTasks = [newTask, ...storedTasks];
    await saveTasksToStorage(userId, updatedTasks);

    return { id: newTaskRef.key, ...taskWithMetadata, success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: error.message, success: false };
  }
};

export const getUserTasks = async (userId) => {
  try {
    const storedTasksData = await getTasksFromStorage();

    if (storedTasksData && storedTasksData.userId === userId) {
      return { tasks: storedTasksData.tasks, success: true, fromCache: true };
    } else {
      clearTasksFromStorage();
    }

    const tasksRef = query(
      ref(db, TASKS_PATH),
      orderByChild('userId'),
      equalTo(userId)
    );

    const snapshot = await get(tasksRef);
    const tasks = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        tasks.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
    }

    tasks.sort((a, b) => b.createdAt - a.createdAt);

    await saveTasksToStorage(userId, tasks);

    return { tasks, success: true, fromCache: false };
  } catch (error) {
    // console.error("Error getting tasks:", error);

    // try {
    //   const storedTasksData = await getTasksFromStorage();
    //   if (storedTasksData && storedTasksData.userId === userId) {
    //     console.log("Falling back to cached tasks due to error");
    //     return {
    //       tasks: storedTasksData.tasks,
    //       success: true,
    //       fromCache: true,
    //       networkError: error.message,
    //     };
    //   }
    // } catch (storageError) {
    //   console.error("Storage fallback also failed:", storageError);
    // }

    return { error: error.message, success: false, tasks: [] };
  }
};

export const getTaskById = async (taskId) => {
  try {
    const storedTasksData = await getTasksFromStorage();
    if (storedTasksData && storedTasksData.tasks) {
      const cachedTask = storedTasksData.tasks.find((task) => task.id === taskId);
      if (cachedTask) {
        console.log("Using cached task from storage");
        return { task: cachedTask, success: true, fromCache: true };
      }
    }

    const taskRef = ref(db, `${TASKS_PATH}/${taskId}`);
    const snapshot = await get(taskRef);

    if (snapshot.exists()) {
      return { task: { id: snapshot.key, ...snapshot.val() }, success: true };
    } else {
      return { error: "Task not found", success: false };
    }
  } catch (error) {
    console.error("Error getting task:", error);
    return { error: error.message, success: false };
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const taskRef = ref(db, `${TASKS_PATH}/${taskId}`);

    const updatedData = {
      ...taskData,
      updatedAt: Date.now(),
    };

    await update(taskRef, updatedData);

    const storedTasksData = await getTasksFromStorage();
    if (storedTasksData && storedTasksData.tasks) {
      const updatedTasks = storedTasksData.tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...taskData, updatedAt: Date.now() }
          : task
      );
      await saveTasksToStorage(storedTasksData.userId, updatedTasks);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating task:", error);
    return { error: error.message, success: false };
  }
};

export const toggleTaskCompletion = async (taskId, currentStatus) => {
  try {
    const taskRef = ref(db, `${TASKS_PATH}/${taskId}`);

    await update(taskRef, {
      completed: !currentStatus,
      updatedAt: Date.now(),
    });

    const storedTasksData = await getTasksFromStorage();
    if (storedTasksData && storedTasksData.tasks) {
      const updatedTasks = storedTasksData.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !currentStatus,
              updatedAt: Date.now(),
            }
          : task
      );
      await saveTasksToStorage(storedTasksData.userId, updatedTasks);
    }

    return { success: true };
  } catch (error) {
    console.error("Error toggling task completion:", error);
    return { error: error.message, success: false };
  }
};

export const deleteTask = async (taskId) => {
  try {
    const taskRef = ref(db, `${TASKS_PATH}/${taskId}`);
    await remove(taskRef);

    const storedTasksData = await getTasksFromStorage();
    if (storedTasksData && storedTasksData.tasks) {
      const updatedTasks = storedTasksData.tasks.filter(
        (task) => task.id !== taskId
      );
      await saveTasksToStorage(storedTasksData.userId, updatedTasks);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { error: error.message, success: false };
  }
};
