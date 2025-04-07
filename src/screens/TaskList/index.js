import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { auth } from "@config/firebase";
import {
  getUserTasks,
  createTask,
  toggleTaskCompletion,
  deleteTask,
} from "@services/task";
import { getCurrentUser } from "@services/auth";

import { styles } from "./styles";
const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const user = getCurrentUser(auth);

  const loadTasks = async () => {
    if (!user) return;

    try {
      const { tasks: userTasks, success, error } = await getUserTasks(user.uid);

      if (success) {
        setTasks(userTasks);
      } else {
        // Alert.alert("Error", error || "Failed to load tasks");
      }
    } catch (error) {
      // Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [navigation])
  );

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      // Alert.alert("Error", "Task title cannot be empty");
      return;
    }

    try {
      const { success, error } = await createTask(user.uid, {
        title: newTaskTitle.trim(),
      });

      if (success) {
        setNewTaskTitle("");
        loadTasks();
      } else {
        // Alert.alert("Error", error || "Failed to create task");
      }
    } catch (error) {
      // Alert.alert("Error", error.message);
    }
  };

  const handleToggleCompletion = async (taskId, currentStatus) => {
    try {
      const { success, error } = await toggleTaskCompletion(
        taskId,
        currentStatus
      );

      if (success) {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !currentStatus } : task
          )
        );
      } else {
        // Alert.alert("Error", error || "Failed to update task");
      }
    } catch (error) {
      // Alert.alert("Error", error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const { success, error } = await deleteTask(taskId);

            if (success) {
              setTasks(tasks.filter((task) => task.id !== taskId));
            } else {
              // Alert.alert("Error", error || "Failed to delete task");
            }
          } catch (error) {
            // Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadTasks();
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={styles.taskCheckbox}
        onPress={() => handleToggleCompletion(item.id, item.completed)}
      >
        <View
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskContent}
        onPress={() =>
          navigation.navigate("TasksTab", {
            screen: "TaskDetail",
            params: { taskId: item.id },
          })
        }
      >
        <Text
          style={[
            styles.taskTitle,
            item.completed && styles.taskTitleCompleted,
          ]}
        >
          {item.title}
        </Text>

        <Text style={styles.taskDate}>
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "Just now"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTask(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task!
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

export default TaskListScreen;
