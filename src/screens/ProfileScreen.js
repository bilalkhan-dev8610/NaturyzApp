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
import { ordersData } from "../data/ordersData";
import * as ImagePicker from "expo-image-picker";
import BottomTabBar from "../components/BottomTabBar";
import TopNavbar from "../components/TopNavbar";


const GREEN = "#78A900";
const DARK_GREEN = "#578800";
const TEXT = "#151515";
const MUTED = "#555966";
const BORDER = "#E9E9ED";
const PALE_GREEN = "#F2F8E5";

const PROFILE = {
  name: "Bilal Khan",
  phone: "+91 98765 43210",
  email: "bilal.khan@email.com",
};

const MENU_ITEMS = [
  {
    id: "orders",
    title: "My Orders",
    subtitle: "Track, return or reorder items",
    icon: "cube-outline",
    highlight: true,
  },
  {
    id: "wishlist",
    title: "My Wishlist",
    subtitle: "View your saved products",
    icon: "heart-outline",
  },
  {
    id: "addresses",
    title: "Saved Addresses",
    subtitle: "Manage your delivery addresses",
    icon: "location-outline",
  },
  {
    id: "payments",
    title: "Payment Methods",
    subtitle: "Manage cards, UPI and more",
    icon: "card-outline",
  },
  {
    id: "editProfile",
    title: "Edit Profile",
    subtitle: "Update your personal details",
    icon: "person-outline",
  },
  {
    id: "notifications",
    title: "Notifications",
    subtitle: "Order updates, offers and more",
    icon: "notifications-outline",
  },
  {
    id: "support",
    title: "Help & Support",
    subtitle: "Get assistance and raise a request",
    icon: "headset-outline",
  },
  {
    id: "about",
    title: "About NATURYZ",
    subtitle: "Learn more about our brand",
    icon: "information-circle-outline",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    subtitle: "Read our privacy policy",
    icon: "shield-checkmark-outline",
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    subtitle: "Read our terms and conditions",
    icon: "document-text-outline",
  },
];

