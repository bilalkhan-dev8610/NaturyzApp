
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
} from "react-native";

const GREEN = "#83AE12";

export default function OnboardingPagination({ activeIndex = 0 }) {
  const animatedWidths = useRef([
    new Animated.Value(11),
    new Animated.Value(11),
    new Animated.Value(11),
  ]).current;

  useEffect(() => {
    const animations = animatedWidths.map((width, index) =>
      Animated.spring(width, {
        toValue: index === activeIndex ? 22 : 11,
        speed: 14,
        bounciness: 5,
        useNativeDriver: false,
      })
    );

    Animated.parallel(animations).start();

    return () => {
      animatedWidths.forEach((width) => width.stopAnimation());
    };
  }, [activeIndex, animatedWidths]);

  return (
    <View style={styles.container}>
      {animatedWidths.map((width, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              width,
              backgroundColor:
                index === activeIndex ? GREEN : "#E3EDC3",
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
  },

  dot: {
    height: 11,
    borderRadius: 10,
  },
});
