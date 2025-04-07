import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { auth } from "@config/firebase";
import { getCurrentUser, getUserProfile } from "@services/auth";
import { getUserTasks } from "@services/task";

import { styles } from "./styles";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const currentUser = getCurrentUser(auth);
      if (currentUser) {
        setUser(currentUser);
        loadUserProfile(currentUser.uid);
        loadRecentTasks(currentUser.uid);
      } else {
        setLoading(false);
      }
    }, [navigation])
  );

  const loadUserProfile = async (userId) => {
    try {
      const { success, data } = await getUserProfile(userId);
      if (success) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  const loadRecentTasks = async (userId) => {
    try {
      const { tasks, success } = await getUserTasks(userId);
      if (success) {
        setRecentTasks(tasks.slice(0, 3));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>
          {userProfile?.displayName ||
            user?.displayName ||
            user?.email?.split("@")[0] ||
            "User"}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="stats-chart" size={24} color="#4285F4" />
          <Text style={styles.cardTitle}>Your Activity</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{recentTasks.length}</Text>
            <Text style={styles.statLabel}>Recent Tasks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {recentTasks.filter((task) => task.completed).length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {recentTasks.filter((task) => !task.completed).length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="time" size={24} color="#4285F4" />
          <Text style={styles.cardTitle}>Recent Tasks</Text>
        </View>

        {recentTasks.length > 0 ? (
          <View style={styles.taskList}>
            {recentTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
                onPress={() =>
                  navigation.navigate("TasksTab", {
                    screen: "TaskDetail",
                    params: { taskId: task.id },
                  })
                }
              >
                <View
                  style={[
                    styles.taskStatus,
                    task.completed ? styles.taskCompleted : styles.taskPending,
                  ]}
                />
                <Text style={styles.taskTitle} numberOfLines={1}>
                  {task.title}
                </Text>
                <Ionicons name="chevron-forward" size={18} color="#888" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyTasks}>
            <Text style={styles.emptyText}>No tasks yet</Text>
            <TouchableOpacity
              style={styles.addTaskButton}
              onPress={() => navigation.navigate("TasksTab")}
            >
              <Text style={styles.addTaskButtonText}>Add Your First Task</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("TasksTab")}
        >
          <Ionicons name="list" size={20} color="#fff" />
          <Text style={styles.footerButtonText}>View All Tasks</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
