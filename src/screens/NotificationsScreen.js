import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Modal,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNavbar from "../components/TopNavbar";

const GREEN = "#78A900";
const DARK_GREEN = "#578800";
const TEXT = "#151515";
const MUTED = "#555966";
const BORDER = "#E9E9ED";
const PALE_GREEN = "#F3F8E8";

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    section: "Today",
    type: "Orders",
    title: "Order Shipped 🚚",
    message:
      "Your order #NYZ7845623 has been shipped and is on the way to your address.",
    time: "Just now",
    icon: "cube-outline",
    unread: true,
    highlight: true,
    action: "orders",
  },
  {
    id: "n2",
    section: "Today",
    type: "Offers",
    title: "Special Offer for You! 🎉",
    message: "Get up to 30% OFF on Omega-3 & Multivitamins. Limited time only!",
    time: "2 hours ago",
    icon: "pricetag-outline",
    unread: true,
    action: "offers",
  },
  {
    id: "n3",
    section: "Yesterday",
    type: "Orders",
    title: "Out for Delivery",
    message:
      "Your order #NYZ7845623 is out for delivery. Expect it by today, 8 PM.",
    time: "Yesterday, 10:20 AM",
    icon: "car-outline",
    unread: false,
    action: "orders",
  },
  {
    id: "n4",
    section: "Yesterday",
    type: "Updates",
    title: "Rate Your Purchase",
    message: "How was your experience with Triple Strength Omega-3 Fish Oil?",
    time: "Yesterday, 05:46 PM",
    icon: "star-outline",
    unread: false,
    action: "review",
  },
  {
    id: "n5",
    section: "This Week",
    type: "Updates",
    title: "New Product Launched! 🌱",
    message:
      "Introducing Liposomal Vitamin C — Better Absorption. Stronger Immunity.",
    time: "Mon, 27 Oct, 11:00 AM",
    icon: "leaf-outline",
    unread: false,
    action: "product",
  },
  {
    id: "n6",
    section: "This Week",
    type: "Offers",
    title: "Refer & Earn",
    message: "Invite your friends to NATURYZ and get ₹200 worth of rewards!",
    time: "Sun, 26 Oct, 04:30 PM",
    icon: "gift-outline",
    unread: false,
    action: "offers",
  },
];

const FILTERS = [
  { id: "All", icon: null },
  { id: "Orders", icon: "cube-outline" },
  { id: "Offers", icon: "pricetag-outline" },
  { id: "Updates", icon: "notifications-outline" },
];

