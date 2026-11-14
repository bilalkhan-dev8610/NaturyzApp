import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";
const TEXT = "#171717";
const MUTED = "#777777";

const formatPrice = (value) => {
  if (typeof value === "string" && value.includes("₹")) {
    return value;
  }

  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

export default function ProductCard({
  product,
  width,
  isWishlisted = false,
  isInCart = false,
  onPress,
  onWishlistPress,
  onAddToCart,
  variant = "grid",
}) {
  if (!product) return null;

  const hasVariant = product.size || product.flavour;
  const hasRating = typeof product.rating === "number";
  const hasReviews = typeof product.reviews === "number";
  const hasDiscount = Number(product.discount) > 0;
  const hasMrp = Number(product.mrp) > Number(product.price);
  if (variant === "horizontal") {
    const description =
      product.description ||
      product.subtitle ||
      [product.size, product.flavour].filter(Boolean).join(" | ");

    return (
      <View style={styles.horizontalCard}>
        <Pressable
          style={styles.horizontalImageArea}
          onPress={() => onPress?.(product)}
        >
          <Image
            source={product.image}
            style={styles.horizontalImage}
            resizeMode="contain"
          />
        </Pressable>

        <View style={styles.horizontalInfo}>
          <Pressable onPress={() => onPress?.(product)}>
            <Text style={styles.productName} numberOfLines={2}>
              {product.name}
            </Text>

            {!!description && (
              <Text style={styles.horizontalDescription} numberOfLines={2}>
                {description}
              </Text>
            )}
          </Pressable>

          {hasRating && (
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={17} color="#F5B800" />
              <Text style={styles.ratingValue}>
                {product.rating.toFixed(1)}
              </Text>
              {hasReviews && (
                <Text style={styles.reviewCount}>
                  ({product.reviews.toLocaleString("en-IN")} Reviews)
                </Text>
              )}
            </View>
          )}

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>

            {hasMrp && (
              <Text style={styles.mrp}>{formatPrice(product.mrp)}</Text>
            )}

            {hasDiscount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}% Off</Text>
              </View>
            )}
          </View>

          <Pressable
            onPress={() => !isInCart && onAddToCart?.(product)}
            disabled={isInCart}
            style={[
              styles.horizontalCartButton,
              isInCart && { backgroundColor: "#777777", opacity: 0.7 },
            ]}
          >
            <Ionicons
              name={isInCart ? "checkmark-circle" : "cart-outline"}
              size={21}
              color="#FFFFFF"
            />
            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>
              {isInCart ? "Added" : "Add"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => onWishlistPress?.(product)}
          style={styles.horizontalWishlist}
          hitSlop={8}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={27}
            color={isWishlisted ? "#E53935" : "#111111"}
          />
        </Pressable>
      </View>
    );
  }
  if (variant === "compact") {
    return (
      <Pressable
        onPress={() => onPress?.(product)}
        style={({ pressed }) => [
          styles.compactCard,
          width ? { width } : null,
          pressed && styles.compactPressed,
        ]}
      >
        <Pressable
          style={styles.compactWishlist}
          onPress={() => onWishlistPress?.(product)}
          hitSlop={8}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={25}
            color={isWishlisted ? "#E53935" : "#111111"}
          />
        </Pressable>

        <Image
          source={product.image}
          style={styles.compactImage}
          resizeMode="contain"
        />

        <View style={styles.compactInfo}>
          <Text style={styles.compactName} numberOfLines={1}>
            {product.name}
          </Text>

          {!!product.subtitle && (
            <Text style={styles.compactSubtitle} numberOfLines={1}>
              {product.subtitle}
            </Text>
          )}

          {!!product.price && (
            <Text style={styles.compactPrice}>
              {formatPrice(product.price)}
            </Text>
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => onPress?.(product)}
      style={({ pressed }) => [
        styles.productCard,
        width ? { width } : null,
        pressed && styles.cardPressed,
      ]}
    >
      {!!product.badge && (
        <View style={styles.bestSellerBadge}>
          <Text style={styles.bestSellerText}>{product.badge}</Text>
        </View>
      )}

      <Pressable
        onPress={() => onWishlistPress?.(product)}
        style={styles.wishlistButton}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={
          isWishlisted
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
      >
        <Ionicons
          name={isWishlisted ? "heart" : "heart-outline"}
          size={27}
          color={isWishlisted ? "#E53935" : "#111111"}
        />
      </Pressable>

      <Image
        source={product.image}
        style={styles.productImage}
        resizeMode="contain"
      />

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>

        {hasVariant && (
          <Text style={styles.productVariant} numberOfLines={1}>
            {[product.size, product.flavour].filter(Boolean).join(" | ")}
          </Text>
        )}

        {hasRating && (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={17} color="#F5B800" />

            <Text style={styles.ratingValue}>{product.rating.toFixed(1)}</Text>

            {hasReviews && (
              <Text style={styles.reviewCount}>
                ({product.reviews.toLocaleString("en-IN")} Reviews)
              </Text>
            )}
          </View>
        )}

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          {hasMrp && <Text style={styles.mrp}>{formatPrice(product.mrp)}</Text>}

          {hasDiscount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% Off</Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={() => !isInCart && onAddToCart?.(product)}
          disabled={isInCart}
          style={({ pressed }) => [
            styles.addToCartButton,
            isInCart && { backgroundColor: "#777777", opacity: 0.7 },
            pressed && !isInCart && styles.buttonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={
            isInCart
              ? `${product.name} added to cart`
              : `Add ${product.name} to cart`
          }
        >
          <Ionicons
            name={isInCart ? "checkmark-circle" : "cart-outline"}
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.addToCartText}>
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  productCard: {
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  bestSellerBadge: {
    position: "absolute",
    top: 9,
    left: 9,
    zIndex: 2,
    backgroundColor: GREEN,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },

  bestSellerText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  wishlistButton: {
    position: "absolute",
    top: 12,
    right: 11,
    zIndex: 3,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  productImage: {
    width: "100%",
    height: 190,
    marginTop: 8,
  },

  productInfo: {
    paddingHorizontal: 11,
    paddingBottom: 11,
  },

  productName: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "800",
  },

  productVariant: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 9,
  },

  ratingValue: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "700",
  },

  reviewCount: {
    flex: 1,
    color: MUTED,
    fontSize: 10,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
    marginBottom: 11,
  },

  price: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "900",
  },

  mrp: {
    color: MUTED,
    fontSize: 10,
    textDecorationLine: "line-through",
  },

  discountBadge: {
    backgroundColor: "#F0F6DE",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 16,
  },

  discountText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "800",
  },

  addToCartButton: {
    height: 43,
    borderRadius: 24,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addToCartText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  buttonPressed: {
    opacity: 0.8,
  },
  horizontalCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 10,
    marginBottom: 13,
    minHeight: 175,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  horizontalImageArea: {
    width: 115,
    alignItems: "center",
    justifyContent: "center",
  },

  horizontalImage: {
    width: 110,
    height: 145,
  },

  horizontalInfo: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 27,
    justifyContent: "center",
  },

  horizontalDescription: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  horizontalCartButton: {
    width: 42,
    height: 38,
    borderRadius: 20,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },

  horizontalWishlist: {
    position: "absolute",
    top: 9,
    right: 9,
    zIndex: 2,
  },
  compactCard: {
    width: 158,
    minHeight: 220,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  compactWishlist: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  compactImage: {
    width: "100%",
    height: 155,
    marginTop: 5,
  },
  compactInfo: {
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  compactName: {
    color: "#202020",
    fontSize: 14,
    fontWeight: "800",
  },
  compactSubtitle: {
    color: "#777777",
    fontSize: 10,
    marginTop: 3,
  },
  compactPrice: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 5,
  },
  compactPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
