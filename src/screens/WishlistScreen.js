
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

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";
const TEXT = "#171717";
const MUTED = "#777777";
const BORDER = "#EAEDE4";

const formatPrice = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "—";
  return `₹${amount.toLocaleString("en-IN")}`;
};

export default function WishlistScreen({
  onBack,
  wishlistItems = [],
  onRemoveFromWishlist,
  onAddToCart,
  onProductPress,
  onCartPress,
  cartCount = 0,
}) {
  const getItemPrice = (item) =>
    item.selectedPrice ?? item.price;

  const getItemMrp = (item) =>
    item.selectedMrp ?? item.mrp;

  const getDiscount = (item) => {
    const price = Number(getItemPrice(item));
    const mrp = Number(getItemMrp(item));

    if (!Number.isFinite(price) || !Number.isFinite(mrp) || mrp <= price) {
      return 0;
    }

    return Math.round(((mrp - price) / mrp) * 100);
  };

  const handleAddToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const handleRemove = (item) => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(item.id);
    }
  };

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
            <Ionicons name="arrow-back" size={26} color={TEXT} />
          </Pressable>

          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/naturyz-home-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerActions}>
            <Pressable
              style={styles.headerButton}
              accessibilityLabel="Search"
            >
              <Ionicons name="search-outline" size={23} color={TEXT} />
            </Pressable>

            <Pressable
              onPress={onCartPress}
              style={styles.headerButton}
              accessibilityLabel="Open cart"
            >
              <Ionicons name="cart-outline" size={25} color={TEXT} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* TITLE */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>My Wishlist</Text>
            <Text style={styles.itemCount}>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "Item" : "Items"}
            </Text>
          </View>

          {/* WISHLIST PRODUCTS */}
          {wishlistItems.length > 0 ? (
            <View style={styles.productsContainer}>
              {wishlistItems.map((item) => {
                const price = getItemPrice(item);
                const mrp = getItemMrp(item);
                const discount = getDiscount(item);

                return (
                  <View key={String(item.id)} style={styles.productCard}>
                    <Pressable
                      style={styles.productImageContainer}
                      onPress={() => onProductPress?.(item)}
                    >
                      {item.image ? (
                        <Image
                          source={item.image}
                          style={styles.productImage}
                          resizeMode="contain"
                        />
                      ) : (
                        <Ionicons
                          name="image-outline"
                          size={42}
                          color="#B8B8B8"
                        />
                      )}
                    </Pressable>

                    <View style={styles.productDetails}>
                      <View style={styles.productTitleRow}>
                        <Pressable
                          style={styles.productNameContainer}
                          onPress={() => onProductPress?.(item)}
                        >
                          <Text style={styles.productName} numberOfLines={2}>
                            {item.name || "NATURYZ Product"}
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() => handleRemove(item)}
                          style={styles.removeButton}
                          hitSlop={8}
                          accessibilityLabel={`Remove ${item.name} from wishlist`}
                        >
                          <Ionicons
                            name="heart"
                            size={22}
                            color={GREEN}
                          />
                        </Pressable>
                      </View>

                      <Text style={styles.variant} numberOfLines={1}>
                        {[item.selectedWeight || item.size, item.selectedFlavor || item.flavour]
                          .filter(Boolean)
                          .join("  |  ") || "NATURYZ"}
                      </Text>

                      {item.rating != null && (
                        <View style={styles.ratingRow}>
                          <Ionicons name="star" size={14} color="#F5B800" />
                          <Text style={styles.ratingText}>
                            {Number(item.rating).toFixed(1)}
                          </Text>
                          {item.reviews != null && (
                            <Text style={styles.reviewText}>
                              ({Number(item.reviews).toLocaleString("en-IN")} Reviews)
                            </Text>
                          )}
                        </View>
                      )}

                      <View style={styles.priceRow}>
                        <Text style={styles.price}>
                          {formatPrice(price)}
                        </Text>

                        {mrp != null && Number(mrp) > Number(price) && (
                          <Text style={styles.mrp}>
                            {formatPrice(mrp)}
                          </Text>
                        )}

                        {discount > 0 && (
                          <Text style={styles.discount}>
                            {discount}% Off
                          </Text>
                        )}
                      </View>

                      <Pressable
                        onPress={() => handleAddToCart(item)}
                        style={({ pressed }) => [
                          styles.addButton,
                          pressed && styles.buttonPressed,
                        ]}
                      >
                        <Ionicons
                          name="cart-outline"
                          size={18}
                          color="#FFFFFF"
                        />
                        <Text style={styles.addButtonText}>Add to Cart</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="heart-outline" size={48} color={GREEN} />
              </View>
              <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
              <Text style={styles.emptyDescription}>
                Save your favourite NATURYZ products here and find them
                whenever you need them.
              </Text>
              <Pressable onPress={onBack} style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Continue Shopping</Text>
              </Pressable>
            </View>
          )}

          {/* BOTTOM BANNER */}
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Ionicons name="heart" size={23} color={DARK_GREEN} />
            </View>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Save Your Favorites</Text>
              <Text style={styles.bannerDescription}>
                Keep track of products you love and buy them later.
              </Text>
            </View>
          </View>
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
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerButton: {
    width: 38,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 145,
    height: 48,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: -3,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 17,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    color: TEXT,
  },
  itemCount: {
    marginLeft: 9,
    fontSize: 13,
    color: MUTED,
    fontWeight: "500",
  },
  productsContainer: {
    gap: 13,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 15,
    padding: 11,
    minHeight: 158,
  },
  productImageContainer: {
    width: 112,
    minHeight: 132,
    backgroundColor: "#FAFBF7",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  productImage: {
    width: "100%",
    height: 125,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  productTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  productNameContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: "700",
    color: TEXT,
    lineHeight: 20,
  },
  removeButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  variant: {
    fontSize: 11,
    color: MUTED,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingText: {
    fontSize: 11,
    color: TEXT,
    fontWeight: "700",
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 10,
    color: MUTED,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 7,
    gap: 7,
  },
  price: {
    fontSize: 16,
    color: TEXT,
    fontWeight: "800",
  },
  mrp: {
    fontSize: 11,
    color: "#999999",
    textDecorationLine: "line-through",
  },
  discount: {
    fontSize: 10,
    color: DARK_GREEN,
    fontWeight: "700",
    backgroundColor: "#F0F7DF",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
  },
  addButton: {
    height: 35,
    backgroundColor: GREEN,
    borderRadius: 8,
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  addButtonText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 55,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F2F8E6",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: TEXT,
    marginTop: 18,
  },
  emptyDescription: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },
  shopButton: {
    backgroundColor: GREEN,
    borderRadius: 9,
    paddingHorizontal: 22,
    paddingVertical: 12,
    marginTop: 20,
  },
  shopButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F8E6",
    borderRadius: 13,
    padding: 15,
    marginTop: 22,
  },
  bannerIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#E5F0D1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: DARK_GREEN,
  },
  bannerDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: MUTED,
    marginTop: 3,
  },
});
