
import React, { useState } from "react";
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

const GREEN = "#80AD08";
const DARK_GREEN = "#568600";
const TEXT = "#17191D";
const MUTED = "#777A82";
const PALE = "#F3F8E7";
const BORDER = "#ECEEEA";

const PAYMENT_METHODS = [
  {
    id: "upi",
    title: "Pay via UPI",
    subtitle: "Google Pay, PhonePe, Paytm & more",
    icon: "phone-portrait-outline",
    recommended: true,
    apps: ["Google Pay", "PhonePe", "Paytm", "BHIM"],
  },
  {
    id: "card",
    title: "Debit / Credit Card",
    subtitle: "Visa, Mastercard, RuPay & more",
    icon: "card-outline",
  },
  {
    id: "netbanking",
    title: "Net Banking",
    subtitle: "All major banks supported",
    icon: "business-outline",
  },
  {
    id: "cod",
    title: "Pay on Delivery (COD)",
    subtitle: "Pay in cash when your order is delivered",
    icon: "cube-outline",
  },
  {
    id: "emi",
    title: "EMI",
    subtitle: "No Cost EMI on select cards",
    icon: "calendar-outline",
  },
  {
    id: "wallet",
    title: "Wallets",
    subtitle: "Paytm Wallet, Amazon Pay & more",
    icon: "wallet-outline",
  },
];

const formatINR = (amount) =>
  `₹${Math.max(0, Math.round(Number(amount) || 0)).toLocaleString("en-IN")}`;

