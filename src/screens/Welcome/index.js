import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Task Manager</Text>
        <Text style={styles.tagline}>Organize your tasks efficiently</Text>
      </View>

      <View style={styles.imageContainer}>
        <Ionicons name="checkmark-circle" size={120} color="#4285F4" />
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Features</Text>

        <View style={styles.featureItem}>
          <Ionicons
            name="person"
            size={24}
            color="#4285F4"
            style={styles.featureIcon}
          />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>User Authentication</Text>
            <Text style={styles.featureDescription}>
              Secure login and signup with email and password
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="list"
            size={24}
            color="#4285F4"
            style={styles.featureIcon}
          />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Task Management</Text>
            <Text style={styles.featureDescription}>
              Create, update, and delete tasks with ease
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="cloud-done"
            size={24}
            color="#4285F4"
            style={styles.featureIcon}
          />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Cloud Sync</Text>
            <Text style={styles.featureDescription}>
              Your tasks are synced across all your devices
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;
