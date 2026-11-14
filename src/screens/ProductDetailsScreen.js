// src/screens/ProductDetailsScreen.js

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  wheyProteinDetails,
  formatINR,
  getDiscountPercent,
} from "../data/wheyProteinDetails";

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";
const TEXT = "#202020";
const MUTED = "#777777";
const PALE_GREEN = "#F2F7E3";
const BORDER = "#EAEDE2";

export default function ProductDetailsScreen({
  product,
  cartCount = 0,
  cartItems = [],
  onBack,
  onCartPress,
  onAddToCart,
  onWishlistPress,
}) {
  const details = wheyProteinDetails;

  const [selectedFlavor, setSelectedFlavor] = useState(
    product?.flavour || product?.flavor || "Rich Chocolate",
  );
  const [selectedSize, setSelectedSize] = useState("1kg");
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const selectedSizeData = useMemo(
    () =>
      details.sizes.find((size) => size.id === selectedSize) ||
      details.sizes[0],
    [selectedSize],
  );

  const price = selectedSizeData.price;
  const mrp = selectedSizeData.mrp;
  const discount = getDiscountPercent(mrp, price);

  const displayImage = product?.image || details.image;
  const displayName = product?.name || details.name;
  const rating = product?.rating ?? details.rating;
  const reviews = product?.reviews ?? details.reviews;
  const baseProductId = product?.id || details.id;

  const cartItemId = `${baseProductId}-${selectedSize}-${selectedFlavor}`;

  const isInCart = cartItems.some(
    (item) => item.id === baseProductId || item.id === cartItemId,
  );
  const handleAddToCart = () => {
    if (isInCart) return;
    if (!onAddToCart) {
      Alert.alert("Cart", "Cart action is not connected.");
      return;
    }

    onAddToCart({
      ...(product || {}),
      id: `${product?.id || details.id}-${selectedSize}-${selectedFlavor}`,
      productId: product?.id || details.id,
      name: displayName,
      image: displayImage,
      selectedFlavor,
      selectedWeight: selectedSizeData.label,
      selectedPrice: price,
      selectedMrp: mrp,
      price,
      mrp,
      rating,
      reviews,
      quantity: 1,
    });
  };

  const handleWishlist = () => {
    const nextValue = !isWishlisted;
    setIsWishlisted(nextValue);

    if (onWishlistPress) {
      onWishlistPress(
        {
          ...(product || {}),
          id: product?.id || details.id,
          name: displayName,
          image: displayImage,
        },
        nextValue,
      );
    } else {
      Alert.alert(
        "Wishlist",
        nextValue
          ? `${displayName} added to your demo wishlist.`
          : `${displayName} removed from your demo wishlist.`,
      );
    }
  };

  const renderAccordion = (title, icon, expanded, onPress, content) => (
    <View style={styles.accordion}>
      <Pressable
        onPress={onPress}
        style={styles.accordionHeader}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <View style={styles.accordionTitleRow}>
          <Ionicons name={icon} size={21} color={DARK_GREEN} />
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={21}
          color={TEXT}
        />
      </Pressable>

      {expanded && <Text style={styles.accordionContent}>{content}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={onBack}
            style={styles.headerButton}
            hitSlop={8}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={27} color={TEXT} />
          </Pressable>

          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/naturyz-home-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Pressable
            onPress={handleWishlist}
            style={styles.headerButton}
            hitSlop={8}
            accessibilityLabel="Add to wishlist"
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={27}
              color={isWishlisted ? "#E53935" : TEXT}
            />
          </Pressable>

          <Pressable
            onPress={onCartPress}
            style={styles.headerButton}
            hitSlop={8}
            accessibilityLabel="Open cart"
          >
            <View>
              <Ionicons name="cart-outline" size={29} color={TEXT} />
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
          {/* PRODUCT IMAGE */}
          <View style={styles.imageSection}>
            <View style={styles.imageDecorTop}>
              <View style={styles.imageTag}>
                <Ionicons name="fitness-outline" size={17} color={DARK_GREEN} />
                <Text style={styles.imageTagText}>Build Muscle</Text>
              </View>
              <View style={styles.imageTag}>
                <Ionicons name="flash-outline" size={17} color={DARK_GREEN} />
                <Text style={styles.imageTagText}>Boost Recovery</Text>
              </View>
              <View style={styles.imageTag}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={17}
                  color={DARK_GREEN}
                />
                <Text style={styles.imageTagText}>Supports Strength</Text>
              </View>
            </View>

            <View style={styles.imageFrame}>
              <Image
                source={displayImage}
                style={styles.productImage}
                resizeMode="contain"
              />
              <View style={styles.imageCount}>
                <Text style={styles.imageCountText}>1 / 1</Text>
              </View>
            </View>

            <View style={styles.galleryDots}>
              <View style={styles.activeDot} />
            </View>
          </View>

          {/* PRODUCT INFORMATION */}
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{displayName}</Text>
            <Text style={styles.subtitle}>{details.subtitle}</Text>

            <View style={styles.ratingLine}>
              <Ionicons name="star" size={18} color="#F5B800" />
              <Text style={styles.ratingText}>{Number(rating).toFixed(1)}</Text>
              <Text style={styles.reviewText}>
                ({Number(reviews).toLocaleString("en-IN")} Reviews)
              </Text>
              <View style={styles.ratingDivider} />
              <Ionicons name="cart-outline" size={17} color={DARK_GREEN} />
              <Text style={styles.boughtText}>{details.bought} Bought</Text>
            </View>

            {/* PRICE */}
            <View style={styles.priceLine}>
              <Text style={styles.currentPrice}>{formatINR(price)}</Text>
              <Text style={styles.oldPrice}>{formatINR(mrp)}</Text>
              <View style={styles.discountPill}>
                <Text style={styles.discountText}>{discount}% Off</Text>
              </View>
            </View>

            <Text style={styles.demoNote}>
              Demo pricing — confirm final prices with the official catalogue.
            </Text>

            {/* FLAVOR */}
            <Text style={styles.sectionTitle}>Flavor</Text>
            <View style={styles.flavorList}>
              {details.flavors.map((flavor) => {
                const active = selectedFlavor === flavor.label;

                return (
                  <Pressable
                    key={flavor.id}
                    onPress={() => setSelectedFlavor(flavor.label)}
                    style={[styles.flavorChip, active && styles.selectedChip]}
                  >
                    <Ionicons
                      name={flavor.icon}
                      size={17}
                      color={active ? DARK_GREEN : MUTED}
                    />
                    <Text
                      style={[
                        styles.flavorText,
                        active && styles.selectedChipText,
                      ]}
                    >
                      {flavor.label}
                    </Text>
                    {active && (
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color={DARK_GREEN}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>

            {/* SIZE */}
            <Text style={styles.sectionTitle}>Select Size</Text>
            <View style={styles.sizeList}>
              {details.sizes.map((size) => {
                const active = selectedSize === size.id;
                const sizeDiscount = getDiscountPercent(size.mrp, size.price);

                return (
                  <Pressable
                    key={size.id}
                    onPress={() => setSelectedSize(size.id)}
                    style={[styles.sizeCard, active && styles.selectedSizeCard]}
                  >
                    <Text
                      style={[
                        styles.sizeLabel,
                        active && styles.selectedChipText,
                      ]}
                    >
                      {size.label}
                    </Text>
                    <Text
                      style={[
                        styles.sizePrice,
                        active && styles.selectedChipText,
                      ]}
                    >
                      {formatINR(size.price)}
                    </Text>
                    {sizeDiscount > 0 && (
                      <Text style={styles.sizeDiscount}>
                        {sizeDiscount}% Off
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>

            {/* FEATURES */}
            <View style={styles.featuresBand}>
              {details.features.map((feature, index) => (
                <View key={feature.title} style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <Ionicons
                      name={feature.icon}
                      size={24}
                      color={DARK_GREEN}
                    />
                  </View>
                  <Text style={styles.featureText}>{feature.title}</Text>
                </View>
              ))}
            </View>

            {/* ACCORDIONS */}
            {renderAccordion(
              "Product Description",
              "document-text-outline",
              descriptionOpen,
              () => setDescriptionOpen((value) => !value),
              details.productDescription,
            )}

            {renderAccordion(
              "Nutritional Information",
              "nutrition-outline",
              nutritionOpen,
              () => setNutritionOpen((value) => !value),
              details.nutritionNote,
            )}
          </View>
        </ScrollView>

        {/* FIXED BOTTOM ACTION BAR */}
        <View style={styles.bottomBar}>
          <Pressable
            onPress={handleWishlist}
            style={({ pressed }) => [
              styles.wishlistAction,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={21}
              color={isWishlisted ? "#E53935" : DARK_GREEN}
            />
            <Text style={styles.wishlistActionText}>Wishlist</Text>
          </Pressable>

          <Pressable
            onPress={handleAddToCart}
            disabled={isInCart}
            style={({ pressed }) => [
              styles.addButton,
              isInCart && { backgroundColor: "#777777", opacity: 0.7 },
              pressed && !isInCart && styles.pressed,
            ]}
          >
            <Ionicons
              name={isInCart ? "checkmark-circle" : "cart-outline"}
              size={21}
              color="#FFFFFF"
            />
            <Text style={styles.addButtonText}>
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </Text>
          </Pressable>
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
  header: {
    height: 68,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  headerButton: {
    width: 39,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    height: 55,
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
    paddingHorizontal: 4,
    backgroundColor: GREEN,
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
    paddingBottom: 18,
  },
  imageSection: {
    backgroundColor: "#FBFDF5",
    paddingTop: 14,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1E9",
  },
  imageDecorTop: {
    position: "absolute",
    zIndex: 2,
    left: 12,
    top: 17,
    gap: 8,
  },
  imageTag: {
    minHeight: 34,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#F0F6DE",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  imageTagText: {
    fontSize: 10,
    color: DARK_GREEN,
    fontWeight: "700",
  },
  imageFrame: {
    height: 310,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  productImage: {
    width: "82%",
    height: "96%",
  },
  imageCount: {
    position: "absolute",
    right: 5,
    bottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: "rgba(30,30,30,0.72)",
  },
  imageCountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  galleryDots: {
    height: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: GREEN,
  },
  productInfo: {
    paddingHorizontal: 17,
    paddingTop: 17,
  },
  productTitle: {
    color: TEXT,
    fontSize: 24,
    fontWeight: "900",
  },
  subtitle: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  ratingLine: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 13,
  },
  ratingText: {
    color: DARK_GREEN,
    fontSize: 13,
    fontWeight: "800",
  },
  reviewText: {
    color: MUTED,
    fontSize: 12,
  },
  ratingDivider: {
    width: 1,
    height: 17,
    backgroundColor: "#DADADA",
    marginHorizontal: 4,
  },
  boughtText: {
    color: TEXT,
    fontSize: 11,
    fontWeight: "700",
  },
  priceLine: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
  },
  currentPrice: {
    color: TEXT,
    fontSize: 25,
    fontWeight: "900",
  },
  oldPrice: {
    color: MUTED,
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  discountPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "#EFF6D9",
  },
  discountText: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "800",
  },
  demoNote: {
    color: MUTED,
    fontSize: 10,
    marginTop: 5,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 10,
  },
  flavorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  flavorChip: {
    minHeight: 40,
    paddingHorizontal: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  selectedChip: {
    borderColor: GREEN,
    backgroundColor: PALE_GREEN,
  },
  flavorText: {
    color: TEXT,
    fontSize: 11,
    fontWeight: "600",
  },
  selectedChipText: {
    color: DARK_GREEN,
    fontWeight: "800",
  },
  sizeList: {
    flexDirection: "row",
    gap: 9,
  },
  sizeCard: {
    flex: 1,
    minHeight: 83,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSizeCard: {
    borderColor: GREEN,
    backgroundColor: PALE_GREEN,
    borderWidth: 1.5,
  },
  sizeLabel: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "800",
  },
  sizePrice: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },
  sizeDiscount: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 3,
  },
  featuresBand: {
    marginTop: 22,
    paddingVertical: 13,
    paddingHorizontal: 5,
    borderRadius: 16,
    backgroundColor: PALE_GREEN,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  featureItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  featureIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    color: TEXT,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 14,
  },
  accordion: {
    marginTop: 13,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  accordionHeader: {
    minHeight: 53,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  accordionTitle: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "800",
  },
  accordionContent: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 19,
    paddingHorizontal: 14,
    paddingBottom: 15,
  },
  bottomBar: {
    minHeight: 72,
    paddingHorizontal: 13,
    paddingTop: 9,
    paddingBottom: 9,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  wishlistAction: {
    flex: 0.9,
    height: 48,
    borderRadius: 25,
    borderWidth: 1.3,
    borderColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  wishlistActionText: {
    color: DARK_GREEN,
    fontSize: 13,
    fontWeight: "800",
  },
  addButton: {
    flex: 1.4,
    height: 49,
    borderRadius: 26,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
