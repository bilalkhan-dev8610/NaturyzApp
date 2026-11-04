import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  Modal,
  Alert,
  Keyboard,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { sportsNutritionProducts } from "../data/sportsNutritionProducts";

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";
const TEXT = "#171717";
const MUTED = "#777777";
const PALE_GREEN = "#F3F8E8";

const RECENT_SEARCHES_KEY = "@naturyz_recent_searches";

const popularSearches = [
  { label: "Protein", icon: "nutrition-outline", query: "protein" },
  { label: "Creatine", icon: "barbell-outline", query: "creatine" },
  { label: "Fat Burner", icon: "flame-outline", query: "fat burner" },
  { label: "Omega-3", icon: "fish-outline", query: "omega" },
  { label: "Herbal", icon: "leaf-outline", query: "herbal" },
  { label: "Gummies", icon: "medkit-outline", query: "gummies" },
];

const SORT_OPTIONS = [
  "Relevance",
  "Price: Low to High",
  "Price: High to Low",
  "Top Rated",
];

const formatPrice = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function SearchScreen({
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
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const saved = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);

        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setRecentSearches(parsed);
          }
        }
      } catch (error) {
        console.warn("Recent searches loading failed:", error);
      }
    };

    loadRecentSearches();
  }, []);

  const saveRecentSearches = async (searches) => {
    try {
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch (error) {
      console.warn("Recent searches saving failed:", error);
    }
  };

  const addRecentSearch = (value) => {
    const cleaned = value.trim();

    if (!cleaned) return;

    setRecentSearches((previous) => {
      const updated = [
        cleaned,
        ...previous.filter(
          (item) => item.toLowerCase() !== cleaned.toLowerCase(),
        ),
      ].slice(0, 8);

      saveRecentSearches(updated);
      return updated;
    });
  };

  const removeRecentSearch = (value) => {
    setRecentSearches((previous) => {
      const updated = previous.filter((item) => item !== value);
      saveRecentSearches(updated);
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    saveRecentSearches([]);
  };

  const executeSearch = (value = searchText) => {
    const cleaned = value.trim();

    if (!cleaned) {
      Alert.alert("Search", "Please enter a product name.");
      return;
    }

    setSearchText(cleaned);
    addRecentSearch(cleaned);
    Keyboard.dismiss();
  };

  const filteredProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) return [];

    let results = sportsNutritionProducts.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.size,
        product.flavour,
        product.description,
        product.subtitle,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);
      const matchesDiscount = !onlyDiscounted || product.discount > 0;

      return matchesSearch && matchesDiscount;
    });

    if (sortBy === "Price: Low to High") {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      results = [...results].sort((a, b) => b.price - a.price);
    } else if (sortBy === "Top Rated") {
      results = [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return results;
  }, [searchText, sortBy, onlyDiscounted]);

  const toggleWishlist = (product) => {
    const alreadySaved = wishlistItems.some((item) => item.id === product.id);

    if (onWishlistToggle) {
      onWishlistToggle(product, !alreadySaved);
    }
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      Alert.alert("Cart", "Cart connection is not available.");
    }
  };

  const handleProductPress = (product) => {
    Keyboard.dismiss();

    if (onProductPress) {
      onProductPress(product);
    } else {
      Alert.alert("Product", `${product.name} selected.`);
    }
  };

  const handleTabPress = (tab) => {
    if (onTabPress) {
      onTabPress(tab);
    }
  };

  const renderProductCard = (product) => {
    const isWishlisted = wishlistItems.some((item) => item.id === product.id);

    const description =
      product.description ||
      product.subtitle ||
      [product.size, product.flavour].filter(Boolean).join(" | ");

    return (
      <View key={product.id} style={styles.productCard}>
        <Pressable
          style={styles.productImageButton}
          onPress={() => handleProductPress(product)}
        >
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </Pressable>

        <View style={styles.productInfo}>
          <Pressable
            style={styles.productTitleArea}
            onPress={() => handleProductPress(product)}
          >
            <Text style={styles.productName} numberOfLines={2}>
              {product.name}
            </Text>

            {!!description && (
              <Text style={styles.productDescription} numberOfLines={2}>
                {description}
              </Text>
            )}
          </Pressable>

          {typeof product.rating === "number" && (
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={19} color="#F5B800" />
              <Text style={styles.ratingValue}>
                {product.rating.toFixed(1)}
              </Text>

              {typeof product.reviews === "number" && (
                <Text style={styles.reviewCount}>
                  ({product.reviews.toLocaleString("en-IN")} Reviews)
                </Text>
              )}
            </View>
          )}

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>

            {product.mrp > product.price && (
              <Text style={styles.mrp}>{formatPrice(product.mrp)}</Text>
            )}

            {product.discount > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}% Off</Text>
              </View>
            )}
          </View>

          <Pressable
            onPress={() => handleAddToCart(product)}
            style={({ pressed }) => [
              styles.addToCartButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="cart-outline" size={21} color="#FFFFFF" />
          </Pressable>
        </View>

        <Pressable
          onPress={() => toggleWishlist(product)}
          style={styles.wishlistButton}
          hitSlop={8}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={27}
            color={isWishlisted ? "#E53935" : TEXT}
          />
        </Pressable>
      </View>
    );
  };

  const tabs = [
    { label: "Home", icon: "home-outline", activeIcon: "home" },
    { label: "Categories", icon: "grid-outline", activeIcon: "grid" },
    { label: "Search", icon: "search-outline", activeIcon: "search" },
    { label: "Orders", icon: "cube-outline", activeIcon: "cube" },
    { label: "Profile", icon: "person-outline", activeIcon: "person" },
  ];

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
            onPress={() => onWishlistPress && onWishlistPress()}
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
                  <Text style={styles.cartBadgeText}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* SEARCH BAR */}
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={29} color={TEXT} />

            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => executeSearch()}
              placeholder="Search products..."
              placeholderTextColor="#888888"
              returnKeyType="search"
              style={styles.searchInput}
            />

            {searchText.length > 0 && (
              <Pressable
                onPress={() => {
                  setSearchText("");
                  Keyboard.dismiss();
                }}
                hitSlop={10}
              >
                <Ionicons name="close" size={27} color="#82916C" />
              </Pressable>
            )}
          </View>

          {/* RECENT SEARCHES */}
          {recentSearches.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>

                <Pressable onPress={clearRecentSearches}>
                  <Text style={styles.clearAll}>Clear All</Text>
                </Pressable>
              </View>

              <View style={styles.recentList}>
                {recentSearches.map((item) => (
                  <View key={item} style={styles.recentChip}>
                    <Pressable
                      style={styles.recentChipContent}
                      onPress={() => executeSearch(item)}
                    >
                      <Ionicons name="time-outline" size={20} color={GREEN} />
                      <Text style={styles.recentText} numberOfLines={1}>
                        {item}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => removeRecentSearch(item)}
                      hitSlop={8}
                    >
                      <Ionicons name="close" size={19} color={TEXT} />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* POPULAR SEARCHES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>

            <View style={styles.popularGrid}>
              {popularSearches.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() => executeSearch(item.query)}
                  style={({ pressed }) => [
                    styles.popularItem,
                    pressed && styles.pressed,
                  ]}
                >
                  <Ionicons name={item.icon} size={34} color={GREEN} />
                  <Text style={styles.popularLabel}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* SEARCH RESULTS */}
          {searchText.trim().length > 0 && (
            <View style={styles.resultsSection}>
              <View style={styles.resultsHeading}>
                <Text style={styles.resultsTitle}>
                  Results for{" "}
                  <Text style={styles.searchTerm}>"{searchText.trim()}"</Text>
                </Text>

                <Text style={styles.resultCount}>
                  ({filteredProducts.length} Products)
                </Text>
              </View>

              {/* FILTER AND SORT */}
              <View style={styles.controlsRow}>
                <Pressable
                  style={styles.controlButton}
                  onPress={() => setFilterVisible(true)}
                >
                  <Ionicons name="options-outline" size={23} color={TEXT} />
                  <Text style={styles.controlText}>Filter</Text>
                </Pressable>

                <Pressable
                  style={styles.sortButton}
                  onPress={() => setSortVisible(true)}
                >
                  <Text style={styles.controlText}>Sort By: {sortBy}</Text>
                  <Ionicons name="chevron-down" size={21} color={TEXT} />
                </Pressable>
              </View>

              {filteredProducts.length > 0 ? (
                <View style={styles.productList}>
                  {filteredProducts.map(renderProductCard)}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="search-outline" size={48} color="#A6A6A6" />
                  <Text style={styles.emptyTitle}>No products found</Text>
                  <Text style={styles.emptyDescription}>
                    Try another product name or popular search.
                  </Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottomNavigation}>
          {tabs.map((tab) => {
            const active = tab.label === "Search";

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

            {SORT_OPTIONS.map((option) => (
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
    paddingHorizontal: 13,
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
    minWidth: 21,
    height: 21,
    borderRadius: 11,
    paddingHorizontal: 4,
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
    paddingBottom: 12,
  },
  searchBar: {
    minHeight: 76,
    marginHorizontal: 14,
    marginTop: 12,
    paddingHorizontal: 17,
    borderWidth: 2,
    borderColor: GREEN,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  searchInput: {
    flex: 1,
    color: TEXT,
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 12,
  },
  section: {
    marginTop: 31,
    paddingHorizontal: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 17,
  },
  clearAll: {
    color: DARK_GREEN,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 17,
  },
  recentList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  recentChip: {
    minHeight: 48,
    maxWidth: "100%",
    paddingHorizontal: 13,
    borderRadius: 26,
    backgroundColor: PALE_GREEN,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  recentChipContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    maxWidth: 190,
  },
  recentText: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "600",
  },
  popularGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  popularItem: {
    width: "15.8%",
    minWidth: 51,
    height: 91,
    borderRadius: 19,
    backgroundColor: "#F5F8ED",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  popularLabel: {
    color: TEXT,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },
  resultsSection: {
    marginTop: 48,
    paddingHorizontal: 13,
  },
  resultsHeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  resultsTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "800",
  },
  searchTerm: {
    color: DARK_GREEN,
  },
  resultCount: {
    color: MUTED,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  controlButton: {
    minHeight: 57,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  sortButton: {
    flex: 1,
    minHeight: 57,
    paddingHorizontal: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  controlText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "700",
  },
  productList: {
    gap: 13,
  },
  productCard: {
    minHeight: 205,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    padding: 11,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.045,
    shadowRadius: 4,
  },
  productImageButton: {
    width: "29%",
    height: 178,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 3,
  },
  productTitleArea: {
    paddingRight: 24,
  },
  productName: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "800",
  },
  productDescription: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  ratingValue: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
  },
  reviewCount: {
    flexShrink: 1,
    color: MUTED,
    fontSize: 11,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 13,
    marginBottom: 12,
  },
  price: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "900",
  },
  mrp: {
    color: MUTED,
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  discountBadge: {
    backgroundColor: "#F0F6DE",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 18,
  },
  discountText: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "800",
  },
  addToCartButton: {
    width: 76,
    height: 49,
    borderRadius: 17,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  wishlistButton: {
    position: "absolute",
    top: 13,
    right: 12,
    zIndex: 2,
    width: 32,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 55,
    paddingHorizontal: 25,
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 13,
  },
  emptyDescription: {
    color: MUTED,
    fontSize: 13,
    textAlign: "center",
    marginTop: 7,
  },
  bottomSpace: {
    height: 15,
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
  },
  activeTabContainer: {
    backgroundColor: "#F0F6DE",
  },
  tabLabel: {
    color: TEXT,
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  activeTabLabel: {
    color: DARK_GREEN,
    fontWeight: "800",
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
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
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
    height: 49,
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
  pressed: {
    opacity: 0.8,
  },
});
