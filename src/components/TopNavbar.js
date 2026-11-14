import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#83AE12";

export default function TopNavbar({
  leftAction = "none",
  onLeftPress,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
  headerBackgroundColor = "#FFFFFF",
  iconColor = "#111111",
  showWishlist = true,
  showCart = true,
  showSearch = false,
  searchText = "",
  onSearchTextChange,
  onSearchSubmit,
  onVoiceSearchPress,
  headerHeight = 76,
  headerBorderColor = "transparent",
  headerBorderWidth = 0,
  logoPosition = "left",
}) {
  const leftIcon = leftAction === "menu" ? "menu-outline" : "arrow-back";

  return (
    <View
      style={[styles.container, { backgroundColor: headerBackgroundColor }]}
    >
      {/* TOP HEADER */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: headerBackgroundColor,
            height: headerHeight,
            borderBottomColor: headerBorderColor,
            borderBottomWidth: headerBorderWidth,
          },
        ]}
      >
        {leftAction !== "none" && (
          <Pressable
            style={styles.headerIcon}
            onPress={onLeftPress}
            hitSlop={8}
          >
            <Ionicons
              name={leftIcon}
              size={leftAction === "menu" ? 32 : 38}
              color={iconColor}
            />
          </Pressable>
        )}

        <View
          pointerEvents="none"
          style={[
            styles.logoWrapper,
            logoPosition === "center" && styles.logoWrapperCentered,
          ]}
        >
          <Image
            source={require("../../assets/images/naturyz-home-logo.png")}
            style={[
              styles.logo,
              logoPosition === "center" && styles.logoCentered,
            ]}
            resizeMode="contain"
          />
        </View>

        {showWishlist ? (
          <Pressable
            style={[
  styles.headerIcon,
  logoPosition === "center" && styles.wishlistRight,
]}
            onPress={onWishlistPress}
            hitSlop={8}
          >
            <Ionicons name="heart-outline" size={29} color={iconColor} />
          </Pressable>
        ) : (
          <View style={styles.headerIcon} />
        )}

        {showCart ? (
          <Pressable
            style={styles.headerIcon}
            onPress={onCartPress}
            hitSlop={8}
          >
            <View>
              <Ionicons name="cart-outline" size={31} color={iconColor} />

              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        ) : (
          <View style={styles.headerIcon} />
        )}
      </View>

      {/* OPTIONAL SEARCH BAR */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Pressable onPress={onSearchSubmit}>
              <Ionicons name="search-outline" size={25} color={iconColor} />
            </Pressable>

            <TextInput
              value={searchText}
              onChangeText={onSearchTextChange}
              placeholder="Search for products, categories..."
              placeholderTextColor="#929292"
              style={styles.searchInput}
              returnKeyType="search"
              onSubmitEditing={onSearchSubmit}
            />

            <Pressable onPress={onVoiceSearchPress}>
              <Ionicons name="mic-outline" size={27} color={iconColor} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 76,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  headerIcon: {
    width: 38,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  logoWrapper: {
    flex: 1,
    height: 62,
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 0,
  },
  logoWrapperCentered: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  wishlistRight: {
    position: "absolute",
    right: 53,
    zIndex: 2,
  },

  logo: {
    width: 160,
    height: 60,
  },
  logoCentered: {
    width: 160,
    height: 60,
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

  searchContainer: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 13,
    backgroundColor: "#FFFFFF",
  },

  searchBox: {
    height: 53,
    borderWidth: 1.4,
    borderColor: "#E2E2E2",
    borderRadius: 32,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },

  searchInput: {
    flex: 1,
    color: "#252525",
    fontSize: 14,
    marginLeft: 12,
    marginRight: 8,
    paddingVertical: 0,
  },
});