export default function NotificationsScreen({
  onBack,
  onWishlistPress,
  onCartPress,
  onOrdersPress,
  cartCount = 0,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [settings, setSettings] = useState({
    orderUpdates: true,
    offers: true,
    productUpdates: true,
    pushNotifications: true,
    emailNotifications: true,
  });

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "All") return notifications;

    return notifications.filter((item) => item.type === activeFilter);
  }, [activeFilter, notifications]);

  const sections = ["Today", "Yesterday", "This Week"];

  const unreadCount = notifications.filter((item) => item.unread).length;

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  };

  const handleNotificationPress = (item) => {
    markAsRead(item.id);

    switch (item.action) {
      case "orders":
        if (onOrdersPress) {
          onOrdersPress();
        } else {
          Alert.alert("Order Update", item.message);
        }
        break;

      case "offers":
        Alert.alert("NATURYZ Offer", item.message);
        break;

      case "review":
        Alert.alert(
          "Rate Your Purchase",
          "Product review feature will be connected in the next phase.",
        );
        break;

      case "product":
        Alert.alert(
          "New Product",
          "Product details will be connected in the next phase.",
        );
        break;

      default:
        Alert.alert(item.title, item.message);
    }
  };

  const toggleSetting = (key) => {
    setSettings((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const renderNotification = (item) => (
    <Pressable
      key={item.id}
      style={[
        styles.notificationCard,
        item.highlight && item.unread && styles.highlightCard,
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationIconBox}>
        <Ionicons name={item.icon} size={36} color={GREEN} />
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>

      <View style={styles.notificationRight}>
        {item.unread && <View style={styles.unreadDot} />}
        <Ionicons name="chevron-forward" size={23} color={TEXT} />
      </View>
    </Pressable>
  );

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
          cartCount={cartCount}
          showWishlist={true}
          showCart={true}
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
          {/* TITLE */}
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={styles.pageTitle}>Notifications</Text>
              {unreadCount > 0 && (
                <View style={styles.unreadCountBadge}>
                  <Text style={styles.unreadCountText}>{unreadCount} New</Text>
                </View>
              )}
            </View>
            <Text style={styles.pageSubtitle}>
              Stay updated with your orders, offers and more.
            </Text>
          </View>

          {/* FILTERS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {FILTERS.map((filter) => {
              const active = activeFilter === filter.id;

              return (
                <Pressable
                  key={filter.id}
                  onPress={() => setActiveFilter(filter.id)}
                  style={[
                    styles.filterButton,
                    active && styles.activeFilterButton,
                  ]}
                >
                  {filter.icon && (
                    <Ionicons
                      name={filter.icon}
                      size={23}
                      color={active ? "#FFFFFF" : GREEN}
                    />
                  )}
                  <Text
                    style={[
                      styles.filterText,
                      active && styles.activeFilterText,
                    ]}
                  >
                    {filter.id}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* NOTIFICATION SECTIONS */}
          {sections.map((section) => {
            const sectionItems = filteredNotifications.filter(
              (item) => item.section === section,
            );

            if (sectionItems.length === 0) return null;

            return (
              <View key={section} style={styles.section}>
                <Text style={styles.sectionTitle}>{section}</Text>
                {sectionItems.map(renderNotification)}
              </View>
            );
          })}

          {filteredNotifications.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="notifications-off-outline"
                size={52}
                color="#A8B68E"
              />
              <Text style={styles.emptyTitle}>No Notifications</Text>
              <Text style={styles.emptyMessage}>
                There are no {activeFilter.toLowerCase()} notifications right
                now.
              </Text>
            </View>
          )}

          {/* NOTIFICATION SETTINGS */}
          <Pressable
            style={styles.settingsButton}
            onPress={() => setSettingsVisible(true)}
          >
            <Ionicons
              name="notifications-off-outline"
              size={27}
              color={DARK_GREEN}
            />
            <Text style={styles.settingsButtonText}>Notification Settings</Text>
          </Pressable>
        </ScrollView>

        {/* SETTINGS MODAL */}
        <Modal
          visible={settingsVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setSettingsVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.settingsModal}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Notification Settings</Text>
                  <Text style={styles.modalSubtitle}>
                    Choose what you want to receive.
                  </Text>
                </View>

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setSettingsVisible(false)}
                >
                  <Ionicons name="close" size={24} color={TEXT} />
                </Pressable>
              </View>

              {[
                {
                  key: "pushNotifications",
                  title: "Push Notifications",
                  description: "Receive notifications on your device",
                },
                {
                  key: "orderUpdates",
                  title: "Order Updates",
                  description: "Shipping and delivery notifications",
                },
                {
                  key: "offers",
                  title: "Offers & Promotions",
                  description: "Discounts, coupons and special offers",
                },
                {
                  key: "productUpdates",
                  title: "Product Updates",
                  description: "New launches and product announcements",
                },
                {
                  key: "emailNotifications",
                  title: "Email Notifications",
                  description: "Receive updates through email",
                },
              ].map((item) => (
                <View key={item.key} style={styles.settingRow}>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>
                      {item.description}
                    </Text>
                  </View>

                  <Switch
                    value={settings[item.key]}
                    onValueChange={() => toggleSetting(item.key)}
                    trackColor={{
                      false: "#D5D5D5",
                      true: "#B6D77A",
                    }}
                    thumbColor={settings[item.key] ? GREEN : "#F4F4F4"}
                  />
                </View>
              ))}

              <Pressable
                style={styles.doneButton}
                onPress={() => setSettingsVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 25,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 18,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  pageTitle: {
    color: TEXT,
    fontSize: 28,
    fontWeight: "900",
  },
  unreadCountBadge: {
    backgroundColor: PALE_GREEN,
    borderRadius: 13,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  unreadCountText: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "800",
  },
  pageSubtitle: {
    color: MUTED,
    fontSize: 15,
    marginTop: 7,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 5,
    gap: 9,
  },
  filterButton: {
    minWidth: 112,
    height: 49,
    paddingHorizontal: 15,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  activeFilterButton: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  filterText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "700",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  section: {
    marginTop: 21,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "900",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  notificationCard: {
    minHeight: 116,
    marginHorizontal: 13,
    marginBottom: 11,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.045,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  highlightCard: {
    backgroundColor: PALE_GREEN,
    borderColor: "#F0F5E5",
  },
  notificationIconBox: {
    width: 62,
    height: 62,
    borderRadius: 17,
    backgroundColor: "#EFF7DF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 1,
  },
  notificationTitle: {
    color: TEXT,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  notificationMessage: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  notificationTime: {
    color: MUTED,
    fontSize: 11,
    marginTop: 6,
  },
  notificationRight: {
    width: 19,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
    marginLeft: 5,
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: GREEN,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 65,
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 13,
  },
  emptyMessage: {
    color: MUTED,
    fontSize: 14,
    textAlign: "center",
    marginTop: 7,
  },
  settingsButton: {
    minHeight: 61,
    marginHorizontal: 14,
    marginTop: 19,
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
  },
  settingsButtonText: {
    color: DARK_GREEN,
    fontSize: 16,
    fontWeight: "900",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  settingsModal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 28,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  modalTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "900",
  },
  modalSubtitle: {
    color: MUTED,
    fontSize: 13,
    marginTop: 4,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  settingRow: {
    minHeight: 66,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "800",
  },
  settingDescription: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
  },
  doneButton: {
    height: 52,
    marginTop: 21,
    borderRadius: 14,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});