export default function ProfileScreen({
  onWishlistPress,
  onCartPress,
  onOrdersPress,
  onSavedAddressesPress,
  onTabPress,
  cartCount = 0,
  wishlistCount = 0,
  addressCount = 0,
  profile = PROFILE,
  profileImage,
  onChangeProfileImage,
  onEditProfilePress,
  onSupportPress,
  onNotificationsPress,
  onAboutPress,
  onPrivacyPress,
  onTermsPress,
}) {
  const orderCount = ordersData.length;

  const handleMenuPress = (id) => {
    switch (id) {
      case "orders":
        onOrdersPress?.();
        break;

      case "wishlist":
        onWishlistPress?.();
        break;

      case "addresses":
        onSavedAddressesPress?.();
        break;

      case "payments":
        Alert.alert(
          "Payment Methods",
          "Payment methods management will be connected in its development phase.",
        );
        break;

      case "editProfile":
        onEditProfilePress?.();
        break;

      case "notifications":
        onNotificationsPress?.();
        break;

      case "support":
        onSupportPress?.();
        break;

      case "about":
        onAboutPress?.();
        break;

      case "privacy":
        onPrivacyPress?.();
        break;

      case "terms":
        onTermsPress?.();
        break;

      default:
        break;
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          Alert.alert(
            "Demo Profile",
            "Authentication and logout will be connected when login is implemented.",
          );
        },
      },
    ]);
  };
  const handlePickProfileImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow gallery access to select your profile photo.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        onChangeProfileImage?.(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to select profile photo.");
      console.warn("Profile image picker error:", error);
    }
  };

  const stats = [
    {
      id: "orders",
      icon: "bag-handle-outline",
      value: String(orderCount),
      label: "Total Orders",
    },
    {
      id: "wishlist",
      icon: "heart-outline",
      value: String(wishlistCount),
      label: "Wishlist",
    },
    {
      id: "addresses",
      icon: "location-outline",
      value: String(addressCount),
      label: "Addresses",
    },
    {
      id: "reviews",
      icon: "star-outline",
      value: "4.8",
      label: "My Reviews",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* REUSABLE TOP NAVBAR */}
        <TopNavbar
          leftAction="none"
          onWishlistPress={onWishlistPress}
          onCartPress={onCartPress}
          cartCount={cartCount}
          headerBackgroundColor="#FFFFFF"
          iconColor={TEXT}
          headerHeight={62}
          headerBorderColor="#F4F4F4"
          headerBorderWidth={1}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* PAGE TITLE */}
          <Text style={styles.pageTitle}>My Profile</Text>

          {/* PROFILE CARD */}
          <Pressable
            style={styles.profileCard}
            onPress={() =>
              Alert.alert(
                "My Profile",
                "Profile details editing will be available in the Edit Profile section.",
              )
            }
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.avatarText}>
                    {(profile.name || "BK")
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </Text>
                )}
              </View>

              <Pressable
                style={styles.cameraButton}
                onPress={handlePickProfileImage}
              >
                <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.profileDetails}>
              <Text style={styles.profileName} numberOfLines={1}>
                {profile.name}
              </Text>

              <View style={styles.profileInfoRow}>
                <Ionicons name="call-outline" size={19} color={MUTED} />
                <Text style={styles.profileInfoText} numberOfLines={1}>
                  {profile.phone}
                </Text>
              </View>

              <View style={styles.profileInfoRow}>
                <Ionicons name="mail-outline" size={19} color={MUTED} />
                <Text style={styles.profileInfoText} numberOfLines={1}>
                  {profile.email}
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={27} color={TEXT} />
          </Pressable>

          {/* PROFILE STATISTICS */}
          <View style={styles.statsCard}>
            {stats.map((stat, index) => (
              <React.Fragment key={stat.id}>
                <Pressable
                  style={styles.statItem}
                  onPress={() => {
                    if (stat.id === "orders") onOrdersPress?.();
                    if (stat.id === "wishlist") onWishlistPress?.();
                    if (stat.id === "addresses") onSavedAddressesPress?.();
                  }}
                >
                  <Ionicons name={stat.icon} size={31} color={GREEN} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </Pressable>

                {index !== stats.length - 1 && (
                  <View style={styles.statDivider} />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* PROFILE MENU */}
          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => handleMenuPress(item.id)}
                style={({ pressed }) => [
                  styles.menuItem,
                  item.highlight && styles.highlightMenuItem,
                  index !== MENU_ITEMS.length - 1 && styles.menuItemBorder,
                  pressed && styles.menuPressed,
                ]}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon} size={32} color={TEXT} />
                </View>

                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>

                <Ionicons name="chevron-forward" size={26} color={TEXT} />
              </Pressable>
            ))}
          </View>

          {/* LOGOUT */}
          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.menuPressed,
            ]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={29} color="#D71920" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </ScrollView>

        {/* REUSABLE BOTTOM NAVIGATION */}
        <BottomTabBar activeTab="Profile" onTabPress={onTabPress} />
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
    paddingBottom: 17,
  },
  pageTitle: {
    color: TEXT,
    fontSize: 28,
    fontWeight: "900",
    marginHorizontal: 22,
    marginTop: 17,
    marginBottom: 21,
  },
  profileCard: {
    minHeight: 145,
    marginHorizontal: 14,
    paddingHorizontal: 13,
    paddingVertical: 13,
    borderRadius: 21,
    backgroundColor: "#F5F9E9",
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  avatarContainer: {
    width: 91,
    height: 91,
    position: "relative",
  },
  avatar: {
    width: 91,
    height: 91,
    borderRadius: 46,
    backgroundColor: "#E3EED0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarText: {
    color: DARK_GREEN,
    fontSize: 30,
    fontWeight: "900",
  },
  cameraButton: {
    position: "absolute",
    width: 39,
    height: 39,
    borderRadius: 20,
    right: -4,
    bottom: 0,
    backgroundColor: GREEN,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 46,
  },
  profileDetails: {
    flex: 1,
    gap: 7,
  },
  profileName: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 2,
  },
  profileInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileInfoText: {
    flex: 1,
    color: "#454957",
    fontSize: 13,
    fontWeight: "600",
  },
  statsCard: {
    minHeight: 119,
    marginHorizontal: 14,
    marginTop: 18,
    marginBottom: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    minWidth: 0,
  },
  statValue: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "900",
  },
  statLabel: {
    color: MUTED,
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 67,
    backgroundColor: "#E0E1E3",
  },
  menuCard: {
    marginHorizontal: 14,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  menuItem: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    gap: 12,
  },
  highlightMenuItem: {
    backgroundColor: "#F5F9E9",
    borderRadius: 13,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E9",
  },
  menuIconContainer: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTextContainer: {
    flex: 1,
    gap: 2,
  },
  menuTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "900",
  },
  menuSubtitle: {
    color: MUTED,
    fontSize: 12,
    fontWeight: "500",
  },
  menuPressed: {
    opacity: 0.72,
  },
  logoutButton: {
    minHeight: 65,
    marginHorizontal: 14,
    marginTop: 21,
    marginBottom: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  logoutText: {
    color: "#D71920",
    fontSize: 20,
    fontWeight: "900",
  },
});
