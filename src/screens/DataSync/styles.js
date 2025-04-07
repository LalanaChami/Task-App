import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    width: 120,
  },
  statusValue: {
    fontSize: 16,
    flex: 1,
  },
  statusGood: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  statusPending: {
    color: "#FF9800",
    fontWeight: "bold",
  },
  statusBad: {
    color: "#F44336",
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 20,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 8,
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
    marginRight: 10,
  },
  dataValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
  },
});
