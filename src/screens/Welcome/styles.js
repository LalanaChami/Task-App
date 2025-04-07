import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 30,
    paddingTop: 60,
    backgroundColor: "#4285F4",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "flex-start",
  },
  featureIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
});
