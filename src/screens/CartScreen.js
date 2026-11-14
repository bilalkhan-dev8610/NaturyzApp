// src/screens/CartScreen.js

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
import TopNavbar from "../components/TopNavbar";

const GREEN = "#80AD08";
const DARK_GREEN = "#568600";
const TEXT = "#17191D";
const MUTED = "#777A82";
const PALE = "#F3F8E7";
const BORDER = "#ECEEEA";
const SHIPPING_THRESHOLD = 1999;
const SHIPPING_FEE = 99;

const PRODUCT_IMAGES = {
  whey: require("../../assets/images/naturyz-product-whey-protein.png"),
  creatine: require("../../assets/images/naturyz-product-creatine-x7.png"),
  gainer: require("../../assets/images/naturyz-product-mass-gainer.png"),
};

const formatINR = (amount) =>
  `₹${Math.max(0, Math.round(amount)).toLocaleString("en-IN")}`;

function getProductImage(item) {
  if (item.image) return item.image;

  const name = `${item.name || ""} ${item.productId || ""}`.toLowerCase();

  if (name.includes("creatine")) return PRODUCT_IMAGES.creatine;
  if (name.includes("gainer")) return PRODUCT_IMAGES.gainer;
  return PRODUCT_IMAGES.whey;
}

function getDiscount(item) {
  const price = Number(item.price || 0);
  const mrp = Number(item.mrp || price);
  return Math.max(0, mrp - price);
}

