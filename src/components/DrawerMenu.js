import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.84, 340);

const GREEN = "#78A900";
const DARK_GREEN = "#578800";

const MENU_GROUPS = [
  {
    title: "SHOP",
    items: [
      { id: "home", label: "Home", icon: "home-outline" },
      { id: "categories", label: "Shop by Categories", icon: "grid-outline" },
      {
        id: "sportsNutrition",
        label: "Sports & Nutrition",
        icon: "fitness-outline",
      },
    ],
  },
  {
    title: "MY ACCOUNT",
    items: [
      { id: "orders", label: "My Orders", icon: "cube-outline" },
      { id: "wishlist", label: "My Wishlist", icon: "heart-outline" },
      { id: "cart", label: "My Cart", icon: "cart-outline" },
      { id: "profile", label: "My Profile", icon: "person-outline" },
      {
        id: "addresses",
        label: "Saved Addresses",
        icon: "location-outline",
      },
    ],
  },
  {
    title: "INFORMATION",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        icon: "notifications-outline",
      },
      {
        id: "helpSupport",
        label: "Help & Support",
        icon: "headset-outline",
      },
      {
        id: "aboutNaturyz",
        label: "About NATURYZ",
        icon: "information-circle-outline",
      },
      {
        id: "privacy",
        label: "Privacy Policy",
        icon: "shield-checkmark-outline",
      },
      {
        id: "terms",
        label: "Terms & Conditions",
        icon: "document-text-outline",
      },
    ],
  },
];

export default function DrawerMenu({
  visible,
  onClose,
  onNavigate,
  profile,
  profileImage,
  cartCount = 0,
  wishlistCount = 0,
}) {
  const translateX = useRef(
    new Animated.Value(-DRAWER_WIDTH)
  ).current;

  useEffect(() => {
    if (visible) {
      translateX.setValue(-DRAWER_WIDTH);

      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        speed: 20,
        bounciness: 3,
      }).start();
    }
  }, [visible, translateX]);

  const handleNavigate = (id) => {
    onClose?.();
    onNavigate?.(id);
  };

  const displayName = profile?.name?.trim() || "Your Name";

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "YN";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <StatusBar
        backgroundColor="rgba(0,0,0,0.38)"
        barStyle="dark-content"
      />

      <View style={styles.overlay}>
        {/* Background Overlay */}
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />

        {/* Drawer */}
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarInitials}>
                    {initials}
                  </Text>
                )}
              </View>

              <View style={styles.profileText}>
                <Text style={styles.welcome}>
                  WELCOME
                </Text>

                <Text
                  style={styles.name}
                  numberOfLines={1}
                >
                  {displayName}
                </Text>

                <Text
                  style={styles.email}
                  numberOfLines={1}
                >
                  {profile?.email || "Your NATURYZ account"}
                </Text>
              </View>

              <Pressable
                onPress={onClose}
                hitSlop={12}
                style={styles.closeButton}
              >
                <Ionicons
                  name="close"
                  size={25}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>

            {/* Cart & Wishlist Count */}
            <View style={styles.accountStats}>
              <Text style={styles.statText}>
                {cartCount} Cart Items
              </Text>

              <View style={styles.statDivider} />

              <Text style={styles.statText}>
                {wishlistCount} Wishlist
              </Text>
            </View>
          </View>

          {/* Menu Items */}
          <ScrollView
            style={styles.menuScroll}
            contentContainerStyle={styles.menuContent}
            showsVerticalScrollIndicator={false}
          >
            {MENU_GROUPS.map((group) => (
              <View
                key={group.title}
                style={styles.group}
              >
                <Text style={styles.groupTitle}>
                  {group.title}
                </Text>

                {group.items.map((item) => (
                  <Pressable
                    key={item.id}
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => handleNavigate(item.id)}
                  >
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={DARK_GREEN}
                    />

                    <Text style={styles.menuLabel}>
                      {item.label}
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={19}
                      color="#9A9A9A"
                    />
                  </Pressable>
                ))}
              </View>
            ))}

            <Text style={styles.footer}>
              Healthy Transformations Made Easy
            </Text>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.42)",
  },

  drawer: {
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "#FFFFFF",
    elevation: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: {
      width: 4,
      height: 0,
    },
  },

  profileHeader: {
    backgroundColor: GREEN,
    paddingTop: 58,
    paddingHorizontal: 18,
    paddingBottom: 17,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.85)",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  avatarInitials: {
    color: DARK_GREEN,
    fontSize: 21,
    fontWeight: "800",
  },

  profileText: {
    flex: 1,
    marginLeft: 12,
  },

  welcome: {
    color: "#F1F8E5",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 3,
  },

  email: {
    color: "#F4F8EB",
    fontSize: 11,
    marginTop: 3,
  },

  closeButton: {
    padding: 5,
    marginLeft: 5,
    alignSelf: "flex-start",
  },

  accountStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.28)",
  },

  statText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  statDivider: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 15,
  },

  menuScroll: {
    flex: 1,
  },

  menuContent: {
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 25,
  },

  group: {
    marginBottom: 13,
  },

  groupTitle: {
    color: GREEN,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 5,
    marginLeft: 4,
    marginTop: 4,
  },

  menuItem: {
    minHeight: 47,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  menuLabel: {
    flex: 1,
    marginLeft: 13,
    color: "#242424",
    fontSize: 14,
    fontWeight: "600",
  },

  pressed: {
    backgroundColor: "#F3F8E9",
  },

  footer: {
    textAlign: "center",
    color: "#929292",
    fontSize: 10,
    marginTop: 8,
    marginBottom: 8,
  },
});