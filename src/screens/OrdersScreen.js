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
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ordersData } from "../data/ordersData";

const GREEN = "#78A900";
const DARK_GREEN = "#397D18";
const TEXT = "#17191D";
const MUTED = "#737783";
const PALE = "#F2F8E6";
const BORDER = "#ECEFEC";

const FILTERS = [
  "All Orders",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const formatINR = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

const getStatusStyle = (status) => {
  if (status === "Cancelled") {
    return {
      backgroundColor: "#FDEAEA",
      color: "#B42318",
      icon: "close-circle-outline",
    };
  }

  if (status === "Delivered") {
    return {
      backgroundColor: "#F0F7E5",
      color: DARK_GREEN,
      icon: "checkmark-circle-outline",
    };
  }

  return {
    backgroundColor: "#F0F7E5",
    color: DARK_GREEN,
    icon: "car-outline",
  };
};

export default function OrdersScreen({
  onBack,
  onWishlistPress,
  onCartPress,
  onHomePress,
  onCategoriesPress,
  onSearchPress,
  onOrdersPress,
  onProfilePress,
  onOrderPress,
  onSupportPress,
  cartCount = 0,
  theme,
}) {
  const [activeFilter, setActiveFilter] = useState("All Orders");
  const { width } = useWindowDimensions();

  const colors = {
    background: theme?.background || "#FFFFFF",
    surface: theme?.surface || "#FFFFFF",
    text: theme?.text || TEXT,
    muted: theme?.muted || MUTED,
    border: theme?.border || BORDER,
    green: theme?.primary || GREEN,
    pale: theme?.soft || PALE,
  };

  const filteredOrders = useMemo(() => {
    if (activeFilter === "All Orders") return ordersData;

    return ordersData.filter(
      (order) => order.statusGroup === activeFilter
    );
  }, [activeFilter]);

  const handleOrderPress = (order) => {
    if (onOrderPress) {
      onOrderPress(order);
      return;
    }

    Alert.alert(
      `Order #${order.id}`,
      `Status: ${order.status}\nTotal: ${formatINR(order.total)}\n\nOrder tracking will be connected in the tracking screen.`
    );
  };

  const handleSupport = () => {
    if (onSupportPress) {
      onSupportPress();
      return;
    }

    Alert.alert(
      "Order Support",
      "Support screen will be connected in the Help & Support phase."
    );
  };

  const renderOrder = (order) => {
    const statusStyle = getStatusStyle(order.status);

    return (
      <Pressable
        key={order.id}
        onPress={() => handleOrderPress(order)}
        style={({ pressed }) => [
          styles.orderCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
          pressed && styles.cardPressed,
        ]}
      >
        {/* ORDER HEADER */}
        <View style={styles.orderHeader}>
          <View style={styles.orderIconCircle}>
            <Ionicons
              name="cube-outline"
              size={27}
              color={DARK_GREEN}
            />
          </View>

          <View style={styles.orderHeading}>
            <Text style={[styles.orderNumber, { color: colors.text }]}>
              Order #{order.id}
            </Text>
            <Text style={[styles.orderDate, { color: colors.muted }]}>
              Placed on {order.date}
            </Text>
          </View>

          <View
            style={[
              styles.statusPill,
              { backgroundColor: statusStyle.backgroundColor },
            ]}
          >
            <Ionicons
              name={statusStyle.icon}
              size={23}
              color={statusStyle.color}
            />
            <Text
              style={[
                styles.statusText,
                { color: statusStyle.color },
              ]}
            >
              {order.status}
            </Text>
          </View>
        </View>

        {/* ORDER DETAILS */}
        <View style={styles.orderDetails}>
          <View style={styles.productImages}>
            {order.products.map((product) => (
              <View key={product.id} style={styles.productThumb}>
                <Image
                  source={product.image}
                  style={styles.productThumbImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>

          <View style={styles.orderAmount}>
            <Text style={[styles.itemCount, { color: colors.text }]}>
              {order.itemCount} {order.itemCount === 1 ? "Item" : "Items"}
            </Text>
            <Text style={[styles.orderTotal, { color: colors.text }]}>
              {formatINR(order.total)}
            </Text>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.deliveryInfo}>
            <Text
              style={[styles.deliveryLabel, { color: colors.muted }]}
            >
              {order.deliveryLabel}
            </Text>
            <Text
              style={[
                styles.deliveryDate,
                {
                  color:
                    order.status === "Cancelled"
                      ? colors.muted
                      : DARK_GREEN,
                },
              ]}
            >
              {order.deliveryDate}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={23}
            color={colors.text}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme?.statusBarStyle || "dark-content"}
      />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerSide}>
            {onBack && (
              <Pressable
                onPress={onBack}
                style={styles.headerIconButton}
                accessibilityLabel="Go back"
              >
                <Ionicons name="arrow-back" size={27} color={colors.text} />
              </Pressable>
            )}
          </View>

          <View style={styles.logoWrap}>
            <Image
              source={require("../../assets/images/naturyz-home-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Pressable
            onPress={onWishlistPress}
            style={styles.headerIconButton}
            accessibilityLabel="Open wishlist"
          >
            <Ionicons name="heart-outline" size={28} color={colors.text} />
          </Pressable>

          <Pressable
            onPress={onCartPress}
            style={styles.headerIconButton}
            accessibilityLabel="Open cart"
          >
            <View>
              <Ionicons name="cart-outline" size={29} color={colors.text} />
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
          <View style={styles.titleSection}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              My Orders
            </Text>
            <Text style={[styles.pageSubtitle, { color: colors.muted }]}>
              Track, manage and view your past orders
            </Text>
          </View>

          {/* FILTER TABS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContent}
            style={styles.filtersScroll}
          >
            {FILTERS.map((filter) => {
              const active = activeFilter === filter;

              return (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: active
                        ? colors.green
                        : colors.surface,
                      borderColor: active
                        ? colors.green
                        : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      { color: active ? "#FFFFFF" : colors.text },
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* ORDERS LIST */}
          <View style={styles.ordersList}>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(renderOrder)
            ) : (
              <View style={styles.emptyState}>
                <Ionicons
                  name="receipt-outline"
                  size={58}
                  color={colors.green}
                />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>
                  No {activeFilter.toLowerCase()} orders
                </Text>
                <Text style={[styles.emptySubtitle, { color: colors.muted }]}>
                  Your orders will appear here when available.
                </Text>
              </View>
            )}
          </View>

          {/* SUPPORT CARD */}
          <View
            style={[
              styles.supportCard,
              { backgroundColor: colors.pale },
            ]}
          >
            <Ionicons
              name="headset-outline"
              size={43}
              color={DARK_GREEN}
            />

            <View style={styles.supportText}>
              <Text style={[styles.supportTitle, { color: colors.text }]}>
                Need Help with an Order?
              </Text>
              <Text style={[styles.supportSubtitle, { color: colors.muted }]}>
                Get support, track your order or request a return.
              </Text>
            </View>

            <Pressable
              onPress={handleSupport}
              style={styles.supportButton}
            >
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* BOTTOM NAVIGATION */}
        <View
          style={[
            styles.bottomNav,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
            },
          ]}
        >
          <NavItem
            icon="home-outline"
            label="Home"
            onPress={onHomePress}
            color={colors.text}
          />
          <NavItem
            icon="grid-outline"
            label="Categories"
            onPress={onCategoriesPress}
            color={colors.text}
          />
          <NavItem
            icon="search-outline"
            label="Search"
            onPress={onSearchPress}
            color={colors.text}
          />
          <NavItem
            icon="cube-outline"
            label="Orders"
            active
            onPress={onOrdersPress}
            color={colors.green}
          />
          <NavItem
            icon="person-outline"
            label="Profile"
            onPress={onProfilePress}
            color={colors.text}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function NavItem({ icon, label, onPress, active, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.navItem}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={[styles.navIconWrap, active && styles.activeNavIconWrap]}>
        <Ionicons
          name={active ? "cube" : icon}
          size={29}
          color={active ? color : color}
        />
      </View>
      <Text
        style={[
          styles.navLabel,
          { color },
          active && styles.activeNavLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  headerSide: {
    width: 28,
  },
  headerIconButton: {
    width: 39,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: {
    flex: 1,
    height: 58,
    marginHorizontal: 8,
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  titleSection: {
    paddingHorizontal: 17,
    paddingTop: 15,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: "900",
  },
  pageSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  filtersScroll: {
    flexGrow: 0,
    marginBottom: 14,
  },
  filtersContent: {
    paddingHorizontal: 15,
    gap: 9,
  },
  filterChip: {
    minHeight: 43,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "700",
  },
  ordersList: {
    paddingHorizontal: 12,
    gap: 12,
  },
  orderCard: {
    borderRadius: 23,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 13,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.995 }],
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
  },
  orderIconCircle: {
    width: 49,
    height: 49,
    borderRadius: 25,
    backgroundColor: "#F4F8EB",
    alignItems: "center",
    justifyContent: "center",
  },
  orderHeading: {
    flex: 1,
    minWidth: 0,
    marginLeft: 9,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "900",
  },
  orderDate: {
    fontSize: 12,
    marginTop: 3,
  },
  statusPill: {
    minHeight: 40,
    borderRadius: 22,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },
  orderDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
    minHeight: 86,
  },
  productImages: {
    width: "34%",
    height: 78,
    borderRadius: 14,
    backgroundColor: "#FAFBF8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  productThumb: {
    flex: 1,
    height: 74,
    alignItems: "center",
    justifyContent: "center",
  },
  productThumbImage: {
    width: "100%",
    height: "100%",
  },
  orderAmount: {
    flex: 1,
    paddingHorizontal: 9,
    justifyContent: "center",
  },
  itemCount: {
    fontSize: 12,
    fontWeight: "600",
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: "900",
    marginTop: 4,
  },
  verticalDivider: {
    width: 1,
    height: 59,
    backgroundColor: "#DADDE0",
    marginHorizontal: 5,
  },
  deliveryInfo: {
    flex: 1.05,
    paddingLeft: 8,
    justifyContent: "center",
  },
  deliveryLabel: {
    fontSize: 11,
    lineHeight: 16,
  },
  deliveryDate: {
    fontSize: 13,
    fontWeight: "900",
    marginTop: 3,
  },
  supportCard: {
    marginHorizontal: 13,
    marginTop: 18,
    paddingHorizontal: 13,
    paddingVertical: 15,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  supportText: {
    flex: 1,
    minWidth: 0,
  },
  supportTitle: {
    fontSize: 13,
    fontWeight: "900",
  },
  supportSubtitle: {
    fontSize: 10,
    lineHeight: 14,
    marginTop: 4,
  },
  supportButton: {
    minHeight: 40,
    paddingHorizontal: 11,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: DARK_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  supportButtonText: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "800",
  },
  emptyState: {
    minHeight: 230,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 14,
  },
  emptySubtitle: {
    color: MUTED,
    textAlign: "center",
    fontSize: 12,
    marginTop: 6,
  },
  bottomNav: {
    minHeight: 76,
    paddingHorizontal: 5,
    paddingTop: 7,
    paddingBottom: 4,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -3 },
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 61,
  },
  navIconWrap: {
    width: 48,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  activeNavIconWrap: {
    borderTopWidth: 3,
    borderTopColor: GREEN,
    marginTop: -8,
    paddingTop: 5,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 3,
  },
  activeNavLabel: {
    fontWeight: "900",
  },
});