
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function OnboardingSlide({
  logo,
  headingTop,
  headingMain,
  headingBottom,
  description,
  showcaseImage,
  variant = "brand",
}) {
  const { width, height } = useWindowDimensions();

  const compact = height < 750;

  const isBrand = variant === "brand";
  const isQuality = variant === "quality";
  const isWellness = variant === "wellness";

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View
        style={[
          styles.header,
          isBrand && styles.brandHeader,
          isQuality && styles.qualityHeader,
          isWellness && styles.wellnessHeader,
        ]}
      >
        <Image
          source={logo}
          style={[
            styles.logo,
            isWellness && styles.wellnessLogo,
          ]}
          resizeMode="contain"
        />
      </View>

      {/* HEADING */}
      <View
        style={[
          styles.headingSection,
          isBrand && styles.brandHeading,
          isQuality && styles.qualityHeading,
          isWellness && styles.wellnessHeading,
        ]}
      >
        {headingTop ? (
          <Text
            style={[
              styles.headingTop,
              compact && styles.compactHeading,
            ]}
          >
            {headingTop}
          </Text>
        ) : null}

        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            styles.headingMain,
            {
              fontSize: Math.min(
                isBrand ? 35 : isQuality ? 43 : 40,
                width * (isBrand ? 0.085 : 0.09)
              ),
            },
            isBrand && styles.brandHeadingMain,
          ]}
        >
          {headingMain}
        </Text>

        {headingBottom ? (
          <Text
            style={[
              styles.headingTop,
              compact && styles.compactHeading,
            ]}
          >
            {headingBottom}
          </Text>
        ) : null}

        {description ? (
          <>
            <View
              style={[
                styles.underline,
                isBrand && styles.brandUnderline,
                isWellness && styles.wellnessUnderline,
              ]}
            />

            <Text style={styles.description}>
              {description}
            </Text>
          </>
        ) : (
          <View
            style={[
              styles.underline,
              styles.wellnessUnderline,
            ]}
          />
        )}
      </View>

      {/* SHOWCASE IMAGE */}
      <View
        style={[
          styles.showcaseSection,
          isBrand && styles.brandShowcase,
          isQuality && styles.qualityShowcase,
          isWellness && styles.wellnessShowcase,
        ]}
      >
        <Image
          source={showcaseImage}
          style={[
            styles.showcaseImage,
            isBrand && styles.brandImage,
            isWellness && styles.wellnessImage,
          ]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "7%",
    paddingTop: 5,
    paddingBottom: 5,
  },

  header: {
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  brandHeader: {
    flex: 1.05,
  },

  qualityHeader: {
    flex: 1.15,
    paddingTop: 5,
  },

  wellnessHeader: {
    flex: 0.95,
  },

  logo: {
    width: "74%",
    height: "80%",
  },

  wellnessLogo: {
    height: "90%",
  },

  headingSection: {
    minHeight: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  brandHeading: {
    flex: 1.45,
  },

  qualityHeading: {
    flex: 1.3,
  },

  wellnessHeading: {
    flex: 1.4,
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
    color: "#56880B",
    fontWeight: "900",
    textAlign: "center",
    width: "100%",
    letterSpacing: -0.8,
  },

  brandHeadingMain: {
    letterSpacing: -1,
  },

  underline: {
    width: "43%",
    height: 4,
    backgroundColor: "#83AE12",
    borderRadius: 10,
    marginTop: 9,
    marginBottom: 14,
    transform: [{ rotate: "-4deg" }],
  },

  brandUnderline: {
    width: "38%",
    marginTop: 13,
    marginBottom: 22,
  },

  wellnessUnderline: {
    marginTop: 15,
    marginBottom: 0,
  },

  description: {
    color: "#45454C",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 27,
  },

  showcaseSection: {
    minHeight: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  brandShowcase: {
    flex: 2.65,
  },

  qualityShowcase: {
    flex: 3.3,
  },

  wellnessShowcase: {
    flex: 3.35,
  },

  showcaseImage: {
    width: "100%",
    height: "100%",
  },

  brandImage: {
    width: "115%",
  },

  wellnessImage: {
    width: "110%",
  },
});
