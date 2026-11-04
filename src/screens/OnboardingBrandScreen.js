
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

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";
const CREAM = "#FDFFF1";

const OnboardingBrandScreen = ({ onNext, onSkip }) => {
  const { width, height } = useWindowDimensions();

  // Smooth active pagination dot animation
  const dotWidth = useRef(new Animated.Value(22)).current;

  useEffect(() => {
    Animated.spring(dotWidth, {
      toValue: 22,
      speed: 12,
      bounciness: 5,
      useNativeDriver: false,
    }).start();
  }, [dotWidth]);

  const screenScale = Math.min(width / 414, height / 896);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={CREAM}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Decorative top background */}
      <View style={styles.topGreenShape} />
      <View style={styles.topLightShape} />

      {/* Decorative bottom background */}
      <View style={styles.bottomGreenShape} />
      <View style={styles.bottomLightShape} />

      {/* Main content */}
      <View style={styles.content}>

        {/* Header: Logo + Skip */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/naturyz-onboarding-quality-logo-transparent.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

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

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.headingTop}>Premium</Text>

          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.headingMain}
          >
            Health Supplements
          </Text>

          <View style={styles.headingUnderline} />

          <Text style={styles.description}>
            Vitamins, Minerals, Proteins,
            {"\n"}
            Herbal Extracts & More
          </Text>
        </View>

        {/* Product showcase */}
        <View style={styles.productSection}>
          <Image
            source={require("../../assets/images/naturyz-onboarding-products.png")}
            style={styles.productsImage}
            resizeMode="contain"
          />
        </View>

        {/* Pagination */}
        <View style={styles.pagination}>
          <Animated.View
            style={[styles.dot, styles.activeDot, { width: dotWidth }]}
          />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Next button */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    paddingHorizontal: "7%",
    paddingTop: 5,
    paddingBottom: 12,
    zIndex: 2,
  },

  topGreenShape: {
    position: "absolute",
    top: -105,
    left: -115,
    width: 390,
    height: 250,
    borderRadius: 200,
    backgroundColor: "#C4DD79",
    transform: [{ rotate: "-28deg" }],
  },

  topLightShape: {
    position: "absolute",
    top: -120,
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

  header: {
    flex: 1.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logoContainer: {
    width: "74%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  skipButton: {
    position: "absolute",
    right: "-3%",
    top: "15%",
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

  headingSection: {
    flex: 1.45,
    justifyContent: "center",
    alignItems: "center",
  },

  headingTop: {
    color: "#34343A",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
  },

  headingMain: {
    color: "#56880B",
    fontSize: 35,
    fontWeight: "900",
    textAlign: "center",
    width: "100%",
    letterSpacing: -1,
  },

  headingUnderline: {
    width: "38%",
    height: 4,
    backgroundColor: GREEN,
    borderRadius: 100,
    marginTop: 13,
    marginBottom: 22,
    transform: [{ rotate: "-4deg" }],
  },

  description: {
    color: "#45454C",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 27,
  },

  productSection: {
    flex: 2.65,
    justifyContent: "center",
    alignItems: "center",
  },

  productsImage: {
    width: "115%",
    height: "100%",
  },

  pagination: {
    flex: 0.38,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 13,
  },

  dot: {
    width: 11,
    height: 11,
    borderRadius: 10,
    backgroundColor: "#E3EDC3",
  },

  activeDot: {
    backgroundColor: GREEN,
  },

  nextButton: {
    height: 62,
    width: "100%",
    borderRadius: 40,
    backgroundColor: "#80A900",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 7,
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

export default OnboardingBrandScreen;
