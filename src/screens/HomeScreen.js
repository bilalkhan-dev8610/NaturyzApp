import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Animated,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "../components/BottomTabBar";
import TopNavbar from "../components/TopNavbar";
import ProductCard from "../components/product/ProductCard";

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";
const CREAM = "#FDFFF1";

const categories = [
  {
    id: "omegas",
    title: "Omegas",
    image: require("../../assets/images/naturyz-category-omegas.png"),
  },
  {
    id: "multivitamins",
    title: "Multivitamins\n& Minerals",
    image: require("../../assets/images/naturyz-category-multivitamins.png"),
  },
  {
    id: "sports",
    title: "Sports\nNutrition",
    image: require("../../assets/images/naturyz-category-sports.png"),
  },
  {
    id: "weight",
    title: "Weight\nManagement",
    image: require("../../assets/images/naturyz-category-weight.png"),
  },
  {
    id: "gummies",
    title: "Gummies",
    image: require("../../assets/images/naturyz-category-gummies.png"),
  },
  {
    id: "herbal",
    title: "Herbal\nRange",
    image: require("../../assets/images/naturyz-category-herbal.png"),
  },
];

const products = [
  {
    id: "whey",
    name: "Whey Protein",
    subtitle: "Premium Protein Blend",
    price: "₹1,999",
    image: require("../../assets/images/naturyz-product-whey-protein.png"),
  },
  {
    id: "mass",
    name: "Mass Gainer",
    subtitle: "Weight Gain Formula",
    price: "₹1,799",
    image: require("../../assets/images/naturyz-product-mass-gainer.png"),
  },
  {
    id: "creatine",
    name: "Creatine X7",
    subtitle: "Performance Support",
    price: "₹999",
    image: require("../../assets/images/naturyz-product-creatine-x7.png"),
  },
];

const serviceBenefits = [
  {
    id: "shipping",
    title: "Free\nShipping *",
    icon: "car-outline",
  },
  {
    id: "authentic",
    title: "100%\nAuthentic",
    icon: "shield-checkmark-outline",
  },
  {
    id: "returns",
    title: "Easy\nReturns",
    icon: "cube-outline",
  },
  {
    id: "support",
    title: "Dedicated\nSupport",
    icon: "headset-outline",
  },
];

