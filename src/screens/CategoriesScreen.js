
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";

const categories = [
  {
    id: "omegas",
    title: "Omegas",
    description: "Essential Nutrition\nfor Everyday Wellness",
    image: require("../../assets/images/naturyz-category-omegas-card.png"),
  },
  {
    id: "multivitamins",
    title: "Multivitamins\n& Minerals",
    description: "Foundation of\nDaily Nutrition",
    image: require("../../assets/images/naturyz-category-multivitamins-card.png"),
  },
  {
    id: "sports",
    title: "Sports\nNutrition",
    description: "Fuel Peak\nPerformance",
    image: require("../../assets/images/naturyz-category-sports-card.png"),
  },
  {
    id: "weight",
    title: "Weight\nManagement",
    description: "Thermogenic\nPower Unleashed",
    image: require("../../assets/images/naturyz-category-weight-card.png"),
  },
  {
    id: "gummies",
    title: "Gummies",
    description: "Nutrition\nMade Enjoyable",
    image: require("../../assets/images/naturyz-category-gummies-card.png"),
  },
  {
    id: "herbal",
    title: "Herbal\nRange",
    description: "Inspired by Nature,\nGuided by Science",
    image: require("../../assets/images/naturyz-category-herbal-card.png"),
  },
  {
    id: "liposomal",
    title: "Liposomal\nRange",
    description: "Innovation in\nNutrient Delivery",
    image: require("../../assets/images/naturyz-category-liposomal-card.png"),
  },
  {
    id: "all-products",
    title: "All Products",
    description: "Explore Our\nComplete Range",
    image: require("../../assets/images/naturyz-category-all-products-card.png"),
  },
];

const tabs = [
  { label: "Home", icon: "home-outline", activeIcon: "home" },
  { label: "Categories", icon: "grid-outline", activeIcon: "grid" },
  { label: "Search", icon: "search-outline", activeIcon: "search" },
  { label: "Orders", icon: "cube-outline", activeIcon: "cube" },
  { label: "Profile", icon: "person-outline", activeIcon: "person" },
];