export default function PaymentScreen({
  onBack,
  onChangeAddress,
  deliveryAddress,
  order = {},
  selectedPaymentMethod,
  onSelectPaymentMethod,
  onPlaceOrder,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
}) {
  const [paymentMethod, setPaymentMethod] = useState(
    selectedPaymentMethod || "upi",
  );
  const [showPriceDetails, setShowPriceDetails] = useState(false);

  const total = Number(order.total || 0);
  const itemTotal = Number(order.itemTotal || 0);
  const productDiscount = Number(order.productDiscount || 0);
  const couponDiscount = Number(order.couponDiscount || 0);
  const shippingFee = Number(order.shippingFee || 0);
  const savings = Number(order.savings || 0);

  const handlePaymentSelection = (methodId) => {
    setPaymentMethod(methodId);
    onSelectPaymentMethod?.(methodId);
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      Alert.alert(
        "Delivery Address Required",
        "Please select a delivery address before placing your order.",
      );
      return;
    }

    if (!paymentMethod) {
      Alert.alert(
        "Select Payment Method",
        "Please choose a payment method to continue.",
      );
      return;
    }

    if (total <= 0 || !order.items?.length) {
      Alert.alert(
        "Invalid Order",
        "Your order details are missing. Please return to your cart.",
      );
      return;
    }

    if (paymentMethod !== "cod") {
      Alert.alert(
        "Payment Gateway Required",
        "Online payment will be enabled after the official payment gateway is integrated. You can select Pay on Delivery for the demo checkout.",
      );
      return;
    }

    onPlaceOrder?.({
      order,
      address: deliveryAddress,
      paymentMethod,
    });
  };

  const renderProgressStep = (label, icon, status, isLast = false) => (
    <View style={styles.progressStep} key={label}>
      <View style={styles.progressStepContent}>
        <View
          style={[
            styles.progressCircle,
            status === "completed" && styles.completedCircle,
            status === "active" && styles.activeCircle,
          ]}
        >
          <Ionicons
            name={icon}
            size={22}
            color={
              status === "pending"
                ? "#A5A7AD"
                : status === "active"
                  ? "#FFFFFF"
                  : "#FFFFFF"
            }
          />
        </View>
        <Text
          style={[
            styles.progressLabel,
            status === "completed" && styles.completedLabel,
            status === "active" && styles.activeLabel,
            status === "pending" && styles.pendingLabel,
          ]}
        >
          {label}
        </Text>
      </View>

      {!isLast && (
        <View
          style={[
            styles.progressLine,
            status !== "pending" && styles.progressLineActive,
          ]}
        />
      )}
    </View>
  );

  const renderPaymentMethod = (method) => {
    const isSelected = paymentMethod === method.id;

    return (
      <Pressable
        key={method.id}
        onPress={() => handlePaymentSelection(method.id)}
        style={[
          styles.paymentCard,
          isSelected && styles.paymentCardSelected,
        ]}
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
      >
        <View style={styles.radioOuter}>
          {isSelected && <View style={styles.radioInner} />}
        </View>

        <View style={styles.paymentIconBox}>
          <Ionicons name={method.icon} size={35} color={TEXT} />
        </View>

        <View style={styles.paymentInfo}>
          <View style={styles.paymentTitleRow}>
            <Text style={styles.paymentTitle}>{method.title}</Text>
            {method.recommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>Recommended</Text>
              </View>
            )}
          </View>

          <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>

          {method.apps && (
            <View style={styles.appList}>
              {method.apps.map((app) => (
                <View key={app} style={styles.appChip}>
                  <Text style={styles.appChipText}>{app}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <Ionicons
          name="chevron-forward"
          size={23}
          color="#111111"
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={onBack}
            style={styles.headerButton}
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={31} color="#111111" />
          </Pressable>

          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/naturyz-home-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Pressable
            onPress={onWishlistPress}
            style={styles.headerButton}
            hitSlop={8}
          >
            <Ionicons name="heart-outline" size={29} color="#111111" />
          </Pressable>

          <Pressable
            onPress={onCartPress}
            style={styles.headerButton}
            hitSlop={8}
          >
            <View>
              <Ionicons name="cart-outline" size={31} color="#111111" />
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
          <Text style={styles.pageTitle}>Choose Payment Method</Text>

          {/* CHECKOUT PROGRESS */}
          <View style={styles.progressContainer}>
            {renderProgressStep("Cart", "checkmark", "completed")}
            {renderProgressStep("Address", "location-outline", "completed")}
            {renderProgressStep("Payment", "card-outline", "active")}
            {renderProgressStep("Order", "checkmark", "pending", true)}
          </View>

          {/* DELIVERY ADDRESS */}
          <View style={styles.addressCard}>
            <Ionicons
              name="location-outline"
              size={35}
              color={DARK_GREEN}
            />

            <View style={styles.addressInfo}>
              <Text style={styles.deliverTo}>
                Deliver to: {deliveryAddress?.name || "Selected Customer"}
              </Text>

              <Text style={styles.addressText}>
                {deliveryAddress
                  ? [
                      deliveryAddress.houseNo,
                      deliveryAddress.addressLine1,
                      deliveryAddress.addressLine2,
                      deliveryAddress.area,
                      deliveryAddress.city,
                      deliveryAddress.state,
                      deliveryAddress.pincode,
                    ]
                      .filter(Boolean)
                      .join(", ")
                  : "No delivery address selected"}
              </Text>
            </View>

            <Pressable
              style={styles.changeButton}
              onPress={onChangeAddress}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </Pressable>
          </View>

          {/* PAYMENT METHODS */}
          <Text style={styles.sectionTitle}>Select Payment Method</Text>

          <View style={styles.paymentList}>
            {PAYMENT_METHODS.map(renderPaymentMethod)}
          </View>

          {/* SECURITY BANNER */}
          <View style={styles.securityBanner}>
            <Ionicons
              name="shield-checkmark-outline"
              size={49}
              color={DARK_GREEN}
            />

            <View style={styles.securityInfo}>
              <Text style={styles.securityTitle}>
                100% Secure Payments
              </Text>
              <Text style={styles.securitySubtitle}>
                Your payment information is safe and encrypted.
              </Text>
            </View>

            <Ionicons
              name="lock-closed-outline"
              size={43}
              color={DARK_GREEN}
            />
          </View>

          {/* PRICE DETAILS */}
          <View style={styles.priceDetails}>
            <Pressable
              style={styles.priceDetailsHeader}
              onPress={() => setShowPriceDetails(!showPriceDetails)}
            >
              <Text style={styles.priceDetailsTitle}>Price Details</Text>
              <Ionicons
                name={showPriceDetails ? "chevron-up" : "chevron-down"}
                size={21}
                color={DARK_GREEN}
              />
            </Pressable>

            {showPriceDetails && (
              <View style={styles.priceRows}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Item Total</Text>
                  <Text style={styles.priceValue}>
                    {formatINR(itemTotal)}
                  </Text>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Product Discount</Text>
                  <Text style={styles.discountValue}>
                    -{formatINR(productDiscount)}
                  </Text>
                </View>

                {couponDiscount > 0 && (
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Coupon Discount</Text>
                    <Text style={styles.discountValue}>
                      -{formatINR(couponDiscount)}
                    </Text>
                  </View>
                )}

                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Delivery Charges</Text>
                  <Text style={styles.priceValue}>
                    {shippingFee === 0 ? "FREE" : formatINR(shippingFee)}
                  </Text>
                </View>

                <View style={styles.priceDivider} />

                <View style={styles.priceRow}>
                  <Text style={styles.finalTotalLabel}>Total Amount</Text>
                  <Text style={styles.finalTotalValue}>
                    {formatINR(total)}
                  </Text>
                </View>

                {savings > 0 && (
                  <Text style={styles.savingsText}>
                    You save {formatINR(savings)}
                  </Text>
                )}
              </View>
            )}
          </View>
        </ScrollView>

        {/* FIXED BOTTOM BAR */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomPrice}>
            <Text style={styles.bottomTotal}>{formatINR(total)}</Text>

            <Pressable
              style={styles.viewDetailsButton}
              onPress={() => setShowPriceDetails(!showPriceDetails)}
            >
              <Text style={styles.viewDetailsText}>
                View Price Details
              </Text>
              <Ionicons
                name={showPriceDetails ? "chevron-up" : "chevron-down"}
                size={19}
                color={DARK_GREEN}
              />
            </Pressable>
          </View>

          <View style={styles.bottomDivider} />

          <Pressable
            onPress={handlePlaceOrder}
            style={({ pressed }) => [
              styles.placeOrderButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
            <Ionicons name="arrow-forward" size={25} color="#FFFFFF" />
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
    height: 66,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  headerButton: {
    width: 38,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    height: 54,
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
  pageTitle: {
    color: "#111111",
    fontSize: 27,
    fontWeight: "900",
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 18,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 13,
    marginBottom: 35,
  },
  progressStep: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  progressStepContent: {
    alignItems: "center",
    minWidth: 53,
  },
  progressCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#D5D6DA",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  completedCircle: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  activeCircle: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  progressLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
  },
  completedLabel: {
    color: DARK_GREEN,
  },
  activeLabel: {
    color: TEXT,
  },
  pendingLabel: {
    color: "#92949B",
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: "#D9D9DD",
    marginTop: 19,
    marginHorizontal: 4,
    borderRadius: 3,
  },
  progressLineActive: {
    backgroundColor: GREEN,
  },
  addressCard: {
    marginHorizontal: 14,
    marginBottom: 25,
    padding: 15,
    borderRadius: 19,
    backgroundColor: PALE,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addressInfo: {
    flex: 1,
  },
  deliverTo: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 5,
  },
  addressText: {
    color: "#50535C",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },
  changeButton: {
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  changeButtonText: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "900",
    marginHorizontal: 17,
    marginBottom: 17,
  },
  paymentList: {
    paddingHorizontal: 13,
    gap: 11,
  },
  paymentCard: {
    minHeight: 91,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 13,
    gap: 10,
    elevation: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  paymentCardSelected: {
    borderColor: GREEN,
    borderWidth: 1.6,
    backgroundColor: "#FEFFF9",
  },
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#858991",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: GREEN,
  },
  paymentIconBox: {
    width: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  paymentTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "900",
  },
  paymentSubtitle: {
    color: "#565A64",
    fontSize: 13,
    marginTop: 3,
    lineHeight: 19,
  },
  recommendedBadge: {
    backgroundColor: "#EEF6D9",
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  recommendedText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "800",
  },
  appList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 9,
  },
  appChip: {
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  appChipText: {
    color: "#30333A",
    fontSize: 10,
    fontWeight: "700",
  },
  securityBanner: {
    marginHorizontal: 14,
    marginTop: 30,
    marginBottom: 25,
    borderRadius: 19,
    backgroundColor: PALE,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  securityInfo: {
    flex: 1,
  },
  securityTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "900",
  },
  securitySubtitle: {
    color: "#555963",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  priceDetails: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 15,
    padding: 14,
    marginBottom: 15,
  },
  priceDetailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceDetailsTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "900",
  },
  priceRows: {
    marginTop: 13,
    gap: 11,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    color: MUTED,
    fontSize: 14,
  },
  priceValue: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "700",
  },
  discountValue: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "700",
  },
  priceDivider: {
    height: 1,
    backgroundColor: BORDER,
  },
  finalTotalLabel: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "900",
  },
  finalTotalValue: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "900",
  },
  savingsText: {
    color: DARK_GREEN,
    fontSize: 13,
    fontWeight: "800",
  },
  bottomBar: {
    minHeight: 91,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -3 },
  },
  bottomPrice: {
    flex: 1,
    justifyContent: "center",
  },
  bottomTotal: {
    color: TEXT,
    fontSize: 24,
    fontWeight: "900",
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 4,
  },
  viewDetailsText: {
    color: DARK_GREEN,
    fontSize: 13,
    fontWeight: "800",
  },
  bottomDivider: {
    width: 1,
    height: 54,
    backgroundColor: "#E5E5E5",
  },
  placeOrderButton: {
    flex: 1.15,
    minHeight: 58,
    borderRadius: 17,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  placeOrderText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  buttonPressed: {
    opacity: 0.82,
  },
});
