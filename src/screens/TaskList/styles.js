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
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  taskCheckbox: {
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4285F4",
  },
  checkboxChecked: {
    backgroundColor: "#4285F4",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  taskDate: {
    fontSize: 12,
    color: "#888",
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "#f44336",
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
