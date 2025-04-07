import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { getTaskById, updateTask } from "@services/task";

import { styles } from "./styles";

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    try {
      const { task: fetchedTask, success, error } = await getTaskById(taskId);

      if (success) {
        setTask(fetchedTask);
        setTitle(fetchedTask.title || "");
        setDescription(fetchedTask.description || "");
      } else {
        // Alert.alert("Error", error || "Failed to load task");
        navigation.goBack();
      }
    } catch (error) {
      // Alert.alert("Error", error.message);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      // Alert.alert("Error", "Task title cannot be empty");
      return;
    }

    setSaving(true);
    try {
      const { success, error } = await updateTask(taskId, {
        title: title.trim(),
        description: description.trim(),
      });

      if (success) {
        Alert.alert("Success", "Task updated successfully");
        navigation.goBack();
      } else {
        // Alert.alert("Error", error || "Failed to update task");
      }
    } catch (error) {
      // Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Add description (optional)"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Created:</Text>
        <Text style={styles.infoValue}>
          {task.createdAt
            ? new Date(task.createdAt).toLocaleString()
            : "Unknown"}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Updated:</Text>
        <Text style={styles.infoValue}>
          {task.createdAt
            ? new Date(task.updatedAt).toLocaleString()
            : "Unknown"}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Status:</Text>
        <Text
          style={[
            styles.infoValue,
            task.completed ? styles.completedStatus : styles.pendingStatus,
          ]}
        >
          {task.completed ? "Completed" : "Pending"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TaskDetailScreen;
