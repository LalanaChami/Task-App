import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { registerUser, saveUserToDatabase } from "@services/auth";

import { styles } from "./styles";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      // Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      // Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { user, error } = await registerUser(email, password, name);
      if (error) {
        Alert.alert("Signup Error", error);
      } else {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: name,
          createdAt: Date.now(),
          lastLogin: Date.now(),
        };

        const { success, error: dbError } = await saveUserToDatabase(userData);

        if (success) {
          // Alert.alert("Success", "Account created successfully");
        } else {
          // Alert.alert(
          //   "Warning",
          //   "Account created but profile data not saved: " + dbError
          // );
        }
      }
    } catch (error) {
      // Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
