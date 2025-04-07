import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#4285F4",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4285F4",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  taskList: {
    marginTop: 5,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  taskCompleted: {
    backgroundColor: "#4CAF50",
  },
  taskPending: {
    backgroundColor: "#FF9800",
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  emptyTasks: {
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 15,
  },
  addTaskButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addTaskButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerButton: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
