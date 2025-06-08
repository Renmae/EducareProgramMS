
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
  mainTitle: {
    color: "#00188D",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -10,
    marginBottom: 20,
    fontFamily: "LeagueSpartan-Bold",
    textShadowColor: "#999",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  navigationTabs: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 2,
  },
  lineIcon: {
    height: 40,
    resizeMode: "contain",
    marginHorizontal: 2,
  },
  sectionTitleBox: {
    width: 300,
    padding: 13,
    borderWidth: 2,
    borderColor: "#00188D",
    borderRadius: 10,
    backgroundColor: "#00188D",
    marginBottom: 10,
    alignSelf: "center",
  },
  sectionTitleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  formContainer: {
    width: 300,
    marginTop: -15,
    padding: 15,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    marginBottom: 50,
  },
  label: {
    fontSize: 13,
    color: "#000",
    fontFamily: "Inter",
    // marginBottom: 5,
    marginTop: 10, 
    fontWeight: "bold",
  },
  label2: {
    fontSize: 10,
    color: "#000",
    fontFamily: "Inter",
    marginTop: 3, // 5px space from field to subtext
    // marginBottom: 10,
    marginLeft: 10,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#D9D9D9",
    padding: 10,
    marginTop: 10, // No bottom margin
    borderRadius: 12,
    minHeight: 44, // Consistent height
  },
  radioContainer: {
    flexDirection: "row",
    gap: 80,
    alignItems: "center",
    marginVertical: 0, // No extra margins
    marginBottom: 0,
    marginBottom: 10,
  },
  radioOuterCircle: {
    height: 15,
    width: 15,
    borderWidth: 2,
    marginRight: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  radioBoxSelected: {
    backgroundColor: "#00188D",
  },
  radioLabel: {
    fontSize: 16,
  },

  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#00188D",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: "#D9D9D9",
    borderRadius: 12,

    backgroundColor: "#FFFFFF",
    minHeight: 44, // Same height as input
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    // marginTop: -1,
    marginBottom: 5, // No bottom margin - label handles spacing
  },
  dropdown: {
    marginTop: 10,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    minHeight: 44, // Same height as input
  },
  dropdownContainer: {
    borderColor: "#D9D9D9",
    maxHeight: 150,
    borderWidth: 2,
    borderRadius: 12,
  },
  number: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D9D9",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    minHeight: 44, // Same height as input
    marginBottom: 10,
  },
  prefix: {
    marginRight: 8,
    fontSize: 16,
    color: "#333",
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "right",
  },
  button: {
    position: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#00188D",
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2, // Adds Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonRight: {
    marginLeft: 250,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "justify",
  },
});