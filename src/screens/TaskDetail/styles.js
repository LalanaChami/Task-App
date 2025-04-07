import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 120,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
  },
  completedStatus: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  pendingStatus: {
    color: "#FF9800",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
