import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  button: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    color: "#333",
  },
  link: {
    color: "#4285F4",
    fontWeight: "bold",
  },
});