export default function CartScreen({
  items = [],
  onBack,
  onQuantityChange,
  onRemove,
  onToggleSelection,
  onCheckout,
  onWishlistPress,
  onCartPress,
}) {
  const [couponApplied, setCouponApplied] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  const selectedItems = useMemo(
    () => items.filter((item) => item.selected !== false),
    [items]
  );

  const selectedCount = selectedItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const itemTotal = selectedItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const totalMRP = selectedItems.reduce(
    (total, item) =>
      total +
      Number(item.mrp ?? item.price ?? 0) *
        Number(item.quantity || 1),
    0
  );

  const productDiscount = Math.max(0, totalMRP - itemTotal);

  const couponDiscount = couponApplied
    ? Math.min(Math.round(itemTotal * 0.1), 300)
    : 0;

  const shippingFee =
    itemTotal === 0 || itemTotal >= SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;

  const totalAmount = Math.max(
    0,
    itemTotal - couponDiscount + shippingFee
  );

  const amountToFreeShipping = Math.max(
    0,
    SHIPPING_THRESHOLD - itemTotal
  );

  const shippingProgress = Math.min(
    1,
    itemTotal / SHIPPING_THRESHOLD
  );

  const savings = productDiscount + couponDiscount;

  const handleQuantity = (item, nextQuantity) => {
    if (!onQuantityChange) return;

    if (nextQuantity < 1) {
      Alert.alert(
        "Remove Product",
        "Do you want to remove this product from your cart?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => onRemove?.(item.id),
          },
        ]
      );
      return;
    }

    onQuantityChange(item.id, nextQuantity);
  };

  const handleRemove = (item) => {
    Alert.alert(
      "Remove Product",
      `Remove ${item.name || "this product"} from your cart?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => onRemove?.(item.id),
        },
      ]
    );
  };

  const handleApplyCoupon = () => {
    if (couponApplied) {
      setCouponApplied(false);
      Alert.alert("Coupon Removed", "NATURYZ10 coupon has been removed.");
      return;
    }

    if (itemTotal <= 0) {
      Alert.alert("Cart Empty", "Add a product before applying a coupon.");
      return;
    }

    setCouponApplied(true);
    setShowOffers(false);
    Alert.alert(
      "Coupon Applied",
      "Demo coupon NATURYZ10 applied successfully. You saved 10% (up to ₹300)."
    );
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Alert.alert(
        "Select Products",
        "Please select at least one product to continue."
      );
      return;
    }

    onCheckout?.({
      items: selectedItems,
      itemTotal,
      productDiscount,
      couponDiscount,
      shippingFee,
      total: totalAmount,
      savings,
    });
  };

  const renderProduct = (item) => {
    const quantity = Number(item.quantity || 1);
    const selected = item.selected !== false;
    const price = Number(item.price || 0);
    const mrp = Number(item.mrp ?? price);
    const discount = getDiscount(item);
    const discountPercent =
      mrp > 0 ? Math.round((discount / mrp) * 100) : 0;

    return (
      <View key={item.id} style={styles.productCard}>
        {/* SELECTION */}
        <Pressable
          onPress={() => onToggleSelection?.(item.id)}
          style={styles.selectButton}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: selected }}
          accessibilityLabel={`Select ${item.name}`}
        >
          <View
            style={[
              styles.checkbox,
              selected && styles.checkboxSelected,
            ]}
          >
            {selected && (
              <Ionicons name="checkmark" size={17} color="#FFFFFF" />
            )}
          </View>
        </Pressable>

        {/* PRODUCT IMAGE */}
        <View style={styles.productImageBox}>
          <Image
            source={getProductImage(item)}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* PRODUCT DETAILS */}
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name || "NATURYZ Product"}
          </Text>

          <Text style={styles.productSubtitle} numberOfLines={2}>
            {item.subtitle ||
              item.description ||
              "NATURYZ nutritional supplement"}
          </Text>

          <View style={styles.variantRow}>
            {!!(item.flavor || item.flavour) && (
              <View style={styles.variantPill}>
                <Ionicons
                  name="color-palette-outline"
                  size={15}
                  color="#87502B"
                />
                <Text style={styles.variantText} numberOfLines={1}>
                  {item.flavor || item.flavour}
                </Text>
              </View>
            )}

            {!!(item.weight || item.size) && (
              <View style={styles.variantPill}>
                <Ionicons
                  name="scale-outline"
                  size={15}
                  color={DARK_GREEN}
                />
                <Text style={styles.variantText}>
                  {item.weight || item.size}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.productBottomRow}>
            <View style={styles.priceInfo}>
              <View style={styles.itemPriceRow}>
                <Text style={styles.itemPrice}>
                  {formatINR(price)}
                </Text>

                {mrp > price && (
                  <Text style={styles.itemMRP}>
                    {formatINR(mrp)}
                  </Text>
                )}
              </View>

              {discountPercent > 0 && (
                <View style={styles.itemDiscount}>
                  <Text style={styles.itemDiscountText}>
                    {discountPercent}% Off
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.quantityControl}>
              <Pressable
                onPress={() => handleRemove(item)}
                style={styles.quantityButton}
                hitSlop={5}
                accessibilityLabel={`Remove ${item.name}`}
              >
                <Ionicons
                  name="trash-outline"
                  size={19}
                  color={TEXT}
                />
              </Pressable>

              <Text style={styles.quantityText}>{quantity}</Text>

              <Pressable
                onPress={() => handleQuantity(item, quantity + 1)}
                style={styles.quantityButton}
                hitSlop={5}
                accessibilityLabel={`Increase ${item.name} quantity`}
              >
                <Ionicons
                  name="add"
                  size={24}
                  color={DARK_GREEN}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* REUSABLE TOP NAVBAR */}
<TopNavbar
  leftAction="back"
  onLeftPress={onBack}
  onWishlistPress={onWishlistPress}
  onCartPress={onCartPress}
  cartCount={items.length}
  showWishlist={true}
  showCart={true}
  headerBackgroundColor="#FFFFFF"
  iconColor={TEXT}
  headerHeight={66}
  headerBorderColor="#F3F3F3"
  headerBorderWidth={1}
/>

        {/* EMPTY CART */}
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="bag-handle-outline"
              size={75}
              color={GREEN}
            />
            <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Looks like you haven't added anything to your cart yet.
            </Text>
            <Pressable onPress={onBack} style={styles.shopButton}>
              <Text style={styles.shopButtonText}>Continue Shopping</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* TITLE */}
              <View style={styles.titleRow}>
                <Text style={styles.pageTitle}>My Cart</Text>
                <Text style={styles.itemCount}>
                  ({selectedCount} Items)
                </Text>
              </View>

              {/* PRODUCT LIST */}
              <View style={styles.productList}>
                {items.map(renderProduct)}
              </View>

              {/* COUPON */}
              <Pressable
                onPress={() => setShowOffers((value) => !value)}
                style={styles.couponCard}
              >
                <Ionicons
                  name="ticket-outline"
                  size={29}
                  color={DARK_GREEN}
                />

                <Text style={styles.couponTitle}>
                  {couponApplied ? "NATURYZ10 Applied" : "Apply Coupon"}
                </Text>

                <View style={styles.couponRight}>
                  <Text style={styles.viewOffers}>
                    {showOffers ? "Hide Offers" : "View Offers"}
                  </Text>
                  <Ionicons
                    name={showOffers ? "chevron-up" : "chevron-forward"}
                    size={20}
                    color={GREEN}
                  />
                </View>
              </Pressable>

              {/* DEMO COUPON OFFER */}
              {showOffers && (
                <View style={styles.offerCard}>
                  <View style={styles.offerTextContainer}>
                    <Text style={styles.offerCode}>NATURYZ10</Text>
                    <Text style={styles.offerDescription}>
                      Save 10% on your selected items (up to ₹300).
                    </Text>
                    <Text style={styles.demoLabel}>DEMO OFFER</Text>
                  </View>

                  <Pressable
                    onPress={handleApplyCoupon}
                    style={styles.applyButton}
                  >
                    <Text style={styles.applyButtonText}>
                      {couponApplied ? "Remove" : "Apply"}
                    </Text>
                  </Pressable>
                </View>
              )}

              {/* FREE SHIPPING */}
              <View style={styles.shippingCard}>
                <View style={styles.giftIconBox}>
                  <Ionicons
                    name="gift-outline"
                    size={48}
                    color="#C58A15"
                  />
                </View>

                <View style={styles.shippingMiddle}>
                  {amountToFreeShipping > 0 ? (
                    <Text style={styles.shippingTitle}>
                      You're{" "}
                      <Text style={styles.greenText}>
                        {formatINR(amountToFreeShipping)}
                      </Text>{" "}
                      away from{"\n"}
                      <Text style={styles.greenText}>
                        Free Shipping!
                      </Text>
                    </Text>
                  ) : (
                    <Text style={styles.shippingTitle}>
                      Congratulations!{"\n"}
                      <Text style={styles.greenText}>
                        Free Shipping Unlocked!
                      </Text>
                    </Text>
                  )}

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${shippingProgress * 100}%` },
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.shippingIconBox}>
                  <Ionicons
                    name="car-outline"
                    size={31}
                    color={DARK_GREEN}
                  />
                  <Text style={styles.shippingIconText}>
                    {shippingFee === 0 ? "FREE" : "SHIPPING"}
                  </Text>
                </View>
              </View>

              {/* PRICE DETAILS */}
              <View style={styles.priceDetails}>
                <Text style={styles.priceDetailsTitle}>Price Details</Text>

                <View style={styles.priceDetailRow}>
                  <Text style={styles.priceDetailLabel}>
                    Item Total ({selectedCount} Items)
                  </Text>
                  <Text style={styles.priceDetailValue}>
                    {formatINR(itemTotal)}
                  </Text>
                </View>

                <View style={styles.priceDetailRow}>
                  <Text style={styles.priceDetailLabel}>Discount</Text>
                  <Text style={styles.discountValue}>
                    -{formatINR(productDiscount)}
                  </Text>
                </View>

                {couponApplied && (
                  <View style={styles.priceDetailRow}>
                    <Text style={styles.priceDetailLabel}>
                      Coupon Discount
                    </Text>
                    <Text style={styles.discountValue}>
                      -{formatINR(couponDiscount)}
                    </Text>
                  </View>
                )}

                <View style={styles.priceDetailRow}>
                  <Text style={styles.priceDetailLabel}>
                    Delivery Charges
                  </Text>
                  <View style={styles.deliveryValueRow}>
                    {shippingFee === 0 && (
                      <Text style={styles.deliveryOldPrice}>
                        {formatINR(SHIPPING_FEE)}
                      </Text>
                    )}
                    <Text style={styles.discountValue}>
                      {shippingFee === 0 ? "FREE" : formatINR(shippingFee)}
                    </Text>
                  </View>
                </View>

                <View style={styles.dashedDivider} />

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalValue}>
                    {formatINR(totalAmount)}
                  </Text>
                </View>

                {savings > 0 && (
                  <View style={styles.savingsPill}>
                    <Text style={styles.savingsText}>
                      You Save {formatINR(savings)}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* FIXED CHECKOUT BAR */}
            <View style={styles.checkoutBar}>
              <View style={styles.checkoutPrice}>
                <Text style={styles.checkoutTotal}>
                  {formatINR(totalAmount)}
                </Text>
                {totalMRP > itemTotal && (
                  <Text style={styles.checkoutOldPrice}>
                    {formatINR(totalMRP)}
                  </Text>
                )}
              </View>

              <Pressable
                onPress={handleCheckout}
                style={({ pressed }) => [
                  styles.checkoutButton,
                  pressed && styles.pressed,
                  selectedItems.length === 0 && styles.disabledButton,
                ]}
              >
                <Text style={styles.checkoutButtonText}>
                  Proceed to Checkout
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={23}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>
          </>
        )}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 18,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingTop: 19,
    paddingBottom: 16,
    gap: 11,
  },
  pageTitle: {
    color: TEXT,
    fontSize: 27,
    fontWeight: "900",
  },
  itemCount: {
    color: MUTED,
    fontSize: 15,
    fontWeight: "600",
  },
  productList: {
    paddingHorizontal: 13,
    gap: 12,
  },
  productCard: {
    minHeight: 158,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 8,
    elevation: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  selectButton: {
    width: 29,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#A8ACA4",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  productImageBox: {
    width: 94,
    height: 132,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productDetails: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  },
  productName: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "900",
  },
  productSubtitle: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 4,
  },
  variantRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 9,
  },
  variantPill: {
    minHeight: 29,
    maxWidth: "70%",
    paddingHorizontal: 9,
    borderRadius: 18,
    backgroundColor: "#F6F8EF",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  variantText: {
    color: TEXT,
    fontSize: 10,
    fontWeight: "700",
  },
  productBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 11,
  },
  priceInfo: {
    flex: 1,
    minWidth: 0,
  },
  itemPriceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 7,
  },
  itemPrice: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "900",
  },
  itemMRP: {
    color: MUTED,
    fontSize: 11,
    textDecorationLine: "line-through",
  },
  itemDiscount: {
    alignSelf: "flex-start",
    backgroundColor: PALE,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  itemDiscountText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "800",
  },
  quantityControl: {
    minWidth: 91,
    height: 39,
    borderRadius: 22,
    paddingHorizontal: 6,
    backgroundColor: "#F4F8E9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    width: 27,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "800",
  },
  couponCard: {
    minHeight: 64,
    marginHorizontal: 13,
    marginTop: 17,
    paddingHorizontal: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  couponTitle: {
    flex: 1,
    color: TEXT,
    fontSize: 15,
    fontWeight: "800",
  },
  couponRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  viewOffers: {
    color: DARK_GREEN,
    fontSize: 13,
    fontWeight: "800",
  },
  offerCard: {
    marginHorizontal: 13,
    marginTop: 8,
    padding: 13,
    borderRadius: 14,
    backgroundColor: PALE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  offerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  offerCode: {
    color: DARK_GREEN,
    fontSize: 15,
    fontWeight: "900",
  },
  offerDescription: {
    color: TEXT,
    fontSize: 11,
    marginTop: 3,
  },
  demoLabel: {
    color: MUTED,
    fontSize: 9,
    fontWeight: "800",
    marginTop: 4,
  },
  applyButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: GREEN,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  shippingCard: {
    minHeight: 105,
    marginHorizontal: 13,
    marginTop: 17,
    paddingHorizontal: 11,
    paddingVertical: 13,
    borderRadius: 19,
    backgroundColor: "#F3F9E6",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  giftIconBox: {
    width: 58,
    alignItems: "center",
    justifyContent: "center",
  },
  shippingMiddle: {
    flex: 1,
    justifyContent: "center",
  },
  shippingTitle: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 19,
  },
  greenText: {
    color: DARK_GREEN,
    fontWeight: "900",
  },
  progressTrack: {
    height: 9,
    borderRadius: 8,
    backgroundColor: "#DDE5CE",
    overflow: "hidden",
    marginTop: 9,
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
    backgroundColor: GREEN,
  },
  shippingIconBox: {
    width: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  shippingIconText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "900",
    marginTop: 2,
  },
  priceDetails: {
    paddingHorizontal: 17,
    paddingTop: 21,
  },
  priceDetailsTitle: {
    color: TEXT,
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 13,
  },
  priceDetailRow: {
    minHeight: 31,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceDetailLabel: {
    color: MUTED,
    fontSize: 13,
  },
  priceDetailValue: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "700",
  },
  discountValue: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
  },
  deliveryValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deliveryOldPrice: {
    color: MUTED,
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
    borderStyle: "dashed",
    marginTop: 9,
    marginBottom: 13,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    color: TEXT,
    fontSize: 19,
    fontWeight: "900",
  },
  totalValue: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "900",
  },
  savingsPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 17,
    backgroundColor: PALE,
    marginTop: 8,
  },
  savingsText: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "800",
  },
  checkoutBar: {
    minHeight: 78,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: -3 },
  },
  checkoutPrice: {
    minWidth: 95,
  },
  checkoutTotal: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "900",
  },
  checkoutOldPrice: {
    color: MUTED,
    fontSize: 12,
    textDecorationLine: "line-through",
    marginTop: 2,
  },
  checkoutButton: {
    flex: 1,
    minHeight: 51,
    paddingHorizontal: 14,
    borderRadius: 28,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  disabledButton: {
    opacity: 0.5,
  },
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 18,
  },
  emptySubtitle: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },
  shopButton: {
    marginTop: 22,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 25,
    backgroundColor: GREEN,
  },
  shopButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});