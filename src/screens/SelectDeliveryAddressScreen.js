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
const PALE_GREEN = "#F2F8E5";

export default function SelectDeliveryAddressScreen({
  onBack,
  addresses = [],
  selectedAddressId,
  onSelectAddress,
  onEditAddress,
  onDeliverHere,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
}) {
  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId,
  );

  const getAddressText = (address) => {
    return (
      [
        address.houseNo,
        address.addressLine1,
        address.addressLine2,
        address.landmark,
        address.area,
        address.city,
        address.state,
        address.pincode,
      ]
        .filter(Boolean)
        .join(", ") ||
      address.fullAddress ||
      "Address details unavailable"
    );
  };

  const getAddressIcon = (type) => {
    switch ((type || "").toLowerCase()) {
      case "home":
        return "home-outline";
      case "work":
      case "office":
        return "briefcase-outline";
      default:
        return "location-outline";
    }
  };

  const renderAddressCard = (address) => {
    const isSelected = selectedAddressId === address.id;

    return (
      <Pressable
        key={String(address.id)}
        onPress={() => onSelectAddress?.(address.id)}
        style={[
          styles.addressCard,
          isSelected && styles.selectedAddressCard,
        ]}
      >
        <View style={styles.cardMain}>
          <View style={styles.addressTypeIcon}>
            <Ionicons
              name={getAddressIcon(address.type)}
              size={35}
              color={DARK_GREEN}
            />
          </View>

          <View style={styles.addressDetails}>
            <View style={styles.addressTitleRow}>
              <Text style={styles.addressType}>
                {address.type || "Other"}
              </Text>

              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </View>

            {!!address.name && (
              <Text style={styles.personName}>{address.name}</Text>
            )}

            <Text style={styles.addressText}>
              {getAddressText(address)}
            </Text>

            {!!address.phone && (
              <View style={styles.phoneRow}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={MUTED}
                />
                <Text style={styles.phoneText}>{address.phone}</Text>
              </View>
            )}
          </View>

          <View style={styles.radioButton}>
            <View style={styles.radioOuter}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
          </View>
        </View>

        <View style={styles.cardDivider} />

        <Pressable
          style={styles.editButton}
          onPress={() => onEditAddress?.(address)}
          hitSlop={8}
        >
          <Ionicons
            name="pencil-outline"
            size={20}
            color={DARK_GREEN}
          />
          <Text style={styles.editText}>Edit Address</Text>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={onBack}
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={30} color="#111111" />
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
            hitSlop={8}
          >
            <Ionicons name="heart-outline" size={28} color="#111111" />
          </Pressable>

          <Pressable
            style={styles.headerButton}
            onPress={onCartPress}
            hitSlop={8}
          >
            <View>
              <Ionicons name="cart-outline" size={30} color="#111111" />

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

        {/* CHECKOUT CONTENT */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>Select Delivery Address</Text>
            <Text style={styles.pageSubtitle}>
              Choose where you want your order delivered
            </Text>
          </View>

          {/* CHECKOUT STEPPER */}
          <View style={styles.stepper}>
            <View style={styles.stepItem}>
              <View style={styles.completedStep}>
                <Ionicons name="checkmark" size={17} color="#FFFFFF" />
              </View>
              <Text style={styles.completedStepText}>Cart</Text>
            </View>

            <View style={styles.activeLine} />

            <View style={styles.stepItem}>
              <View style={styles.activeStep}>
                <Ionicons name="location" size={17} color="#FFFFFF" />
              </View>
              <Text style={styles.activeStepText}>Address</Text>
            </View>

            <View style={styles.inactiveLine} />

            <View style={styles.stepItem}>
              <View style={styles.inactiveStep}>
                <Ionicons name="card-outline" size={17} color="#929292" />
              </View>
              <Text style={styles.inactiveStepText}>Payment</Text>
            </View>

            <View style={styles.inactiveLine} />

            <View style={styles.stepItem}>
              <View style={styles.inactiveStep}>
                <Ionicons name="checkmark-done-outline" size={17} color="#929292" />
              </View>
              <Text style={styles.inactiveStepText}>Order</Text>
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            <Text style={styles.addressCount}>
              {addresses.length} {addresses.length === 1 ? "Address" : "Addresses"}
            </Text>
          </View>

          {addresses.length > 0 ? (
            <View style={styles.addressList}>
              {addresses.map(renderAddressCard)}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons
                  name="location-outline"
                  size={46}
                  color={GREEN}
                />
              </View>

              <Text style={styles.emptyTitle}>No Saved Addresses</Text>
              <Text style={styles.emptySubtitle}>
                You don't have any saved delivery addresses yet.
                Please add an address from your profile.
              </Text>
            </View>
          )}

          <View style={styles.deliveryInfo}>
            <View style={styles.deliveryIcon}>
              <Ionicons
                name="car-outline"
                size={29}
                color={DARK_GREEN}
              />
            </View>

            <View style={styles.deliveryInfoText}>
              <Text style={styles.deliveryTitle}>
                Fast & Reliable Delivery
              </Text>
              <Text style={styles.deliverySubtitle}>
                Get your order delivered in 2–5 business days.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* STICKY BOTTOM BUTTON */}
        <View style={styles.bottomContainer}>
          <View style={styles.selectedAddressInfo}>
            <Ionicons
              name="location-outline"
              size={19}
              color={DARK_GREEN}
            />
            <Text style={styles.selectedAddressLabel} numberOfLines={1}>
              {selectedAddress
                ? `Deliver to: ${selectedAddress.type || "Selected Address"}`
                : "Please select a delivery address"}
            </Text>
          </View>

          <Pressable
            disabled={!selectedAddress}
            onPress={() => onDeliverHere?.(selectedAddress)}
            style={({ pressed }) => [
              styles.deliverButton,
              !selectedAddress && styles.disabledButton,
              pressed && selectedAddress && styles.buttonPressed,
            ]}
          >
            <Text style={styles.deliverButtonText}>Deliver Here</Text>
            <Ionicons
              name="arrow-forward"
              size={22}
              color="#FFFFFF"
            />
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
    height: 64,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
  },
  headerButton: {
    width: 37,
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
    paddingBottom: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 17,
  },
  pageTitle: {
    color: TEXT,
    fontSize: 26,
    fontWeight: "900",
  },
  pageSubtitle: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#FAFCF5",
  },
  stepItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 49,
    gap: 5,
  },
  completedStep: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  activeStep: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#DDEDBD",
  },
  inactiveStep: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  completedStepText: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "800",
  },
  activeStepText: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "900",
  },
  inactiveStepText: {
    color: "#929292",
    fontSize: 11,
    fontWeight: "600",
  },
  activeLine: {
    height: 2,
    flex: 1,
    backgroundColor: GREEN,
    marginHorizontal: 3,
    marginBottom: 17,
  },
  inactiveLine: {
    height: 2,
    flex: 1,
    backgroundColor: "#DCDCDC",
    marginHorizontal: 3,
    marginBottom: 17,
  },
  sectionHeading: {
    paddingHorizontal: 19,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "900",
  },
  addressCount: {
    color: MUTED,
    fontSize: 12,
    fontWeight: "600",
  },
  addressList: {
    paddingHorizontal: 13,
    gap: 15,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingTop: 15,
    paddingBottom: 9,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedAddressCard: {
    borderColor: GREEN,
    borderWidth: 1.5,
    backgroundColor: "#FEFFF9",
  },
  cardMain: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
  },
  addressTypeIcon: {
    width: 59,
    height: 59,
    borderRadius: 17,
    backgroundColor: PALE_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  addressDetails: {
    flex: 1,
    paddingTop: 1,
  },
  addressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 6,
  },
  addressType: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "900",
  },
  defaultBadge: {
    backgroundColor: GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 18,
  },
  defaultBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  personName: {
    color: MUTED,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 3,
  },
  addressText: {
    color: "#454957",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: 11,
    marginBottom: 10,
  },
  phoneText: {
    color: "#454957",
    fontSize: 14,
    fontWeight: "600",
  },
  radioButton: {
    padding: 3,
    marginTop: 1,
  },
  radioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#777D88",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: GREEN,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#E1E2E3",
    marginTop: 4,
    marginBottom: 7,
  },
  editButton: {
    minHeight: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  editText: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 45,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: PALE_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 15,
  },
  emptySubtitle: {
    color: MUTED,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 7,
  },
  deliveryInfo: {
    marginHorizontal: 14,
    marginTop: 20,
    padding: 13,
    borderRadius: 15,
    backgroundColor: PALE_GREEN,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deliveryIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryInfoText: {
    flex: 1,
  },
  deliveryTitle: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "900",
  },
  deliverySubtitle: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },
  bottomContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  selectedAddressInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 9,
  },
  selectedAddressLabel: {
    flex: 1,
    color: MUTED,
    fontSize: 12,
    fontWeight: "600",
  },
  deliverButton: {
    minHeight: 55,
    borderRadius: 16,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  disabledButton: {
    backgroundColor: "#B8C69A",
  },
  deliverButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  buttonPressed: {
    opacity: 0.82,
  },
});