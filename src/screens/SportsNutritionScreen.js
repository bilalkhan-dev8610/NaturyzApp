import React, { useMemo, useState } from "react";
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
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "../components/BottomTabBar";
import TopNavbar from "../components/TopNavbar";
import ProductCard from "../components/product/ProductCard";

import {
  sportsNutritionCategories,
  sportsNutritionProducts,
} from "../data/sportsNutritionProducts";

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";
const TEXT = "#171717";
const MUTED = "#777777";

const formatPrice = (value) => {
  return `₹${value.toLocaleString("en-IN")}`;
};

export default function SportsNutritionScreen({
  onBack,
  onWishlistPress,
  onWishlistToggle,
  wishlistItems = [],
  onCartPress,
  onProductPress,
  onAddToCart,
  onTabPress,
  cartCount = 0,
  cartItems = [],
}) {
  const { width } = useWindowDimensions();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  const horizontalPadding = 14;
  const columnGap = 12;
  const cardWidth = (width - horizontalPadding * 2 - columnGap) / 2;

  const filteredProducts = useMemo(() => {
    let result = sportsNutritionProducts.filter((product) => {
      const categoryMatches =
        activeCategory === "All" || product.category === activeCategory;

      const discountMatches = !onlyDiscounted || product.discount > 0;

      return categoryMatches && discountMatches;
    });

    if (sortBy === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "Top Rated") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, sortBy, onlyDiscounted]);

  const toggleWishlist = (product) => {
    const alreadySaved = wishlistItems.some((item) => item.id === product.id);

    if (onWishlistToggle) {
      onWishlistToggle(product, !alreadySaved);
    }
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    Alert.alert(
      "Demo Cart",
      `${product.name} selected. Shared cart integration will be connected through App.js.`,
    );
  };

  const handleProductPress = (product) => {
    if (onProductPress) {
      onProductPress(product);
      return;
    }

    Alert.alert(
      "Product Details",
      `${product.name} selected. Product Details screen will be connected next.`,
    );
  };

  const handleTabPress = (tab) => {
    if (onTabPress) {
      onTabPress(tab);
      return;
    }

    if (tab !== "Categories") {
      Alert.alert(
        "NATURYZ",
        `${tab} screen will be connected in its development phase.`,
      );
    }
  };

  const renderProductCard = (product) => {
    const isWishlisted = wishlistItems.some((item) => item.id === product.id);
   const isInCart = cartItems.some(
  (item) =>
    item.id === product.id ||
    item.productId === product.id
);
    return (
      <ProductCard
        key={product.id}
        product={product}
        width={cardWidth}
        isInCart={isInCart}
        isWishlisted={isWishlisted}
        onPress={handleProductPress}
        onWishlistPress={toggleWishlist}
        onAddToCart={handleAddToCart}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* REUSABLE TOP NAVBAR */}
        <TopNavbar
          leftAction="back"
          onLeftPress={onBack}
          onWishlistPress={
            onWishlistPress ||
            (() =>
              Alert.alert("Wishlist", "Your saved products are shown here."))
          }
          onCartPress={onCartPress}
          cartCount={cartCount}
          showWishlist={true}
          showCart={true}
          headerBackgroundColor="#FFFFFF"
          iconColor={TEXT}
          headerHeight={66}
          headerBorderColor="#F4F4F4"
          headerBorderWidth={1}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* CATEGORY HERO BANNER */}
          <View style={styles.heroBanner}>
            <Image
              source={require("../../assets/images/naturyz-sports-category-banner.png")}
              style={styles.heroImage}
              resizeMode="stretch"
            />
          </View>

          {/* CATEGORY CHIPS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipList}
          >
            {sportsNutritionCategories.map((category) => {
              const active = activeCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryChip,
                    active && styles.activeCategoryChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      active && styles.activeCategoryChipText,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* PRODUCT COUNT AND CONTROLS */}
          <View style={styles.toolbar}>
            <View>
              <Text style={styles.productCount}>
                {filteredProducts.length} Products
              </Text>
              <Text style={styles.demoLabel}>Sample catalogue</Text>
            </View>

            <View style={styles.toolbarActions}>
              <Pressable
                onPress={() => setSortVisible(true)}
                style={styles.toolbarButton}
              >
                <Ionicons name="swap-vertical" size={20} color={TEXT} />
                <Text style={styles.toolbarText}>Sort</Text>
              </Pressable>

              <View style={styles.toolbarDivider} />

              <Pressable
                onPress={() => setFilterVisible(true)}
                style={styles.toolbarButton}
              >
                <Ionicons name="filter-outline" size={20} color={TEXT} />
                <Text style={styles.toolbarText}>Filter</Text>
              </Pressable>
            </View>
          </View>

          {/* PRODUCT GRID */}
          {filteredProducts.length > 0 ? (
            <View style={styles.productGrid}>
              {filteredProducts.map(renderProductCard)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="basket-outline" size={42} color="#A0A0A0" />
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptyDescription}>
                Try another category or change your filters.
              </Text>
            </View>
          )}

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* REUSABLE BOTTOM NAVIGATION */}
        <BottomTabBar activeTab="Categories" onTabPress={handleTabPress} />
      </View>

      {/* SORT MODAL */}
      <Modal
        visible={sortVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSortVisible(false)}
        >
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>Sort Products</Text>

            {[
              "Recommended",
              "Price: Low to High",
              "Price: High to Low",
              "Top Rated",
            ].map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  setSortBy(option);
                  setSortVisible(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{option}</Text>

                <Ionicons
                  name={
                    sortBy === option ? "radio-button-on" : "radio-button-off"
                  }
                  size={21}
                  color={GREEN}
                />
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* FILTER MODAL */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterSheet}>
            <View style={styles.filterHeader}>
              <Text style={styles.modalTitle}>Filter Products</Text>

              <Pressable onPress={() => setFilterVisible(false)}>
                <Ionicons name="close" size={25} color={TEXT} />
              </Pressable>
            </View>

            <Pressable
              style={styles.filterOption}
              onPress={() => setOnlyDiscounted((value) => !value)}
            >
              <View>
                <Text style={styles.filterOptionTitle}>
                  Discounted Products
                </Text>
                <Text style={styles.filterOptionSubtitle}>
                  Show products with an offer
                </Text>
              </View>

              <Ionicons
                name={onlyDiscounted ? "checkbox" : "square-outline"}
                size={24}
                color={GREEN}
              />
            </Pressable>

            <Pressable
              style={styles.applyButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </Pressable>

            <Pressable
              style={styles.clearButton}
              onPress={() => {
                setOnlyDiscounted(false);
                setActiveCategory("All");
                setFilterVisible(false);
              }}
            >
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 8,
  },

  heroBanner: {
    height: 178,
    marginHorizontal: 12,
    marginTop: 5,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#EFF6D9",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  chipList: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 9,
  },

  categoryChip: {
    minHeight: 43,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },

  activeCategoryChip: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT,
  },

  activeCategoryChipText: {
    color: "#FFFFFF",
  },

  toolbar: {
    minHeight: 62,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },

  productCount: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "700",
  },

  demoLabel: {
    color: MUTED,
    fontSize: 10,
    marginTop: 2,
  },

  toolbarActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  toolbarButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 10,
  },

  toolbarText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "600",
  },

  toolbarDivider: {
    width: 1,
    height: 25,
    backgroundColor: "#E6E6E6",
  },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 12,
    rowGap: 12,
  },

  emptyState: {
    paddingVertical: 55,
    alignItems: "center",
    paddingHorizontal: 25,
  },

  emptyTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 12,
  },

  emptyDescription: {
    color: MUTED,
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },

  bottomSpace: {
    height: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.38)",
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
  },

  modalTitle: {
    color: TEXT,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 14,
  },

  modalOption: {
    minHeight: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  modalOptionText: {
    color: TEXT,
    fontSize: 14,
  },

  filterSheet: {
    marginTop: "auto",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    paddingBottom: 30,
  },

  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  filterOptionTitle: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "700",
  },

  filterOptionSubtitle: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
  },

  applyButton: {
    height: 48,
    borderRadius: 25,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  clearButton: {
    alignItems: "center",
    paddingVertical: 13,
  },

  clearButtonText: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "700",
  },
});
