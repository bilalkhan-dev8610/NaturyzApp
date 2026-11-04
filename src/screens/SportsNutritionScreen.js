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
  const alreadySaved = wishlistItems.some(
    (item) => item.id === product.id
  );

  if (onWishlistToggle) {
    onWishlistToggle(product, !alreadySaved);
  }

  Alert.alert(
    "Wishlist",
    alreadySaved
      ? `${product.name} removed from wishlist.`
      : `${product.name} added to wishlist.`
  );
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

  const tabs = [
    { label: "Home", icon: "home-outline", activeIcon: "home" },
    { label: "Categories", icon: "grid-outline", activeIcon: "grid" },
    { label: "Search", icon: "search-outline", activeIcon: "search" },
    { label: "Orders", icon: "cube-outline", activeIcon: "cube" },
    { label: "Profile", icon: "person-outline", activeIcon: "person" },
  ];

  const renderProductCard = (product) => {
    const isWishlisted = wishlistItems.some(
  (item) => item.id === product.id
);

    return (
      <Pressable
        key={product.id}
        onPress={() => handleProductPress(product)}
        style={({ pressed }) => [
          styles.productCard,
          { width: cardWidth },
          pressed && styles.cardPressed,
        ]}
      >
        {product.badge && (
          <View style={styles.bestSellerBadge}>
            <Text style={styles.bestSellerText}>{product.badge}</Text>
          </View>
        )}

        <Pressable
          onPress={() => toggleWishlist(product)}
          style={styles.wishlistButton}
          hitSlop={8}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={27}
            color={isWishlisted ? "#E53935" : "#111111"}
          />
        </Pressable>

        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {product.name}
          </Text>

          <Text style={styles.productVariant} numberOfLines={1}>
            {product.size} | {product.flavour}
          </Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={17} color="#F5B800" />
            <Text style={styles.ratingValue}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>
              ({product.reviews.toLocaleString("en-IN")} Reviews)
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>

            <Text style={styles.mrp}>{formatPrice(product.mrp)}</Text>

            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% Off</Text>
            </View>
          </View>

          <Pressable
            onPress={() => handleAddToCart(product)}
            style={({ pressed }) => [
              styles.addToCartButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable style={styles.headerButton} onPress={onBack} hitSlop={8}>
            <Ionicons name="arrow-back" size={29} color={TEXT} />
          </Pressable>

          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/images/naturyz-home-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Pressable
            style={styles.headerButton}
            onPress={() =>
              onWishlistPress
                ? onWishlistPress()
                : Alert.alert("Wishlist", "Your saved products are shown here.")
            }
            hitSlop={8}
          >
            <Ionicons name="heart-outline" size={29} color={TEXT} />
          </Pressable>

          <Pressable
            style={styles.headerButton}
            onPress={onCartPress}
            hitSlop={8}
          >
            <View>
              <Ionicons name="cart-outline" size={31} color={TEXT} />

              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>

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

        {/* FIXED BOTTOM NAVIGATION */}
        <View style={styles.bottomNavigation}>
          {tabs.map((tab) => {
            const active = tab.label === "Categories";

            return (
              <Pressable
                key={tab.label}
                onPress={() => handleTabPress(tab.label)}
                style={styles.tabItem}
              >
                <View
                  style={[
                    styles.tabIconContainer,
                    active && styles.activeTabContainer,
                  ]}
                >
                  <Ionicons
                    name={active ? tab.activeIcon : tab.icon}
                    size={27}
                    color={active ? DARK_GREEN : TEXT}
                  />
                </View>

                <Text
                  style={[styles.tabLabel, active && styles.activeTabLabel]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
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

  logoWrapper: {
    flex: 1,
    height: 62,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  cartBadge: {
    position: "absolute",
    right: -7,
    top: -6,
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

  productCard: {
    borderRadius: 21,
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

  bestSellerBadge: {
    position: "absolute",
    top: 9,
    left: 9,
    zIndex: 2,
    backgroundColor: GREEN,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },

  bestSellerText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  wishlistButton: {
    position: "absolute",
    top: 12,
    right: 11,
    zIndex: 3,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  productImage: {
    width: "100%",
    height: 190,
    marginTop: 8,
  },

  productInfo: {
    paddingHorizontal: 11,
    paddingBottom: 11,
  },

  productName: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "800",
  },

  productVariant: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 9,
  },

  ratingValue: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "700",
  },

  reviewCount: {
    flex: 1,
    color: MUTED,
    fontSize: 10,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
    marginBottom: 11,
  },

  price: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "900",
  },

  mrp: {
    color: MUTED,
    fontSize: 10,
    textDecorationLine: "line-through",
  },

  discountBadge: {
    backgroundColor: "#F0F6DE",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 16,
  },

  discountText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "800",
  },

  addToCartButton: {
    height: 43,
    borderRadius: 24,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addToCartText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  buttonPressed: {
    opacity: 0.8,
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
