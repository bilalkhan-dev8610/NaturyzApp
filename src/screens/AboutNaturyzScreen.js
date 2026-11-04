import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#78A900";
const DARK_GREEN = "#578800";
const TEXT = "#151515";
const MUTED = "#555966";
const BORDER = "#E9E9ED";
const PALE_GREEN = "#F3F8E8";

const PROMISES = [
  { title: "High-Quality\nIngredients", icon: "leaf-outline" },
  { title: "Science\nBacked", icon: "flask-outline" },
  { title: "Safe &\nEffective", icon: "ribbon-outline" },
  { title: "Trusted\nby Customers", icon: "handshake-outline" },
];

const STATS = [
  { title: "Founded In", value: "2018", icon: "calendar-outline" },
  { title: "Happy Customers", value: "10L+", icon: "people-outline" },
  { title: "Product Range", value: "50+", icon: "star-outline" },
];

export default function AboutNaturyzScreen({
  onBack,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
}) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={onBack}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={29} color={TEXT} />
          </Pressable>

          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/naturyz-home-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Pressable
            style={styles.headerButton}
            onPress={onWishlistPress}
            accessibilityLabel="Open wishlist"
          >
            <Ionicons name="heart-outline" size={28} color={TEXT} />
          </Pressable>

          <Pressable
            style={styles.headerButton}
            onPress={onCartPress}
            accessibilityLabel="Open cart"
          >
            <View>
              <Ionicons name="cart-outline" size={30} color={TEXT} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* PAGE TITLE */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>About NATURYZ</Text>
            <Text style={styles.pageSubtitle}>
              Our story, mission, and commitment to your health.
            </Text>
          </View>

          {/* MAIN HERO BANNER */}
          <View style={styles.heroBanner}>
            <Image
              source={require("../../assets/images/naturyz-home-hero-banner.png")}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          {/* OUR MISSION */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconBox}>
              <Ionicons
                name="locate-outline"
                size={43}
                color={GREEN}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Our Mission</Text>
              <Text style={styles.infoDescription}>
                To make high-quality, science-backed nutrition accessible
                to everyone for a healthier and happier life.
              </Text>
            </View>
          </View>

          {/* OUR VISION */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconBox}>
              <Ionicons
                name="eye-outline"
                size={43}
                color={GREEN}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Our Vision</Text>
              <Text style={styles.infoDescription}>
                To be a trusted global brand in health and wellness,
                empowering people to achieve their best selves.
              </Text>
            </View>
          </View>

          {/* OUR PROMISE */}
          <View style={styles.promiseCard}>
            <View style={styles.promiseHeading}>
              <View style={styles.promiseMainIcon}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={43}
                  color={GREEN}
                />
              </View>
              <Text style={styles.infoTitle}>Our Promise</Text>
            </View>

            <View style={styles.promiseItems}>
              {PROMISES.map((item, index) => (
                <React.Fragment key={item.title}>
                  <View style={styles.promiseItem}>
                    <Ionicons
                      name={item.icon}
                      size={39}
                      color={GREEN}
                    />
                    <Text style={styles.promiseText}>{item.title}</Text>
                  </View>

                  {index !== PROMISES.length - 1 && (
                    <View style={styles.promiseDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* HEALTHIER YOU BANNER */}
          <View style={styles.lifestyleBanner}>
            <Image
              source={require("../../assets/images/naturyz-home-fitness-banner.png")}
              style={styles.lifestyleImage}
              resizeMode="cover"
            />
          </View>

          {/* BRAND STATISTICS */}
          <View style={styles.statsCard}>
            {STATS.map((item, index) => (
              <React.Fragment key={item.title}>
                <View style={styles.statItem}>
                  <Ionicons
                    name={item.icon}
                    size={37}
                    color={GREEN}
                  />
                  <Text style={styles.statLabel}>{item.title}</Text>
                  <Text style={styles.statValue}>{item.value}</Text>
                </View>

                {index !== STATS.length - 1 && (
                  <View style={styles.statDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 62,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
  },
  headerButton: {
    width: 37,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    height: 53,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -7,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: GREEN,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 25,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 18,
  },
  pageTitle: {
    color: TEXT,
    fontSize: 27,
    fontWeight: "900",
  },
  pageSubtitle: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  heroBanner: {
    height: 192,
    marginHorizontal: 13,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: PALE_GREEN,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  infoCard: {
    minHeight: 103,
    marginHorizontal: 13,
    marginTop: 13,
    padding: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.045,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  infoIconBox: {
    width: 67,
    height: 67,
    borderRadius: 17,
    backgroundColor: "#EFF7DF",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "900",
  },
  infoDescription: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 3,
  },
  promiseCard: {
    marginHorizontal: 13,
    marginTop: 13,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.045,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  promiseHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 5,
  },
  promiseMainIcon: {
    width: 67,
    height: 67,
    borderRadius: 17,
    backgroundColor: "#EFF7DF",
    alignItems: "center",
    justifyContent: "center",
  },
  promiseItems: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 3,
    paddingBottom: 4,
  },
  promiseItem: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  promiseText: {
    color: TEXT,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  promiseDivider: {
    width: 1,
    height: 66,
    backgroundColor: "#DFE0E2",
  },
  lifestyleBanner: {
    height: 190,
    marginHorizontal: 13,
    marginTop: 15,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: PALE_GREEN,
  },
  lifestyleImage: {
    width: "100%",
    height: "100%",
  },
  statsCard: {
    minHeight: 105,
    marginHorizontal: 13,
    marginTop: 15,
    paddingVertical: 13,
    paddingHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: GREEN,
    backgroundColor: "#FBFFF5",
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  statLabel: {
    color: TEXT,
    fontSize: 12,
    textAlign: "center",
  },
  statValue: {
    color: TEXT,
    fontSize: 19,
    fontWeight: "900",
  },
  statDivider: {
    width: 1,
    height: 69,
    backgroundColor: "#DADDE0",
  },
});