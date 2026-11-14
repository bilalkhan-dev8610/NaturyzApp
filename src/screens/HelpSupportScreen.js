import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  TextInput,
  Modal,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
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

const SUPPORT_PHONE = "+919876543210";
const SUPPORT_EMAIL = "support@naturyz.in";

const FAQS = [
  {
    question: "How can I track my order?",
    answer:
      "Open My Orders from your Profile or the Orders tab. Select your order to view its latest status and tracking details.",
  },
  {
    question: "What is the return and refund policy?",
    answer:
      "For return or refund assistance, contact our support team with your order ID and the reason for your request. Eligibility depends on the product and order conditions.",
  },
  {
    question: "How do I cancel my order?",
    answer:
      "Open My Orders and check whether cancellation is available for your order. If you need help, raise a support request with your order ID.",
  },
  {
    question: "Are the products original and safe?",
    answer:
      "NATURYZ products are presented as authentic products. Please check the product label, ingredients, usage directions and packaging details before use. Contact support if you have a product concern.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can call +91 98765 43210 from 9 AM to 8 PM, Monday to Saturday, or email support@naturyz.in. Email replies are expected within 24 hours.",
  },
  {
    question: "How can I report a payment issue?",
    answer:
      "Share your order ID, payment method, transaction reference and a short description through the support request form or email.",
  },
];

const SUPPORT_CATEGORIES = [
  { id: "order", label: "Order\nSupport", icon: "cube-outline" },
  { id: "returns", label: "Returns &\nRefunds", icon: "sync-outline" },
  { id: "payment", label: "Payment\nIssues", icon: "card-outline" },
  {
    id: "product",
    label: "Product\nInformation",
    icon: "shield-checkmark-outline",
  },
];