export default function HomeScreen({
  onMenuPress,
  onWishlistPress,
  onCartPress,
  onCategoryPress,
  onProductPress,
  onTabPress,
  cartCount = 0,
  wishlistItems = [],
  onWishlistToggle,
}) {
  const [searchText, setSearchText] = useState("");
  const heroDotWidth = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.spring(heroDotWidth, {
      toValue: 17,
      speed: 12,
      bounciness: 4,
      useNativeDriver: false,
    }).start();

    return () => heroDotWidth.stopAnimation();
  }, [heroDotWidth]);

  const showAction = (message) => {
    Alert.alert("NATURYZ", message);
  };

  const handleTabPress = (tab) => {
    if (onTabPress) {
      onTabPress(tab);
      return;
    }

    if (tab !== "Home") {
      showAction(
        `${tab} screen will be connected in the next development phase.`,
      );
    }
  };

  const handleCategoryPress = (category) => {
    if (onCategoryPress) {
      onCategoryPress(category);
      return;
    }

    showAction(`${category} category selected.`);
  };

  const handleProductPress = (product) => {
    if (onProductPress) {
      onProductPress(product);
      return;
    }

    showAction(`${product.name} product details will be connected next.`);
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      showAction("Please enter a product or category name.");
      return;
    }

    showAction(`Searching for "${searchText.trim()}"...`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* REUSABLE TOP NAVBAR */}
        <TopNavbar
          logoPosition="center"
          leftAction="menu"
          onLeftPress={() =>
            onMenuPress
              ? onMenuPress()
              : showAction("Menu will be connected soon.")
          }
          onWishlistPress={() =>
            onWishlistPress
              ? onWishlistPress()
              : showAction("Wishlist screen will be connected soon.")
          }
          onCartPress={() =>
            onCartPress
              ? onCartPress()
              : showAction("Cart screen will be connected soon.")
          }
          cartCount={cartCount}
          showSearch={true}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSearchSubmit={handleSearch}
          onVoiceSearchPress={() =>
            showAction("Voice search will be added in a future update.")
          }
        />

        {/* SCROLLABLE HOME CONTENT */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO BANNER */}
          <Pressable
            onPress={() =>
              showAction("Premium Health Supplements collection selected.")
            }
            style={styles.heroBanner}
          >
            <Image
              source={require("../../assets/images/naturyz-home-hero-banner.png")}
              style={styles.heroImage}
              resizeMode="stretch"
            />
          </Pressable>

          {/* HERO PAGINATION */}
          <View style={styles.heroPagination}>
            <Animated.View
              style={[styles.heroActiveDot, { width: heroDotWidth }]}
            />
            <View style={styles.heroInactiveDot} />
            <View style={styles.heroInactiveDot} />
          </View>

          {/* SERVICE BENEFITS */}
          <View style={styles.benefitsContainer}>
            {serviceBenefits.map((item, index) => (
              <View style={styles.benefitItem} key={item.id}>
                <View style={styles.benefitIconCircle}>
                  <Ionicons name={item.icon} size={34} color={GREEN} />
                </View>

                <Text style={styles.benefitText}>{item.title}</Text>

                {index !== serviceBenefits.length - 1 && (
                  <View style={styles.benefitDivider} />
                )}
              </View>
            ))}
          </View>

          {/* CATEGORIES HEADER */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Categories</Text>

            <Pressable
              style={styles.viewAllButton}
              onPress={() =>
                showAction("All product categories will open here.")
              }
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="arrow-forward" size={18} color={GREEN} />
            </Pressable>
          </View>

          {/* CATEGORY LIST */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={({ pressed }) => [
                  styles.categoryCard,
                  pressed && styles.cardPressed,
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <View style={styles.categoryImageContainer}>
                  <Image
                    source={category.image}
                    style={styles.categoryImage}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.categoryTitle}>{category.title}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* FITNESS PROMOTIONAL BANNER */}
          <Pressable
            style={styles.fitnessBanner}
            onPress={() => showAction("Sports Nutrition collection selected.")}
          >
            <Image
              source={require("../../assets/images/naturyz-home-fitness-banner.png")}
              style={styles.fitnessImage}
              resizeMode="stretch"
            />
          </Pressable>

          {/* BEST SELLERS HEADER */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Sellers</Text>

            <Pressable
              style={styles.viewAllButton}
              onPress={() =>
                showAction("All best-selling products will open here.")
              }
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="arrow-forward" size={18} color={GREEN} />
            </Pressable>
          </View>

          {/* PRODUCT LIST */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          >
            {products.map((product) => {
              const isWishlisted = wishlistItems.some(
                (item) => item.id === product.id,
              );

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="compact"
                  isWishlisted={isWishlisted}
                  onPress={handleProductPress}
                  onWishlistPress={(item) => {
                    const alreadySaved = wishlistItems.some(
                      (savedItem) => savedItem.id === item.id,
                    );

                    onWishlistToggle?.(item, !alreadySaved);
                  }}
                />
              );
            })}
          </ScrollView>

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* FIXED BOTTOM NAVIGATION */}
        {/* REUSABLE BOTTOM NAVIGATION */}
        <BottomTabBar activeTab="Home" onTabPress={handleTabPress} />
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

  /* SCROLL */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 8,
  },

  /* HERO */

  heroBanner: {
    marginHorizontal: 12,
    marginTop: 5,
    height: 178,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#EFF6D9",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroPagination: {
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
  },

  heroActiveDot: {
    height: 9,
    borderRadius: 10,
    backgroundColor: GREEN,
  },

  heroInactiveDot: {
    width: 9,
    height: 9,
    borderRadius: 10,
    backgroundColor: "#E3EDC3",
  },

  /* BENEFITS */

  benefitsContainer: {
    minHeight: 105,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    marginTop: 2,
    marginBottom: 17,
  },

  benefitItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    minHeight: 98,
  },

  benefitIconCircle: {
    width: 53,
    height: 53,
    borderRadius: 28,
    backgroundColor: "#F0F6DE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },

  benefitText: {
    color: "#262626",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    textAlign: "center",
  },

  benefitDivider: {
    position: "absolute",
    right: 0,
    top: 13,
    height: 58,
    width: 1,
    backgroundColor: "#DCE8BD",
  },

  /* SECTION HEADERS */

  sectionHeader: {
    minHeight: 43,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  sectionTitle: {
    color: "#111111",
    fontSize: 20,
    fontWeight: "800",
  },

  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingVertical: 5,
  },

  viewAllText: {
    color: GREEN,
    fontSize: 13,
    fontWeight: "700",
  },

  /* CATEGORIES */

  categoryList: {
    paddingHorizontal: 12,
    paddingBottom: 15,
    gap: 9,
  },

  categoryCard: {
    width: 91,
    minHeight: 112,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 5,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },

  categoryImageContainer: {
    width: "100%",
    height: 72,
    borderRadius: 12,
    backgroundColor: "#FAFAF4",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryImage: {
    width: "100%",
    height: "100%",
  },

  categoryTitle: {
    color: "#171717",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
    textAlign: "center",
    marginTop: 5,
  },

  /* FITNESS BANNER */

  fitnessBanner: {
    marginHorizontal: 12,
    height: 140,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#EFF6D9",
    marginBottom: 16,
  },

  fitnessImage: {
    width: "100%",
    height: "100%",
  },

  /* PRODUCTS */

  productList: {
    paddingHorizontal: 12,
    gap: 11,
    paddingBottom: 10,
  },

  productCard: {
    width: 158,
    minHeight: 220,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  wishlistButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  productImage: {
    width: "100%",
    height: 155,
    marginTop: 5,
  },

  productInfo: {
    paddingHorizontal: 10,
    paddingBottom: 12,
  },

  productName: {
    color: "#202020",
    fontSize: 14,
    fontWeight: "800",
  },

  productSubtitle: {
    color: "#777777",
    fontSize: 10,
    marginTop: 3,
  },

  productPrice: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 5,
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  bottomSpace: {
    height: 15,
  },

  /* BOTTOM NAVIGATION */
});
