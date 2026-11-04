
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

export default function OnboardingQualityScreen({ onNext, onSkip }) {
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

      {/* Background decoration */}
      <View style={styles.topGreenShape} />
      <View style={styles.topLightShape} />
      <View style={styles.bottomGreenShape} />
      <View style={styles.bottomLightShape} />

      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.content}>

          {/* LOGO AND SKIP */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/naturyz-onboarding-quality-logo-transparent.png")}
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

          {/* HEADING */}
          <View style={styles.headingSection}>
            <Text
              style={[
                styles.headingTop,
                compact && styles.compactHeading,
              ]}
            >
              Science Backed
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[
                styles.headingMain,
                { fontSize: Math.min(43, width * 0.09) },
              ]}
            >
              Nutrition
            </Text>

            <View style={styles.underline} />

            <Text style={styles.description}>
              Certified, Safe &
              {"\n"}
              Trusted Products
            </Text>
          </View>

          {/* QUALITY AND WELLNESS IMAGE */}
          <View style={styles.showcaseSection}>
            <Image
              source={require("../../assets/images/naturyz-onboarding-quality-showcase-clean.png")}
              style={styles.showcaseImage}
              resizeMode="contain"
            />
          </View>

          {/* PAGINATION */}
          <View style={styles.pagination}>
            <View style={styles.inactiveDot} />

            <Animated.View
              style={[
                styles.activeDot,
                { width: activeDotWidth },
              ]}
            />

            <View style={styles.inactiveDot} />
          </View>

          {/* NEXT BUTTON */}
          <View style={styles.buttonSection}>
            <Pressable
              onPress={onNext}
              style={({ pressed }) => [
                styles.nextButton,
                pressed && styles.nextButtonPressed,
              ]}
            >
              <Text style={styles.nextText}>Next</Text>
              <Text style={styles.nextArrow}>⟶</Text>
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
    paddingTop: 5,
    paddingBottom: 5,
  },

  /* DECORATIVE SHAPES */

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
    flex: 1.15,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: 5,
  },

  logo: {
    width: "66%",
    height: "90%",
  },

   skipButton: {
    position: "absolute",
    right: "-3%",
    top: "27%",
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
    flex: 1.30,
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

  headingMain: {
    color: DARK_GREEN,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.8,
    width: "100%",
  },

  underline: {
    width: "43%",
    height: 4,
    backgroundColor: GREEN,
    borderRadius: 10,
    marginTop: 9,
    marginBottom: 14,
    transform: [{ rotate: "-4deg" }],
  },

  description: {
    color: "#45454C",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 27,
  },

  /* SHOWCASE */

  showcaseSection: {
    flex: 3.30,
    minHeight: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  showcaseImage: {
    width: "100%",
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

  nextButton: {
    height: 60,
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

  nextButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  nextText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },

  nextArrow: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "500",
    marginLeft: 15,
    marginTop: "-3%",
  },

  pressed: {
    opacity: 0.7,
  },
});
