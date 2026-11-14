
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  PanResponder,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OnboardingBackground from "../../components/onboarding/OnboardingBackground";
import OnboardingPagination from "../../components/onboarding/OnboardingPagination";
import OnboardingButton from "../../components/onboarding/OnboardingButton";
import OnboardingSlide from "./OnboardingSlide";

const CREAM = "#FDFFF1";

const SLIDES = [
  {
    key: "brand",
    variant: "brand",
    logo: require("../../../assets/images/naturyz-onboarding-quality-logo-transparent.png"),
    headingTop: "Premium",
    headingMain: "Health Supplements",
    description: "Vitamins, Minerals, Proteins,\nHerbal Extracts & More",
    showcaseImage: require("../../../assets/images/naturyz-onboarding-products.png"),
  },
  {
    key: "quality",
    variant: "quality",
    logo: require("../../../assets/images/naturyz-onboarding-quality-logo-transparent.png"),
    headingTop: "Science Backed",
    headingMain: "Nutrition",
    description: "Certified, Safe &\nTrusted Products",
    showcaseImage: require("../../../assets/images/naturyz-onboarding-quality-showcase-clean.png"),
  },
  {
    key: "wellness",
    variant: "wellness",
    logo: require("../../../assets/images/naturyz-onboarding-wellness-logo.png"),
    headingTop: "Your Health",
    headingMain: "Transformation",
    headingBottom: "Partner",
    showcaseImage: require("../../../assets/images/naturyz-onboarding-wellness-showcase.png"),
  },
];

export default function OnboardingFlow({ onComplete }) {
  const { width } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const widthRef = useRef(width);
  const isAnimating = useRef(false);

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    widthRef.current = width;
  }, [width]);

  const moveToSlide = (direction) => {
    if (isAnimating.current) return;

    const currentIndex = activeIndexRef.current;

    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= SLIDES.length) {
      return;
    }

    isAnimating.current = true;

    const screenWidth = widthRef.current;
    const exitPosition = direction === "next" ? -screenWidth : screenWidth;

    Animated.timing(translateX, {
      toValue: exitPosition,
      duration: 220,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) {
        isAnimating.current = false;
        translateX.setValue(0);
        return;
      }

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      translateX.setValue(
        direction === "next" ? screenWidth : -screenWidth
      );

      Animated.spring(translateX, {
        toValue: 0,
        speed: 18,
        bounciness: 4,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    });
  };

  const handleNext = () => {
    if (activeIndexRef.current === SLIDES.length - 1) {
      onComplete?.();
      return;
    }

    moveToSlide("next");
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        if (isAnimating.current) return false;

        const currentIndex = activeIndexRef.current;

        const isHorizontal =
          Math.abs(gesture.dx) > 8 &&
          Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.2;

        if (!isHorizontal) return false;

        if (gesture.dx < 0) {
          return currentIndex < SLIDES.length - 1;
        }

        if (gesture.dx > 0) {
          return currentIndex > 0;
        }

        return false;
      },

      onPanResponderGrant: () => {
        translateX.stopAnimation();
        translateX.setValue(0);
      },

      onPanResponderMove: (_, gesture) => {
        if (!isAnimating.current) {
          translateX.setValue(gesture.dx);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        const threshold = Math.max(75, widthRef.current * 0.18);

        if (
          gesture.dx < -threshold ||
          gesture.vx < -0.65
        ) {
          moveToSlide("next");
        } else if (
          gesture.dx > threshold ||
          gesture.vx > 0.65
        ) {
          moveToSlide("previous");
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            speed: 18,
            bounciness: 4,
            useNativeDriver: true,
          }).start();
        }
      },

      onPanResponderTerminate: () => {
        if (!isAnimating.current) {
          Animated.spring(translateX, {
            toValue: 0,
            speed: 18,
            bounciness: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const currentSlide = SLIDES[activeIndex];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar
        backgroundColor={CREAM}
        barStyle="dark-content"
        translucent={false}
      />

      {/* FIXED BACKGROUND */}
      <OnboardingBackground />

      {/* ONLY SLIDE CONTENT MOVES */}
      <Animated.View
        style={[
          styles.slideContainer,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <OnboardingSlide
          key={currentSlide.key}
          logo={currentSlide.logo}
          headingTop={currentSlide.headingTop}
          headingMain={currentSlide.headingMain}
          headingBottom={currentSlide.headingBottom}
          description={currentSlide.description}
          showcaseImage={currentSlide.showcaseImage}
          variant={currentSlide.variant}
        />
      </Animated.View>

      {/* FIXED PAGINATION */}
      <View style={styles.paginationSection}>
        <OnboardingPagination activeIndex={activeIndex} />
      </View>

      {/* FIXED SHARED BUTTON */}
      <View style={styles.buttonSection}>
        <OnboardingButton
          title={
            activeIndex === SLIDES.length - 1
              ? "Get Started"
              : "Next"
          }
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    overflow: "hidden",
  },

  slideContainer: {
    flex: 1,
  },

  paginationSection: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSection: {
    paddingHorizontal: "7%",
    paddingTop: 5,
    paddingBottom: 7,
  },
});