export default function CategoriesScreen({
  onBack,
  onWishlistPress,
  onCartPress,
  onCategoryPress,
  onTabPress,
  cartCount = 0,
}) {
  const { width } = useWindowDimensions();

  const horizontalPadding = 14;
  const cardGap = 12;
  const cardWidth =
    (width - horizontalPadding * 2 - cardGap) / 2;

  const showMessage = (message) => {
    Alert.alert("NATURYZ", message);
  };

  const handleCategoryPress = (category) => {
    if (onCategoryPress) {
      onCategoryPress(category);
      return;
    }

    showMessage(
      `${category.title.replace("\n", " ")} selected. Product listing will be connected in the next phase.`
    );
  };

  const handleTabPress = (tab) => {
    if (onTabPress) {
      onTabPress(tab);
      return;
    }

    if (tab !== "Categories") {
      showMessage(`${tab} screen will be connected here.`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={onBack || (() => handleTabPress("Home"))}
            style={styles.headerButton}
            hitSlop={8}
          >
            <Ionicons
              name="arrow-back"
              size={29}
              color="#111111"
            />
          </Pressable>

          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/naturyz-home-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Pressable
            onPress={
              onWishlistPress ||
              (() => showMessage("Wishlist will be connected soon."))
            }
            style={styles.headerButton}
            hitSlop={8}
          >
            <Ionicons
              name="heart-outline"
              size={29}
              color="#111111"
            />
          </Pressable>

          <Pressable
            onPress={
              onCartPress ||
              (() => showMessage("Cart will be connected soon."))
            }
            style={styles.headerButton}
            hitSlop={8}
          >
            <View>
              <Ionicons
                name="cart-outline"
                size={31}
                color="#111111"
              />

              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>

        {/* SCROLLABLE CONTENT */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* PAGE TITLE */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>
              All Categories
            </Text>

            <Text style={styles.pageSubtitle}>
              Explore our wide range of health & wellness products
            </Text>
          </View>

          {/* CATEGORY GRID */}
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => handleCategoryPress(category)}
                style={({ pressed }) => [
                  styles.categoryCard,
                  {
                    width: cardWidth,
                  },
                  pressed && styles.cardPressed,
                ]}
              >
                {/* CATEGORY IMAGE */}
                <View style={styles.categoryImageWrapper}>
                  <Image
                    source={category.image}
                    style={styles.categoryImage}
                    resizeMode="contain"
                  />
                </View>

                {/* CATEGORY TEXT */}
                <View style={styles.categoryTextWrapper}>
                  <Text style={styles.categoryTitle}>
                    {category.title}
                  </Text>

                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>
                </View>

                {/* ARROW */}
                <View style={styles.categoryArrow}>
                  <Ionicons
                    name="arrow-forward"
                    size={22}
                    color={DARK_GREEN}
                  />
                </View>
              </Pressable>
            ))}
          </View>

          {/* PROMOTIONAL BANNER */}
          <Pressable
            onPress={() =>
              handleCategoryPress({
                id: "all-products",
                title: "All Products",
              })
            }
            style={({ pressed }) => [
              styles.promoBanner,
              pressed && styles.cardPressed,
            ]}
          >
            <Image
              source={require("../../assets/images/naturyz-categories-promo-banner.png")}
              style={styles.promoImage}
              resizeMode="stretch"
            />
          </Pressable>

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* FIXED BOTTOM NAVIGATION */}
        <View style={styles.bottomNavigation}>
          {tabs.map((tab) => {
            const isActive = tab.label === "Categories";

            return (
              <Pressable
                key={tab.label}
                onPress={() => handleTabPress(tab.label)}
                style={styles.tabItem}
              >
                <View
                  style={[
                    styles.tabIconContainer,
                    isActive && styles.activeTabContainer,
                  ]}
                >
                  <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={27}
                    color={isActive ? DARK_GREEN : "#111111"}
                  />

                  
                </View>

                <Text
                  style={[
                    styles.tabLabel,
                    isActive && styles.activeTabLabel,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
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

  /* HEADER */

  header: {
    height: 76,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  headerButton: {
    width: 39,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    flex: 1,
    height: 61,
    marginHorizontal: 6,
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
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  /* SCROLL CONTENT */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 8,
  },

  /* PAGE TITLE */

  titleSection: {
    paddingHorizontal: 19,
    paddingTop: 16,
    paddingBottom: 25,
  },

  pageTitle: {
    color: "#111111",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  pageSubtitle: {
    color: "#777780",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 5,
  },

  /* CATEGORY GRID */

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    rowGap: 12,
  },

  categoryCard: {
    height: 150,
    borderRadius: 22,
    backgroundColor: "#FAFCEF",
    borderWidth: 1,
    borderColor: "#EDF0E4",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  categoryImageWrapper: {
    width: "43%",
    height: "78%",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryImage: {
    width: "100%",
    height: "100%",
  },

  categoryTextWrapper: {
    flex: 1,
    alignSelf: "center",
    paddingLeft: 3,
    paddingRight: 2,
    paddingBottom: 12,
  },

  categoryTitle: {
    color: "#111111",
    fontSize: 17,
    lineHeight: 20,
    fontWeight: "800",
  },

  categoryDescription: {
    color: "#33333B",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 8,
  },

  categoryArrow: {
    position: "absolute",
    right: 13,
    bottom: 13,
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#EDF5D1",
    alignItems: "center",
    justifyContent: "center",
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },

  /* PROMOTIONAL BANNER */

  promoBanner: {
    marginHorizontal: 14,
    marginTop: 27,
    height: 145,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#F0F6DB",
  },

  promoImage: {
    width: "100%",
    height: "100%",
  },

  bottomSpace: {
    height: 15,
  },

  /* BOTTOM NAVIGATION */

  bottomNavigation: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingHorizontal: 5,
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },

  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  tabIconContainer: {
    width: 57,
    height: 37,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  activeTabContainer: {
    backgroundColor: "#F0F6DE",
  },

  tabLabel: {
    color: "#171717",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },

  activeTabLabel: {
    color: DARK_GREEN,
    fontWeight: "800",
  },

  tabCartBadge: {
    position: "absolute",
    right: 1,
    top: -4,
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
});
