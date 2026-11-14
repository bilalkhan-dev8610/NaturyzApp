
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function OnboardingButton({
  title = "Next",
  onPress,
}) {
  return (
    <View style={styles.buttonSection}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
        <Text style={styles.buttonArrow}>⟶</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSection: {
    width: "100%",
    justifyContent: "center",
  },

  button: {
    height: 62,
    width: "100%",
    borderRadius: 40,
    backgroundColor: "#80A900",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#526F0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },

  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 32,
    marginLeft: 18,
    marginTop: "-3%",
  },
});
