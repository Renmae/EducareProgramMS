import React from "react";
import { View, StyleSheet, Platform } from "react-native";

export default function ScreenWrapper({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.elevatedCard}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#213594", // Matches drawer background
    padding: Platform.OS === "web" ? 40 : 20,
    justifyContent: "center",
    alignItems: "center",
  },
  elevatedCard: {
    width: "108%",
    height: "112%",
    backgroundColor: "#fff",
    borderRadius: 10,
    maxWidth: 1500,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
});
