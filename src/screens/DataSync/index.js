import React, { useState, useCallback } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

import { auth } from "@config/firebase";
import { getUserTasks } from "@services/task";
import { getCurrentUser, getStoredUserData } from "@services/auth";

import { styles } from "./styles";

const DataSyncScreen = () => {
  const [syncStatus, setSyncStatus] = useState("checking");
  const [networkStatus, setNetworkStatus] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [taskCount, setTaskCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      checkNetworkAndSync();

      const unsubscribe = NetInfo.addEventListener((state) => {
        setNetworkStatus(state.isConnected ? "connected" : "disconnected");
        if (state.isConnected && syncStatus !== "syncing") {
          syncData();
        }
      });

      return () => {
        unsubscribe();
      };
    }, [])
  );

  const checkNetworkAndSync = async () => {
    try {
      const networkState = await NetInfo.fetch();
      setNetworkStatus(networkState.isConnected ? "connected" : "disconnected");

      if (networkState.isConnected) {
        syncData();
      } else {
        setSyncStatus("offline");
        loadOfflineData();
      }
    } catch (error) {
      console.error("Error checking network:", error);
      setSyncStatus("error");
    }
  };

  const syncData = async () => {
    setSyncStatus("syncing");
    try {
      const user = getCurrentUser(auth);
      const userId = user ? user.uid : (await getStoredUserData())?.uid;

      if (userId) {
        const { tasks, success, fromCache } = await getUserTasks(userId);

        if (success) {
          setTaskCount(tasks.length);
          setSyncStatus("synced");
          setLastSyncTime(new Date().toLocaleTimeString());
        } else {
          setSyncStatus("error");
          // Alert.alert("Sync Error", "Failed to sync data with server");
        }
      } else {
        setSyncStatus("no-user");
      }
    } catch (error) {
      console.error("Error syncing data:", error);
      setSyncStatus("error");
    }
  };

  const loadOfflineData = async () => {
    try {
      const storedUser = await getStoredUserData();
      if (storedUser) {
        const { tasks, success, fromCache } = await getUserTasks(
          storedUser.uid
        );

        if (success && fromCache) {
          setTaskCount(tasks.length);
          setSyncStatus("offline-data-available");
        } else {
          setSyncStatus("no-offline-data");
        }
      } else {
        setSyncStatus("no-user");
      }
    } catch (error) {
      console.error("Error loading offline data:", error);
      setSyncStatus("error");
    }
  };

  const renderStatus = () => {
    switch (syncStatus) {
      case "checking":
        return "Checking data sync status...";
      case "syncing":
        return "Syncing data with server...";
      case "synced":
        return `Data successfully synced at ${lastSyncTime}`;
      case "offline":
        return "You are currently offline";
      case "offline-data-available":
        return "You are offline, but local data is available";
      case "no-offline-data":
        return "You are offline and no local data is available";
      case "error":
        return "Error syncing data";
      case "no-user":
        return "No user data available";
      default:
        return "Unknown status";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Synchronization</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Network Status:</Text>
        <Text
          style={[
            styles.statusValue,
            networkStatus === "connected"
              ? styles.statusGood
              : styles.statusBad,
          ]}
        >
          {networkStatus === "connected" ? "Connected" : "Disconnected"}
        </Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Sync Status:</Text>
        <Text
          style={[
            styles.statusValue,
            syncStatus === "synced" || syncStatus === "offline-data-available"
              ? styles.statusGood
              : syncStatus === "syncing" || syncStatus === "checking"
              ? styles.statusPending
              : styles.statusBad,
          ]}
        >
          {renderStatus()}
        </Text>
      </View>

      {(syncStatus === "syncing" || syncStatus === "checking") && (
        <ActivityIndicator size="large" color="#4285F4" style={styles.loader} />
      )}

      {(syncStatus === "synced" || syncStatus === "offline-data-available") && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Tasks Available:</Text>
          <Text style={styles.dataValue}>{taskCount}</Text>
        </View>
      )}
    </View>
  );
};

export default DataSyncScreen;
