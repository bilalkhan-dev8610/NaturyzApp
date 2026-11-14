import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  BackHandler,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

// Import all implemented screens
import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import SportsNutritionScreen from "./src/screens/SportsNutritionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import CartScreen from "./src/screens/CartScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import SearchScreen from "./src/screens/SearchScreen";
import WishlistScreen from "./src/screens/WishlistScreen";
import AddressSelectionScreen from "./src/screens/AddressSelectionScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import AddAddressScreen from "./src/screens/AddAddressScreen";
import SelectDeliveryAddressScreen from "./src/screens/SelectDeliveryAddressScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import HelpSupportScreen from "./src/screens/HelpSupportScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import AboutNaturyzScreen from "./src/screens/AboutNaturyzScreen";
import PrivacyTermsScreen from "./src/screens/PrivacyTermsScreen";
import DrawerMenu from "./src/components/DrawerMenu";
import OnboardingFlow from "./src/screens/onboarding/OnboardingFlow";

const CREAM = "#FDFFF1";

export default function App() {
  // Current screen state
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartReturnScreen, setCartReturnScreen] = useState("home");
  const [productReturnScreen, setProductReturnScreen] =
    useState("sportsNutrition");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [checkoutOrder, setCheckoutOrder] = useState(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const [addresses, setAddresses] = useState([]);
  const [addressesLoaded, setAddressesLoaded] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressFormReturnScreen, setAddressFormReturnScreen] =
    useState("addressSelection");
  const [addressReturnScreen, setAddressReturnScreen] = useState("cart");
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "Your Name",
    email: "youremail@email.com",
    phone: "+91 98765 xxxxx",
    dateOfBirth: "YYYY-MM-DD",
    gender: "gender",
    fitnessGoals: ["Muscle Gain", "Weight Loss"],
  });
  const [privacyTermsInitialTab, setPrivacyTermsInitialTab] =
    useState("privacy");

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem(
          "@naturyz_profile_data",
        );

        if (savedProfile) {
          setProfileData(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.warn("Profile data loading failed:", error);
      }
    };

    loadProfileData();
  }, []);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const savedWishlist = await AsyncStorage.getItem("@naturyz_wishlist");

        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.warn("Wishlist loading failed:", error);
      } finally {
        setWishlistLoaded(true);
      }
    };

    loadWishlist();
  }, []);
  useEffect(() => {
    if (!wishlistLoaded) return;

    const saveWishlist = async () => {
      try {
        await AsyncStorage.setItem(
          "@naturyz_wishlist",
          JSON.stringify(wishlistItems),
        );
      } catch (error) {
        console.warn("Wishlist saving failed:", error);
      }
    };

    saveWishlist();
  }, [wishlistItems, wishlistLoaded]);

  // Load saved addresses
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const savedAddresses = await AsyncStorage.getItem("@naturyz_addresses");

        if (savedAddresses) {
          const parsedAddresses = JSON.parse(savedAddresses);

          if (Array.isArray(parsedAddresses)) {
            setAddresses(parsedAddresses);

            const defaultAddress =
              parsedAddresses.find((address) => address.isDefault) ||
              parsedAddresses[0];

            if (defaultAddress) {
              setSelectedAddressId(defaultAddress.id);
              setSelectedDeliveryAddress(defaultAddress);
            }
          }
        }
      } catch (error) {
        console.warn("Address loading failed:", error);
      } finally {
        setAddressesLoaded(true);
      }
    };

    loadAddresses();
  }, []);

  // Save addresses
  useEffect(() => {
    if (!addressesLoaded) return;

    const saveAddresses = async () => {
      try {
        await AsyncStorage.setItem(
          "@naturyz_addresses",
          JSON.stringify(addresses),
        );
      } catch (error) {
        console.warn("Address saving failed:", error);
      }
    };

    saveAddresses();
  }, [addresses, addressesLoaded]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("@naturyz_cart");

        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.warn("Cart loading failed:", error);
      } finally {
        setCartLoaded(true);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;

    const saveCart = async () => {
      try {
        await AsyncStorage.setItem("@naturyz_cart", JSON.stringify(cartItems));
      } catch (error) {
        console.warn("Cart saving failed:", error);
      }
    };

    saveCart();
  }, [cartItems, cartLoaded]);

  // Splash screen automatically moves to onboarding
  useEffect(() => {
    if (currentScreen !== "splash") {
      return;
    }

    const splashTimer = setTimeout(() => {
      setCurrentScreen("onboardingBrand");
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, [currentScreen]);
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem("@naturyz_profile_image");

        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.warn("Profile image loading failed:", error);
      }
    };

    loadProfileImage();
  }, []);

  // Onboarding Screen 1 -> Screen 2

  const handleProfileImageChange = async (uri) => {
    try {
      await AsyncStorage.setItem("@naturyz_profile_image", uri);
      setProfileImage(uri);
    } catch (error) {
      Alert.alert("Error", "Unable to save profile photo.");
      console.warn("Profile image saving failed:", error);
    }
  };

  const handleGetStarted = () => {
    setCurrentScreen("home");
  };
  const handleAddToCart = (product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find((item) => item.id === product.id);

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity: 1,
          selected: true,
        },
      ];
    });
  };
  const openCart = () => {
    setCartReturnScreen(currentScreen);
    setCurrentScreen("cart");
  };
  const updateCartQuantity = (id, quantity) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id),
    );
  };

  const toggleCartSelection = (id) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id ? { ...item, selected: item.selected === false } : item,
      ),
    );
  };
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleWishlistToggle = (product, shouldAdd) => {
    setWishlistItems((previousItems) => {
      const alreadyExists = previousItems.some(
        (item) => item.id === product.id,
      );

      if (shouldAdd && !alreadyExists) {
        return [...previousItems, product];
      }

      if (!shouldAdd) {
        return previousItems.filter((item) => item.id !== product.id);
      }

      return previousItems;
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId),
    );
  };
  const handleSaveAddress = (address) => {
    let updatedAddresses;

    const isEditing = addresses.some((item) => item.id === address.id);

    if (address.isDefault || addresses.length === 0) {
      updatedAddresses = addresses.map((item) => ({
        ...item,
        isDefault: false,
      }));
    } else {
      updatedAddresses = [...addresses];
    }

    if (isEditing) {
      updatedAddresses = updatedAddresses.map((item) =>
        item.id === address.id ? address : item,
      );
    } else {
      updatedAddresses = [...updatedAddresses, address];
    }

    // Ensure one default address exists
    if (!updatedAddresses.some((item) => item.isDefault)) {
      updatedAddresses = updatedAddresses.map((item, index) => ({
        ...item,
        isDefault: index === 0,
      }));
    }

    setAddresses(updatedAddresses);
    setSelectedAddressId(address.id);
    setSelectedDeliveryAddress(address);
    setEditingAddress(null);
    setCurrentScreen(addressFormReturnScreen);
  };

  const handleDeleteAddress = (addressId) => {
    let updatedAddresses = addresses.filter((item) => item.id !== addressId);

    if (
      !updatedAddresses.some((item) => item.isDefault) &&
      updatedAddresses.length > 0
    ) {
      updatedAddresses = updatedAddresses.map((item, index) => ({
        ...item,
        isDefault: index === 0,
      }));
    }

    setAddresses(updatedAddresses);

    if (selectedAddressId === addressId) {
      const nextAddress =
        updatedAddresses.find((item) => item.isDefault) ||
        updatedAddresses[0] ||
        null;

      setSelectedAddressId(nextAddress?.id || null);
      setSelectedDeliveryAddress(nextAddress);
    }
  };

  const handleSelectAddress = (addressId) => {
    const address = addresses.find((item) => item.id === addressId);

    setSelectedAddressId(addressId);
    setSelectedDeliveryAddress(address || null);
  };
  const handleDrawerNavigate = (destination) => {
    switch (destination) {
      case "home":
        setCurrentScreen("home");
        break;

      case "categories":
        setCurrentScreen("categories");
        break;

      case "sportsNutrition":
        setCurrentScreen("sportsNutrition");
        break;

      case "orders":
        setCurrentScreen("orders");
        break;

      case "wishlist":
        setCurrentScreen("wishlist");
        break;

      case "cart":
        openCart();
        break;

      case "profile":
        setCurrentScreen("profile");
        break;

      case "addresses":
        setAddressReturnScreen("home");
        setCurrentScreen("addressSelection");
        break;

      case "notifications":
        setCurrentScreen("notifications");
        break;

      case "helpSupport":
        setCurrentScreen("helpSupport");
        break;

      case "aboutNaturyz":
        setCurrentScreen("aboutNaturyz");
        break;

      case "privacy":
        setPrivacyTermsInitialTab("privacy");
        setCurrentScreen("privacyTerms");
        break;

      case "terms":
        setPrivacyTermsInitialTab("terms");
        setCurrentScreen("privacyTerms");
        break;

      default:
        console.warn("Unknown drawer destination:", destination);
        break;
    }
  };
  // Render application screens
  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen />;

      case "onboardingBrand":
        return <OnboardingFlow onComplete={handleGetStarted} />;

      case "categories":
        return (
          <CategoriesScreen
            onBack={() => setCurrentScreen("home")}
            onTabPress={handleCategoriesTabPress}
            cartCount={cartCount}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            onCategoryPress={(category) => {
              if (category.id === "sports") {
                setCurrentScreen("sportsNutrition");
              } else {
                Alert.alert(
                  "Category Selected",
                  `${category.title.replace("\n", " ")} selected.`,
                );
              }
            }}
          />
        );

      case "sportsNutrition":
        return (
          <SportsNutritionScreen
            onBack={() => setCurrentScreen("categories")}
            cartCount={cartCount}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
            onWishlistToggle={handleWishlistToggle}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            onProductPress={(product) => {
              setSelectedProduct(product);
              setCurrentScreen("productDetails");
              setProductReturnScreen("sportsNutrition");
            }}
            onTabPress={handleHomeTabPress}
          />
        );

      case "productDetails":
        return (
          <ProductDetailsScreen
            product={selectedProduct}
            cartCount={cartCount}
            cartItems={cartItems}
            onBack={() => setCurrentScreen(productReturnScreen)}
            onCartPress={openCart}
            onAddToCart={handleAddToCart}
          />
        );
      case "cart":
        return (
          <CartScreen
            items={cartItems}
            onBack={() => setCurrentScreen(cartReturnScreen)}
            onQuantityChange={updateCartQuantity}
            onRemove={removeFromCart}
            onToggleSelection={toggleCartSelection}
            onCheckout={(order) => {
              setCheckoutOrder(order);
              setCurrentScreen("selectDeliveryAddress");
            }}
            onWishlistPress={() => setCurrentScreen("wishlist")}
          />
        );
      case "addressSelection":
        return (
          <AddressSelectionScreen
            onBack={() => setCurrentScreen(addressReturnScreen)}
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={handleSelectAddress}
            onAddNewAddress={() => {
              setEditingAddress(null);
              setAddressFormReturnScreen("addressSelection");
              setCurrentScreen("addressForm");
            }}
            onEditAddress={(address) => {
              setEditingAddress(address);
              setAddressFormReturnScreen("addressSelection");
              setCurrentScreen("addressForm");
            }}
            onDeleteAddress={handleDeleteAddress}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            cartCount={cartCount}
          />
        );
      case "selectDeliveryAddress":
        return (
          <SelectDeliveryAddressScreen
            onBack={() => setCurrentScreen("cart")}
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={handleSelectAddress}
            onEditAddress={(address) => {
              setEditingAddress(address);
              setAddressFormReturnScreen("selectDeliveryAddress");
              setCurrentScreen("addressForm");
            }}
            onDeliverHere={(address) => {
              if (!address) {
                Alert.alert(
                  "Select Address",
                  "Please select a delivery address before continuing.",
                );
                return;
              }

              setSelectedDeliveryAddress(address);
              setSelectedAddressId(address.id);
              setCurrentScreen("payment");
            }}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            cartCount={cartCount}
          />
        );
      case "addressForm":
        return (
          <AddAddressScreen
            onBack={() => {
              setEditingAddress(null);
              setCurrentScreen(addressFormReturnScreen);
            }}
            initialAddress={editingAddress}
            onSaveAddress={handleSaveAddress}
          />
        );
      case "payment":
        return (
          <PaymentScreen
            onBack={() => setCurrentScreen("selectDeliveryAddress")}
            onChangeAddress={() => setCurrentScreen("selectDeliveryAddress")}
            deliveryAddress={selectedDeliveryAddress}
            order={checkoutOrder || {}}
            selectedPaymentMethod={selectedPaymentMethod}
            onSelectPaymentMethod={setSelectedPaymentMethod}
            onPlaceOrder={({ order, address, paymentMethod }) => {
              Alert.alert(
                "Demo COD Checkout",
                `Payment Method: ${paymentMethod.toUpperCase()}\n` +
                  `Delivery Address: ${address.name || "Selected Address"}\n` +
                  `Total: ${formatINR(order.total)}\n\n` +
                  "Order confirmation screen will be connected in the next phase.",
              );
            }}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            cartCount={cartCount}
          />
        );

      case "orders":
        return (
          <OrdersScreen
            cartCount={cartCount}
            onCartPress={openCart}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onHomePress={() => setCurrentScreen("home")}
            onCategoriesPress={() => setCurrentScreen("categories")}
            onSearchPress={() => setCurrentScreen("search")}
            onOrdersPress={() => setCurrentScreen("orders")}
            onProfilePress={() => setCurrentScreen("profile")}
            onOrderPress={(order) =>
              Alert.alert(
                `Order #${order.id}`,
                `Status: ${order.status}\nTotal: ${formatINR(order.total)}`,
              )
            }
            onSupportPress={() =>
              Alert.alert("Support", "Help & Support screen will be connected.")
            }
          />
        );
      case "wishlist":
        return (
          <WishlistScreen
            onBack={() => setCurrentScreen("home")}
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
            onProductPress={(product) => {
              setProductReturnScreen("wishlist");
              setSelectedProduct(product);
              setCurrentScreen("productDetails");
            }}
            onCartPress={openCart}
            cartCount={cartCount}
          />
        );
      case "search":
        return (
          <SearchScreen
            onBack={() => setCurrentScreen("home")}
            cartCount={cartCount}
            cartItems={cartItems}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onWishlistToggle={handleWishlistToggle}
            wishlistItems={wishlistItems}
            onCartPress={openCart}
            onAddToCart={handleAddToCart}
            onProductPress={(product) => {
              setSelectedProduct(product);
              setCurrentScreen("productDetails");
              setProductReturnScreen("search");
            }}
            onTabPress={handleHomeTabPress}
          />
        );

      case "home":
        return (
          <HomeScreen
            onMenuPress={() => setDrawerVisible(true)}
            onTabPress={handleHomeTabPress}
            cartCount={cartCount}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            onProductPress={() => setCurrentScreen("sportsNutrition")}
            onCategoryPress={(category) => {
              if (category.id === "sports") {
                setCurrentScreen("sportsNutrition");
              } else {
                Alert.alert(
                  "Category Selected",
                  `${category.title.replace("\n", " ")} selected.`,
                );
              }
            }}
            wishlistItems={wishlistItems}
            onWishlistToggle={handleWishlistToggle}
          />
        );

      case "editProfile":
        return (
          <EditProfileScreen
            onBack={() => setCurrentScreen("profile")}
            profile={profileData}
            profileImage={profileImage}
            onChangeProfileImage={handleProfileImageChange}
            onSaveProfile={handleSaveProfile}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            cartCount={cartCount}
          />
        );

      case "helpSupport":
        return (
          <HelpSupportScreen
            onBack={() => setCurrentScreen("profile")}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            cartCount={cartCount}
          />
        );

      case "notifications":
        return (
          <NotificationsScreen
            onBack={() => setCurrentScreen("profile")}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            onOrdersPress={() => setCurrentScreen("orders")}
            cartCount={cartCount}
          />
        );

      case "aboutNaturyz":
        return (
          <AboutNaturyzScreen
            onBack={() => setCurrentScreen("profile")}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            cartCount={cartCount}
          />
        );
      case "privacyTerms":
        return (
          <PrivacyTermsScreen
            onBack={() => setCurrentScreen("profile")}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            cartCount={cartCount}
            initialTab={privacyTermsInitialTab}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            cartCount={cartCount}
            wishlistCount={wishlistItems.length}
            addressCount={addresses.length}
            onWishlistPress={() => setCurrentScreen("wishlist")}
            onCartPress={openCart}
            onOrdersPress={() => setCurrentScreen("orders")}
            onSavedAddressesPress={() => {
              setAddressReturnScreen("profile");
              setCurrentScreen("addressSelection");
            }}
            onTabPress={handleHomeTabPress}
            profileImage={profileImage}
            onChangeProfileImage={handleProfileImageChange}
            profile={profileData}
            onEditProfilePress={() => setCurrentScreen("editProfile")}
            onSupportPress={() => setCurrentScreen("helpSupport")}
            onNotificationsPress={() => setCurrentScreen("notifications")}
            onAboutPress={() => setCurrentScreen("aboutNaturyz")}
            onPrivacyPress={() => {
              setPrivacyTermsInitialTab("privacy");
              setCurrentScreen("privacyTerms");
            }}
            onTermsPress={() => {
              setPrivacyTermsInitialTab("terms");
              setCurrentScreen("privacyTerms");
            }}
          />
        );

      default:
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Screen not found</Text>
          </View>
        );
    }
  };

  const handleHomeTabPress = (tab) => {
    switch (tab) {
      case "Home":
        setCurrentScreen("home");
        break;

      case "Categories":
        setCurrentScreen("categories");
        break;

      case "Cart":
        openCart();
        break;

      case "Orders":
        setCurrentScreen("orders");
        break;

      case "Search":
        setCurrentScreen("search");
        break;

      case "Profile":
        setCurrentScreen("profile");
        break;

      default:
        console.warn("Unknown tab:", tab);
    }
  };
  const handleSaveProfile = async (updatedProfile) => {
    try {
      await AsyncStorage.setItem(
        "@naturyz_profile_data",
        JSON.stringify(updatedProfile),
      );

      setProfileData(updatedProfile);
      setCurrentScreen("profile");

      Alert.alert("Success", "Your profile has been updated successfully.");
    } catch (error) {
      console.warn("Profile saving failed:", error);
      Alert.alert("Error", "Unable to save your profile. Please try again.");
    }
  };
  const handleCategoriesTabPress = handleHomeTabPress;

  const formatINR = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  // Android Back Gesture / Back Button Handler
  useEffect(() => {
    const handleBackPress = () => {
      // 1. Drawer open hai toh pehle Drawer close karo
      if (drawerVisible) {
        setDrawerVisible(false);
        return true;
      }

      // 2. Main tabs se Back karne par Home open karo
      const mainTabs = [
        "categories",
        "orders",
        "search",
        "profile",
        "wishlist",
      ];

      if (mainTabs.includes(currentScreen)) {
        setCurrentScreen("home");
        return true;
      }

      // 3. Current screen ke according previous screen open karo
      switch (currentScreen) {
        case "home":
          Alert.alert("Exit App", "Are you sure you want to exit NATURYZ?", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Exit",
              style: "destructive",
              onPress: () => BackHandler.exitApp(),
            },
          ]);
          return true;

        case "sportsNutrition":
          setCurrentScreen("categories");
          return true;

        case "productDetails":
          setCurrentScreen(productReturnScreen);
          return true;

        case "cart":
          if (
            [
              "home",
              "categories",
              "orders",
              "search",
              "profile",
              "wishlist",
            ].includes(cartReturnScreen)
          ) {
            setCurrentScreen("home");
          } else {
            setCurrentScreen(cartReturnScreen || "home");
          }
          return true;

        case "addressSelection":
          setCurrentScreen(addressReturnScreen);
          return true;

        case "addressForm":
          setEditingAddress(null);
          setCurrentScreen(addressFormReturnScreen);
          return true;

        case "selectDeliveryAddress":
          setCurrentScreen("cart");
          return true;

        case "payment":
          setCurrentScreen("selectDeliveryAddress");
          return true;

        case "editProfile":
        case "helpSupport":
        case "notifications":
        case "aboutNaturyz":
        case "privacyTerms":
          setCurrentScreen("profile");
          return true;

        default:
          return false;
      }
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress,
    );

    return () => subscription.remove();
  }, [
    currentScreen,
    drawerVisible,
    productReturnScreen,
    cartReturnScreen,
    addressReturnScreen,
    addressFormReturnScreen,
  ]);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={CREAM} barStyle="dark-content" />

      <View style={styles.container}>
        {renderScreen()}

        <DrawerMenu
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          onNavigate={handleDrawerNavigate}
          profile={profileData}
          profileImage={profileImage}
          cartCount={cartCount}
          wishlistCount={wishlistItems.length}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CREAM,
  },

  errorText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "600",
  },
});
