
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  useWindowDimensions,
} from "react-native";

const SplashScreen = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
      rotation.setValue(0);
    };
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const scale = Math.min(width / 852, height / 1846);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FDFFF1"
        barStyle="dark-content"
        hidden={false}
      />

      {/* Decorative top shapes */}
      <View style={styles.topDecoration} />
      <View style={styles.topCurve} />

      {/* Decorative leaves effect */}
      <View style={styles.leafDecoration}>
        <Text style={styles.leafText}>🌿</Text>
      </View>

      <View style={styles.content}>
        {/* NATURYZ Logo */}
        <View style={styles.logoSection}>
          <Image
            source={require("../../assets/images/naturyz-onboarding-quality-logo-transparent.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Main Heading */}
        <View style={styles.headingSection}>
          <Text
            style={[
              styles.heading,
              { fontSize: Math.max(22, Math.min(34, width * 0.041)) },
            ]}
          >
            Healthy Transformations
          </Text>

          <Text
            style={[
              styles.headingHighlight,
              { fontSize: Math.max(25, Math.min(38, width * 0.046)) },
            ]}
          >
            Made Easy
          </Text>
        </View>

        {/* Brand Benefits */}
        <View style={styles.featuresSection}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>♧</Text>
            <Text style={styles.featureText}>Pure{"\n"}Nutrition</Text>
          </View>

          <View style={styles.featureDivider} />

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>♡</Text>
            <Text style={styles.featureText}>Trusted{"\n"}Quality</Text>
          </View>

          <View style={styles.featureDivider} />

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>♡</Text>
            <Text style={styles.featureText}>Better{"\n"}Wellness</Text>
          </View>
        </View>

        {/* Product Showcase */}
        <View style={styles.productSection}>
          <Image
            source={require("../../assets/images/naturyz-splash-products.png")}
            style={styles.productsImage}
            resizeMode="contain"
          />
        </View>

        {/* Animated Loader */}
        <View style={styles.loaderSection}>
          <Animated.View
            style={[
              styles.loader,
              { transform: [{ rotate: spin }] },
            ]}
          >
            <View style={styles.loaderInner} />
          </Animated.View>

          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>

      {/* Bottom decorative waves */}
      <View style={styles.bottomDecoration} />
      <View style={styles.bottomCurve} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFF1",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
    zIndex: 2,
  },

  topDecoration: {
    position: "absolute",
    top: -105,
    left: -100,
    width: 390,
    height: 260,
    borderRadius: 200,
    backgroundColor: "#D6E99A",
    transform: [{ rotate: "-25deg" }],
  },

  topCurve: {
    position: "absolute",
    top: -125,
    left: -115,
    width: 420,
    height: 280,
    borderRadius: 210,
    borderWidth: 20,
    borderColor: "#F0F5D8",
    transform: [{ rotate: "-25deg" }],
  },

  leafDecoration: {
    position: "absolute",
    top: 25,
    right: 8,
    opacity: 0.55,
  },

  leafText: {
    fontSize: 55,
  },

  logoSection: {
    flex: 1.25,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "74%",
    height: "70%",
  },

  headingSection: {
    flex: 0.62,
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    color: "#303030",
    fontWeight: "700",
    textAlign: "center",
  },

  headingHighlight: {
    color: "#83AE18",
    fontWeight: "800",
    textAlign: "center",
  },

  featuresSection: {
    flex: 0.62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 4,
  },

  feature: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  featureIcon: {
    color: "#83AE18",
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 3,
  },

  featureText: {
    color: "#454545",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 17,
  },

  featureDivider: {
    width: 1,
    height: "58%",
    backgroundColor: "#DCE9B7",
  },

  productSection: {
    flex: 2.25,
    alignItems: "center",
    justifyContent: "center",
  },

  productsImage: {
    width: "100%",
    height: "100%",
  },

  loaderSection: {
    flex: 0.52,
    alignItems: "center",
    justifyContent: "center",
  },

  loader: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 5,
    borderColor: "#D9E9A8",
    borderTopColor: "#8CB719",
    borderRightColor: "#8CB719",
    alignItems: "center",
    justifyContent: "center",
  },

  loaderInner: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#FDFFF1",
  },

  loadingText: {
    color: "#454545",
    fontSize: 14,
    marginTop: 7,
  },

  bottomDecoration: {
    position: "absolute",
    bottom: -105,
    left: -60,
    width: "125%",
    height: 180,
    borderRadius: 100,
    backgroundColor: "#B8D66B",
    transform: [{ rotate: "-4deg" }],
  },

  bottomCurve: {
    position: "absolute",
    bottom: -122,
    left: -70,
    width: "130%",
    height: 180,
    borderRadius: 100,
    borderWidth: 18,
    borderColor: "#E3EFBF",
    transform: [{ rotate: "-4deg" }],
  },
});

export default SplashScreen;