export default function HelpSupportScreen({
  onBack,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
}) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [requestVisible, setRequestVisible] = useState(false);
  const [requestCategory, setRequestCategory] = useState("General");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  const openSupportRequest = (category = "General") => {
    setRequestCategory(category);
    setRequestVisible(true);
  };

  const openPhone = async () => {
    try {
      await Linking.openURL(`tel:${SUPPORT_PHONE}`);
    } catch {
      Alert.alert("Unable to Call", "Please try calling +91 98765 43210.");
    }
  };

  const openEmail = async () => {
    try {
      await Linking.openURL(
        `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("NATURYZ Support Request")}`,
      );
    } catch {
      Alert.alert("Email", `Please email us at ${SUPPORT_EMAIL}`);
    }
  };

  const handleSubmitRequest = async () => {
    if (!customerName.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!requestMessage.trim()) {
      Alert.alert("Required", "Please describe your issue.");
      return;
    }

    const subject = `NATURYZ Support - ${requestCategory}`;
    const body = [
      `Name: ${customerName.trim()}`,
      `Email: ${customerEmail.trim()}`,
      `Category: ${requestCategory}`,
      `Order ID: ${orderId.trim() || "Not provided"}`,
      "",
      "Message:",
      requestMessage.trim(),
    ].join("\n");

    const mailUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      await Linking.openURL(mailUrl);
      setRequestVisible(false);
      setCustomerName("");
      setCustomerEmail("");
      setOrderId("");
      setRequestMessage("");
    } catch {
      Alert.alert(
        "Unable to Open Email",
        `Please send your request manually to ${SUPPORT_EMAIL}.`,
      );
    }
  };

  const handleCategoryPress = (category) => {
    openSupportRequest(category.label.replace("\n", " "));
  };

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
          keyboardShouldPersistTaps="handled"
        >
          {/* TITLE */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>Help & Support</Text>
            <Text style={styles.pageSubtitle}>
              We’re here to help you, anytime.
            </Text>
          </View>

          {/* ASSISTANCE BANNER */}
          <View style={styles.heroBanner}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>
                Need{"\n"}Assistance?
              </Text>
              <Text style={styles.heroSubtitle}>
                Get quick support for your orders, products and more.
              </Text>

              <Pressable
                style={styles.chatButton}
                onPress={() => openSupportRequest("Live Chat")}
              >
                <Ionicons
                  name="headset-outline"
                  size={24}
                  color={DARK_GREEN}
                />
                <Text style={styles.chatButtonText}>Chat with Us</Text>
              </Pressable>
            </View>

            <View style={styles.heroIllustration}>
              <View style={styles.heroLeafOne}>
                <Ionicons name="leaf" size={91} color="#E4F0CB" />
              </View>
              <View style={styles.heroPersonCircle}>
                <Ionicons name="headset" size={73} color={DARK_GREEN} />
                <View style={styles.heroPersonDot}>
                  <Ionicons name="chatbubble-ellipses" size={27} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.heroBrand}>NATURYZ</Text>
            </View>
          </View>

          {/* SUPPORT CATEGORIES */}
          <View style={styles.categoryCard}>
            {SUPPORT_CATEGORIES.map((category, index) => (
              <React.Fragment key={category.id}>
                <Pressable
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Ionicons
                    name={category.icon}
                    size={37}
                    color={GREEN}
                  />
                  <Text style={styles.categoryLabel}>
                    {category.label}
                  </Text>
                </Pressable>

                {index !== SUPPORT_CATEGORIES.length - 1 && (
                  <View style={styles.categoryDivider} />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* FAQ HEADER */}
          <View style={styles.faqHeading}>
            <Text style={styles.faqTitle}>
              Frequently Asked Questions (FAQ)
            </Text>

            <Pressable
              style={styles.viewAllButton}
              onPress={() => {
                setShowAllFaqs((previous) => !previous);
                setExpandedFaq(null);
              }}
            >
              <Text style={styles.viewAllText}>
                {showAllFaqs ? "View Less" : "View All"}
              </Text>
              <Ionicons
                name={showAllFaqs ? "chevron-up" : "chevron-forward"}
                size={21}
                color={DARK_GREEN}
              />
            </Pressable>
          </View>

          {/* FAQ ACCORDION */}
          <View style={styles.faqCard}>
            {visibleFaqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;

              return (
                <View
                  key={faq.question}
                  style={[
                    styles.faqItem,
                    index !== visibleFaqs.length - 1 && styles.faqBorder,
                  ]}
                >
                  <Pressable
                    style={styles.faqQuestion}
                    onPress={() =>
                      setExpandedFaq(isExpanded ? null : index)
                    }
                  >
                    <Text style={styles.faqQuestionText}>
                      {faq.question}
                    </Text>
                    <Ionicons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={23}
                      color={TEXT}
                    />
                  </Pressable>

                  {isExpanded && (
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  )}
                </View>
              );
            })}
          </View>

          {/* CONTACT SECTION */}
          <View style={styles.contactCard}>
            <View style={styles.contactHeading}>
              <View>
                <Text style={styles.contactTitle}>Still need help?</Text>
                <Text style={styles.contactSubtitle}>
                  Get in touch with our support team.
                </Text>
              </View>
              <Ionicons
                name="headset-outline"
                size={51}
                color="#DFECC5"
              />
            </View>

            <View style={styles.contactOptions}>
              <Pressable
                style={styles.contactOption}
                onPress={() => openSupportRequest("Live Chat")}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={36}
                  color={GREEN}
                />
                <Text style={styles.contactOptionTitle}>Live Chat</Text>
                <Text style={styles.contactOptionSubtitle}>
                  (Instant Support)
                </Text>
              </Pressable>

              <View style={styles.contactDivider} />

              <Pressable
                style={styles.contactOption}
                onPress={openPhone}
              >
                <Ionicons name="call-outline" size={36} color={GREEN} />
                <Text style={styles.contactOptionTitle}>Call Us</Text>
                <Text style={styles.contactOptionSubtitle}>
                  +91 98765 43210
                </Text>
                <Text style={styles.contactSmallText}>
                  (9 AM – 8 PM, Mon – Sat)
                </Text>
              </Pressable>

              <View style={styles.contactDivider} />

              <Pressable
                style={styles.contactOption}
                onPress={openEmail}
              >
                <Ionicons name="mail-outline" size={36} color={GREEN} />
                <Text style={styles.contactOptionTitle}>Email Us</Text>
                <Text style={styles.contactOptionSubtitle}>
                  support@naturyz.in
                </Text>
                <Text style={styles.contactSmallText}>
                  (We reply within 24 hrs)
                </Text>
              </Pressable>
            </View>
          </View>

          {/* RAISE REQUEST */}
          <Pressable
            style={styles.raiseRequestButton}
            onPress={() => openSupportRequest("General")}
          >
            <Ionicons name="create-outline" size={26} color={DARK_GREEN} />
            <Text style={styles.raiseRequestText}>
              Raise a Support Request
            </Text>
          </Pressable>
        </ScrollView>

        {/* SUPPORT REQUEST MODAL */}
        <Modal
          visible={requestVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setRequestVisible(false)}
        >
          <KeyboardAvoidingView
            style={styles.modalOverlay}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>
                    Raise a Support Request
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    Our team will assist you.
                  </Text>
                </View>

                <Pressable
                  onPress={() => setRequestVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={TEXT} />
                </Pressable>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.modalFieldLabel}>Issue Category</Text>
                <View style={styles.categoryValue}>
                  <Text style={styles.categoryValueText}>
                    {requestCategory}
                  </Text>
                </View>

                <Text style={styles.modalFieldLabel}>Full Name *</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter your name"
                  placeholderTextColor="#999999"
                  value={customerName}
                  onChangeText={setCustomerName}
                />

                <Text style={styles.modalFieldLabel}>Email Address *</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter your email"
                  placeholderTextColor="#999999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={customerEmail}
                  onChangeText={setCustomerEmail}
                />

                <Text style={styles.modalFieldLabel}>Order ID (Optional)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter your order ID"
                  placeholderTextColor="#999999"
                  value={orderId}
                  onChangeText={setOrderId}
                />

                <Text style={styles.modalFieldLabel}>Describe Your Issue *</Text>
                <TextInput
                  style={[styles.modalInput, styles.messageInput]}
                  placeholder="Write your message here..."
                  placeholderTextColor="#999999"
                  multiline
                  textAlignVertical="top"
                  value={requestMessage}
                  onChangeText={setRequestMessage}
                />

                <Pressable
                  style={styles.submitButton}
                  onPress={handleSubmitRequest}
                >
                  <Text style={styles.submitButtonText}>
                    Continue to Email
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </Pressable>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
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
    paddingBottom: 22,
  },
  pageTitle: {
    color: TEXT,
    fontSize: 27,
    fontWeight: "900",
  },
  pageSubtitle: {
    color: MUTED,
    fontSize: 16,
    marginTop: 7,
  },
  heroBanner: {
    minHeight: 204,
    marginHorizontal: 13,
    borderRadius: 22,
    backgroundColor: PALE_GREEN,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingVertical: 16,
  },
  heroTextContainer: {
    flex: 1.15,
    zIndex: 2,
  },
  heroTitle: {
    color: TEXT,
    fontSize: 27,
    lineHeight: 30,
    fontWeight: "900",
  },
  heroSubtitle: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 14,
  },
  chatButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    paddingHorizontal: 13,
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  chatButtonText: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "900",
  },
  heroIllustration: {
    flex: 0.85,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heroLeafOne: {
    position: "absolute",
    right: -9,
    top: -2,
    opacity: 0.8,
    transform: [{ rotate: "-25deg" }],
  },
  heroPersonCircle: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: "#E4EFD0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  heroPersonDot: {
    position: "absolute",
    right: -2,
    bottom: 2,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GREEN,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBrand: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "900",
    marginTop: 6,
  },
  categoryCard: {
    minHeight: 116,
    marginHorizontal: 13,
    marginTop: 18,
    paddingVertical: 13,
    borderRadius: 19,
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
  categoryItem: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  categoryLabel: {
    color: "#454957",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  categoryDivider: {
    width: 1,
    height: 70,
    backgroundColor: "#DFE0E2",
  },
  faqHeading: {
    marginTop: 25,
    marginBottom: 13,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  faqTitle: {
    flex: 1,
    color: TEXT,
    fontSize: 17,
    fontWeight: "900",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  viewAllText: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "900",
  },
  faqCard: {
    marginHorizontal: 14,
    paddingHorizontal: 13,
    paddingVertical: 2,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  faqItem: {
    paddingHorizontal: 5,
  },
  faqBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E7",
  },
  faqQuestion: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  faqQuestionText: {
    flex: 1,
    color: TEXT,
    fontSize: 14,
    fontWeight: "600",
  },
  faqAnswer: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    paddingBottom: 13,
    paddingRight: 18,
  },
  contactCard: {
    marginHorizontal: 13,
    marginTop: 23,
    padding: 12,
    borderRadius: 21,
    backgroundColor: PALE_GREEN,
  },
  contactHeading: {
    minHeight: 75,
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contactTitle: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "900",
  },
  contactSubtitle: {
    color: MUTED,
    fontSize: 14,
    marginTop: 4,
  },
  contactOptions: {
    minHeight: 140,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  contactOption: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 3,
  },
  contactOptionTitle: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "900",
  },
  contactOptionSubtitle: {
    color: MUTED,
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  contactSmallText: {
    color: MUTED,
    fontSize: 9,
    textAlign: "center",
  },
  contactDivider: {
    width: 1,
    height: 92,
    backgroundColor: "#DADDE0",
  },
  raiseRequestButton: {
    minHeight: 62,
    marginHorizontal: 14,
    marginTop: 21,
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  raiseRequestText: {
    color: DARK_GREEN,
    fontSize: 17,
    fontWeight: "900",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    maxHeight: "90%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
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
  modalFieldLabel: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 7,
    marginTop: 11,
  },
  categoryValue: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 11,
    justifyContent: "center",
    paddingHorizontal: 13,
    backgroundColor: PALE_GREEN,
  },
  categoryValueText: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
  },
  modalInput: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 11,
    paddingHorizontal: 13,
    color: TEXT,
    fontSize: 14,
  },
  messageInput: {
    minHeight: 105,
    paddingTop: 12,
  },
  submitButton: {
    minHeight: 53,
    marginTop: 21,
    borderRadius: 14,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});