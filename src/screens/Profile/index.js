import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { auth } from "@config/firebase";
import {
  getCurrentUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
} from "@services/auth";
import { clearUserFromStorage } from "@utils/storageUtils";

import { styles } from "./styles";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const currentUser = getCurrentUser(auth);
      if (currentUser) {
        setUser(currentUser);
        loadUserProfile(currentUser.uid);
      }
    }, [])
  );

  const loadUserProfile = async (userId) => {
    try {
      const { success, data } = await getUserProfile(userId);
      if (success) {
        setDisplayName(data.displayName || "");
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { success, error } = await updateUserProfile(user.uid, {
        displayName: displayName,
      });

      if (success) {
        Alert.alert("Success", "Profile updated successfully");
      } else {
        // // Alert.alert("Error", error || "Failed to update profile");
      }
    } catch (error) {
      // // Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { success, error } = await logoutUser();
      if (success) {
        await clearUserFromStorage();
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      } else {
        // Alert.alert("Logout Error", error || "Failed to logout");
      }
    } catch (error) {
      // // Alert.alert("Error", error.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Display Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={displayName}
          onChangeText={setDisplayName}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdateProfile}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Account Information</Text>
        <Text style={styles.infoText}>
          Account created:{" "}
          {user.metadata?.creationTime
            ? new Date(user.metadata.creationTime).toLocaleDateString()
            : "Unknown"}
        </Text>
        <Text style={styles.infoText}>
          Last sign in:{" "}
          {user.metadata?.lastSignInTime
            ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
            : "Unknown"}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
