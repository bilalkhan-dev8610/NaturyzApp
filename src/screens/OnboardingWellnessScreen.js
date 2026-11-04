
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CREAM = "#FDFFF1";
const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";

export default function OnboardingWellnessScreen({ onGetStarted, onSkip }) {
  const { width, height } = useWindowDimensions();

  const activeDotWidth = useRef(new Animated.Value(11)).current;
  const compact = height < 750;

  useEffect(() => {
    Animated.spring(activeDotWidth, {
      toValue: 22,
      speed: 14,
      bounciness: 5,
      useNativeDriver: false,
    }).start();

    return () => activeDotWidth.stopAnimation();
  }, [activeDotWidth]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={CREAM}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Background decorations */}
      <View style={styles.topGreenShape} />
      <View style={styles.topLightShape} />
      <View style={styles.bottomGreenShape} />
      <View style={styles.bottomLightShape} />

      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.content}>

          {/* HEADER */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/naturyz-onboarding-wellness-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Pressable
              onPress={onSkip}
              hitSlop={12}
              style={({ pressed }) => [
                styles.skipButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.skipText}>Skip</Text>
              <Text style={styles.skipArrow}>›</Text>
            </Pressable>
          </View>

          {/* MAIN HEADING */}
          <View style={styles.headingSection}>
            <Text style={[styles.headingTop, compact && styles.compactHeading]}>
              Your Health
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[
                styles.headingHighlight,
                { fontSize: Math.min(40, width * 0.09) },
              ]}
            >
              Transformation
            </Text>

            <Text style={[styles.headingTop, compact && styles.compactHeading]}>
              Partner
            </Text>

            <View style={styles.underline} />
          </View>

          {/* BENEFITS + FITNESS MODELS */}
          <View style={styles.showcaseSection}>
            <Image
              source={require("../../assets/images/naturyz-onboarding-wellness-showcase.png")}
              style={styles.showcaseImage}
              resizeMode="contain"
            />
          </View>

          {/* THIRD DOT ACTIVE */}
          <View style={styles.pagination}>
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />

            <Animated.View
              style={[
                styles.activeDot,
                { width: activeDotWidth },
              ]}
            />
          </View>

          {/* GET STARTED */}
          <View style={styles.buttonSection}>
            <Pressable
              onPress={onGetStarted}
              style={({ pressed }) => [
                styles.getStartedButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Text style={styles.buttonArrow}>⟶</Text>
            </Pressable>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    overflow: "hidden",
  },

  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: "7%",
    paddingTop: 4,
    paddingBottom: 5,
  },

  /* BACKGROUND DECORATIONS */

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

  /* HEADER */

  header: {
    flex: 0.95,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logo: {
    width: "66%",
    height: "90%",
  },

  skipButton: {
    position: "absolute",
    right: "-3%",
    top: "22%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },

  skipText: {
    color: DARK_GREEN,
    fontSize: 17,
    fontWeight: "700",
  },

  skipArrow: {
    color: DARK_GREEN,
    fontSize: 30,
    lineHeight: 31,
    marginLeft: 2,
    marginTop: "-15%",
  },
  /* HEADING */

  headingSection: {
    flex: 1.40,
    minHeight: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  headingTop: {
    color: "#34343A",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
  },

  compactHeading: {
    fontSize: 29,
  },

  headingHighlight: {
    color: DARK_GREEN,
    fontWeight: "900",
    textAlign: "center",
    width: "100%",
    letterSpacing: -0.8,
  },

  underline: {
    width: "43%",
    height: 4,
    backgroundColor: GREEN,
    borderRadius: 10,
    marginTop: 15,
    transform: [{ rotate: "-4deg" }],
  },

  /* SHOWCASE */

  showcaseSection: {
    flex: 3.35,
    minHeight: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  showcaseImage: {
    width: "110%",
    height: "100%",
  },

  /* PAGINATION */

  pagination: {
    flex: 0.35,
    minHeight: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
  },

  inactiveDot: {
    width: 11,
    height: 11,
    borderRadius: 10,
    backgroundColor: "#E3EDC3",
  },

  activeDot: {
    height: 11,
    borderRadius: 10,
    backgroundColor: GREEN,
  },

  /* BUTTON */

  buttonSection: {
    flex: 0.60,
    minHeight: 0,
    justifyContent: "center",
  },

  getStartedButton: {
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

  pressed: {
    opacity: 0.7,
  },
});
