
import React from "react";
import { Text } from "react-native";
import ScreenWrapper from "../../style/ScreenWrapper";

export default function Message() {
  return (
    <ScreenWrapper>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Message Dashboard</Text>
    </ScreenWrapper>
  );
}
