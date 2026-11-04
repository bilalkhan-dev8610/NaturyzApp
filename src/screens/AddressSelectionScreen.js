
import React from "react";
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

const GREEN = "#78A900";
const DARK_GREEN = "#578800";
const TEXT = "#151515";
const MUTED = "#555966";
const BORDER = "#E9E9ED";
const PALE_GREEN = "#F2F8E5";

export default function AddressSelectionScreen({
  onBack,
  addresses = [],
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress,
  onEditAddress,
  onDeleteAddress,
  onDeliverHere,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
}) {
  const getAddressText = (address) => {
    return [
      address.houseNo,
      address.addressLine1,
      address.addressLine2,
      address.area,
      address.city,
      address.state,
      address.pincode,
    ]
      .filter(Boolean)
      .join(", ");
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

  const handleRemove = (address) => {
    Alert.alert(
      "Remove Address",
      `Are you sure you want to remove your ${address.type || "saved"} address?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => onDeleteAddress?.(address.id),
        },
      ],
    );
  };

  const renderAddressCard = (address) => {
    const isSelected = selectedAddressId === address.id;
    const isDefault = Boolean(address.isDefault);

    return (
      <View
        key={String(address.id)}
        style={[
          styles.addressCard,
          isSelected && styles.selectedAddressCard,
        ]}
      >
        <View style={styles.cardMain}>
          <View style={styles.addressTypeIcon}>
            <Ionicons
              name={getAddressIcon(address.type)}
              size={36}
              color={DARK_GREEN}
            />
          </View>

          <View style={styles.addressDetails}>
            <View style={styles.addressTitleRow}>
              <Text style={styles.addressType}>
                {address.type || "Other"}
              </Text>

              {isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </View>

            {!!address.name && (
              <Text style={styles.personName}>{address.name}</Text>
            )}

            <Text style={styles.addressText}>
              {getAddressText(address) || address.fullAddress || "Address details unavailable"}
            </Text>

            {!!address.phone && (
              <View style={styles.phoneRow}>
                <Ionicons
                  name="call-outline"
                  size={21}
                  color={MUTED}
                />
                <Text style={styles.phoneText}>{address.phone}</Text>
              </View>
            )}
          </View>

          <Pressable
            onPress={() => onSelectAddress?.(address.id)}
            style={styles.radioButton}
            hitSlop={10}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
          >
            <View style={styles.radioOuter}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
          </Pressable>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.cardActions}>
          <Pressable
            style={styles.actionButton}
            onPress={() => onEditAddress?.(address)}
          >
            <Ionicons name="pencil-outline" size={23} color={DARK_GREEN} />
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>

          <View style={styles.actionDivider} />

          <Pressable
            style={styles.actionButton}
            onPress={() => handleRemove(address)}
          >
            <Ionicons name="trash-outline" size={24} color={DARK_GREEN} />
            <Text style={styles.actionText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={onBack}
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
            style={styles.headerButton}
            onPress={onWishlistPress}
            hitSlop={8}
          >
            <Ionicons name="heart-outline" size={29} color="#111111" />
          </Pressable>

          <Pressable
            style={styles.headerButton}
            onPress={onCartPress}
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
          {/* TITLE */}
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>Saved Addresses</Text>
            <Text style={styles.pageSubtitle}>
              Manage your delivery addresses
            </Text>
          </View>

          {/* ADDRESS LIST */}
          {addresses.length > 0 ? (
            <View style={styles.addressList}>
              {addresses.map(renderAddressCard)}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons
                  name="location-outline"
                  size={48}
                  color={GREEN}
                />
              </View>

              <Text style={styles.emptyTitle}>No Saved Addresses</Text>

              <Text style={styles.emptySubtitle}>
                Add your delivery address to make your checkout easier.
              </Text>
            </View>
          )}

          {/* ADD ADDRESS BUTTON */}
          <Pressable
            style={({ pressed }) => [
              styles.addAddressButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onAddNewAddress}
          >
            <Ionicons name="add" size={31} color="#FFFFFF" />
            <Text style={styles.addAddressText}>Add New Address</Text>
          </Pressable>
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
    height: 66,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
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
    paddingBottom: 30,
  },
  titleContainer: {
    paddingHorizontal: 19,
    paddingTop: 21,
    paddingBottom: 24,
  },
  pageTitle: {
    color: TEXT,
    fontSize: 28,
    fontWeight: "900",
  },
  pageSubtitle: {
    color: MUTED,
    fontSize: 17,
    marginTop: 7,
  },
  addressList: {
    paddingHorizontal: 13,
    gap: 17,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingTop: 16,
    paddingBottom: 12,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.07,
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
    gap: 12,
  },
  addressTypeIcon: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: PALE_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  addressDetails: {
    flex: 1,
    paddingTop: 2,
  },
  addressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 7,
  },
  addressType: {
    color: TEXT,
    fontSize: 23,
    fontWeight: "900",
  },
  defaultBadge: {
    backgroundColor: GREEN,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  defaultBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  personName: {
    color: MUTED,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
  },
  addressText: {
    color: "#454957",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    marginBottom: 12,
  },
  phoneText: {
    color: "#454957",
    fontSize: 15,
    fontWeight: "600",
  },
  radioButton: {
    padding: 3,
    marginTop: 1,
  },
  radioOuter: {
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#777D88",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: GREEN,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#DEDFE2",
    marginTop: 5,
    marginBottom: 10,
  },
  cardActions: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingVertical: 5,
  },
  actionText: {
    color: DARK_GREEN,
    fontSize: 16,
    fontWeight: "900",
  },
  actionDivider: {
    width: 1,
    height: 35,
    backgroundColor: "#D8D9D7",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 55,
  },
  emptyIconCircle: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: PALE_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 17,
  },
  emptySubtitle: {
    color: MUTED,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 8,
  },
  addAddressButton: {
    marginHorizontal: 14,
    marginTop: 27,
    minHeight: 65,
    borderRadius: 19,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  addAddressText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
  },
  buttonPressed: {
    opacity: 0.82,
  },
});
