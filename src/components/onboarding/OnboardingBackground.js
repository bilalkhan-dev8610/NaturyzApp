
import React from "react";
import { View, StyleSheet } from "react-native";

export default function OnboardingBackground() {
  return (
    <View pointerEvents="none" style={styles.container}>
      <View style={styles.topGreenShape} />
      <View style={styles.topLightShape} />

      <View style={styles.bottomGreenShape} />
      <View style={styles.bottomLightShape} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },

  topGreenShape: {
    position: "absolute",
    top: -110,
    left: -115,
    width: 390,
    height: 250,
    borderRadius: 200,
    backgroundColor: "#C4DD79",
    transform: [{ rotate: "-28deg" }],
  },

  topLightShape: {
    position: "absolute",
    top: -125,
    left: -120,
    width: 410,
    height: 260,
    borderRadius: 210,
    borderWidth: 18,
    borderColor: "#EAF2CF",
    transform: [{ rotate: "-28deg" }],
  },

  bottomGreenShape: {
    position: "absolute",
    bottom: -125,
    left: -40,
    width: "120%",
    height: 180,
    borderRadius: 110,
    backgroundColor: "#BBD96B",
    transform: [{ rotate: "-5deg" }],
  },

  bottomLightShape: {
    position: "absolute",
    bottom: -140,
    left: -45,
    width: "125%",
    height: 180,
    borderRadius: 110,
    borderWidth: 17,
    borderColor: "#E8F0C9",
    transform: [{ rotate: "-5deg" }],
  },
});
