import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
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

const PRIVACY_SECTIONS = [
  {
    id: "collect",
    title: "Information We Collect",
    subtitle: "Details you provide, app usage, and device information.",
    icon: "server-outline",
    details:
      "Information may include details you enter when creating an account, contact information, delivery details, order information and preferences. App and device information may also be collected when required to operate and improve the service.",
  },
  {
    id: "use",
    title: "How We Use Your Information",
    subtitle:
      "To process orders, improve services, and personalize your experience.",
    icon: "shield-checkmark-outline",
    details:
      "Information may be used to manage your account, process and deliver orders, respond to support requests, communicate important service updates and improve the app experience.",
  },
  {
    id: "sharing",
    title: "Information Sharing",
    subtitle: "Information may be shared with service partners when needed.",
    icon: "people-outline",
    details:
      "Information may be shared with service providers involved in payment processing, delivery, hosting and customer support, where necessary to provide the requested services. The applicable sharing practices should be confirmed in the final company policy.",
  },
  {
    id: "security",
    title: "Data Security",
    subtitle: "Measures to help keep your data safe.",
    icon: "lock-closed-outline",
    details:
      "Appropriate technical and organisational safeguards should be used to protect personal information. No digital system can guarantee absolute security. Please contact the support team if you have a security concern.",
  },
  {
    id: "choices",
    title: "Your Choices",
    subtitle: "You can request updates or correction of your information.",
    icon: "options-outline",
    details:
      "You may contact NATURYZ support to ask about accessing or correcting your account information, or to submit a request concerning your personal data, subject to applicable requirements.",
  },
];

const TERMS_SECTIONS = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    subtitle: "Rules for using the NATURYZ app and services.",
    icon: "document-text-outline",
    details:
      "By accessing or using the NATURYZ app, you agree to the applicable terms and policies. If you do not agree, please discontinue use of the app.",
  },
  {
    id: "account",
    title: "Account & Information",
    subtitle: "Keep your account details accurate and up to date.",
    icon: "person-outline",
    details:
      "You are responsible for providing accurate account and contact information and for keeping your account credentials secure. Please contact support if you suspect unauthorised access.",
  },
  {
    id: "orders",
    title: "Orders & Payments",
    subtitle: "Order confirmation, pricing and payment information.",
    icon: "cart-outline",
    details:
      "Product availability, displayed prices, shipping charges and applicable taxes should be reviewed before placing an order. An order may be subject to confirmation and availability.",
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    subtitle: "Delivery timelines and order tracking.",
    icon: "car-outline",
    details:
      "Delivery estimates may vary depending on the delivery location, product availability and courier operations. Order tracking details, where available, will be shared through the app or other communication channels.",
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    subtitle: "Conditions for returns, cancellations and refunds.",
    icon: "refresh-outline",
    details:
      "Return, cancellation and refund eligibility depends on the applicable NATURYZ return policy and the condition of the product. Please contact customer support for assistance before returning an item.",
  },
  {
    id: "products",
    title: "Product Information",
    subtitle: "Read product labels and usage instructions carefully.",
    icon: "leaf-outline",
    details:
      "Product descriptions are provided for general information. Always read the product label, ingredients, directions and warnings. Supplements are not a substitute for a balanced diet or professional medical advice.",
  },
  {
    id: "contact",
    title: "Contact & Support",
    subtitle: "Reach out to NATURYZ for help.",
    icon: "headset-outline",
    details:
      "For questions about these terms or your orders, contact support@naturyz.in or call +91 98765 43210.",
  },
];

export default function PrivacyTermsScreen({
  onBack,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
  initialTab = "privacy",
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [expandedSection, setExpandedSection] = useState(null);

  const isPrivacy = activeTab === "privacy";
  const sections = isPrivacy ? PRIVACY_SECTIONS : TERMS_SECTIONS;

  const selectTab = (tab) => {
    setActiveTab(tab);
    setExpandedSection(null);
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
        >
          {/* TITLE */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>Privacy Policy & Terms</Text>
            <Text style={styles.pageSubtitle}>
              Your privacy and trust are important to us.
            </Text>
          </View>

          {/* HERO BANNER */}
          <View style={styles.heroBanner}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroTitle}>Privacy & Terms</Text>
              <Text style={styles.heroSubtitle}>
                Transparent policies for a safe and trusted shopping experience.
              </Text>
              <View style={styles.heroUnderline} />
            </View>

            <View style={styles.heroArtwork}>
              <View style={styles.heroLeaf}>
                <Ionicons name="leaf" size={65} color="#DDECC5" />
              </View>
              <View style={styles.shieldCircle}>
                <Ionicons name="shield-checkmark" size={91} color={GREEN} />
                <View style={styles.lockOverlay}>
                  <Ionicons name="lock-closed" size={34} color="#FFFFFF" />
                </View>
              </View>
            </View>
          </View>

          {/* TABS */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tabButton, isPrivacy && styles.activeTabButton]}
              onPress={() => selectTab("privacy")}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={isPrivacy ? "#FFFFFF" : GREEN}
              />
              <Text style={[styles.tabText, isPrivacy && styles.activeTabText]}>
                Privacy Policy
              </Text>
            </Pressable>

            <Pressable
              style={[styles.tabButton, !isPrivacy && styles.activeTabButton]}
              onPress={() => selectTab("terms")}
            >
              <Ionicons
                name="document-text-outline"
                size={22}
                color={!isPrivacy ? "#FFFFFF" : GREEN}
              />
              <Text
                style={[styles.tabText, !isPrivacy && styles.activeTabText]}
              >
                Terms & Conditions
              </Text>
            </Pressable>
          </View>

          {/* POLICY CONTENT */}
          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>
              {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
            </Text>

            <Text style={styles.updatedDate}>Last Updated: 27 Oct 2026</Text>

            <Text style={styles.introText}>
              {isPrivacy
                ? "At NATURYZ, we value your privacy. This Privacy Policy explains how information may be collected, used, and protected when you use our app."
                : "These Terms & Conditions describe the general rules for accessing and using the NATURYZ app, shopping services and related features."}
            </Text>

            {sections.map((section) => {
              const expanded = expandedSection === section.id;

              return (
                <View key={section.id} style={styles.sectionItem}>
                  <Pressable
                    style={styles.sectionRow}
                    onPress={() =>
                      setExpandedSection(expanded ? null : section.id)
                    }
                  >
                    <View style={styles.sectionIconBox}>
                      <Ionicons name={section.icon} size={34} color={GREEN} />
                    </View>

                    <View style={styles.sectionText}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      <Text style={styles.sectionSubtitle}>
                        {section.subtitle}
                      </Text>
                    </View>

                    <Ionicons
                      name={expanded ? "chevron-up" : "chevron-forward"}
                      size={23}
                      color={TEXT}
                    />
                  </Pressable>

                  {expanded && (
                    <Text style={styles.sectionDetails}>{section.details}</Text>
                  )}
                </View>
              );
            })}

            {/* INFORMATION NOTE */}
            <View style={styles.infoNote}>
              <Ionicons
                name="information-circle-outline"
                size={34}
                color={GREEN}
              />
              <Text style={styles.infoNoteText}>
                By using the NATURYZ app, you agree to our Privacy Policy and
                Terms & Conditions.
              </Text>
            </View>
          </View>

          {/* READ TERMS / PRIVACY BUTTON */}
          <Pressable
            style={styles.readButton}
            onPress={() => selectTab(isPrivacy ? "terms" : "privacy")}
          >
            <Ionicons name="open-outline" size={26} color={DARK_GREEN} />
            <Text style={styles.readButtonText}>
              {isPrivacy ? "Read Terms & Conditions" : "Read Privacy Policy"}
            </Text>
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
  pageTitle: {
    color: TEXT,
    fontSize: 26,
    fontWeight: "900",
  },
  pageSubtitle: {
    color: MUTED,
    fontSize: 15,
    marginTop: 6,
  },
  heroBanner: {
    minHeight: 171,
    marginHorizontal: 13,
    borderRadius: 21,
    backgroundColor: PALE_GREEN,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  heroCopy: {
    flex: 1.1,
    paddingVertical: 17,
    zIndex: 2,
  },
  heroTitle: {
    color: TEXT,
    fontSize: 25,
    fontWeight: "900",
  },
  heroSubtitle: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  heroUnderline: {
    width: 100,
    height: 4,
    borderRadius: 4,
    backgroundColor: GREEN,
    marginTop: 12,
    transform: [{ rotate: "-4deg" }],
  },
  heroArtwork: {
    flex: 0.9,
    height: 165,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heroLeaf: {
    position: "absolute",
    right: 0,
    top: 0,
    transform: [{ rotate: "-25deg" }],
  },
  shieldCircle: {
    width: 116,
    height: 116,
    borderRadius: 25,
    backgroundColor: "#E4F0D1",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  lockOverlay: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContainer: {
    minHeight: 52,
    marginHorizontal: 13,
    marginTop: 16,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    padding: 2,
  },
  tabButton: {
    flex: 1,
    minWidth: 0,
    borderRadius: 25,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  activeTabButton: {
    backgroundColor: GREEN,
  },
  tabText: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "800",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  contentCard: {
    marginHorizontal: 13,
    marginTop: 17,
    paddingHorizontal: 15,
    paddingTop: 16,
    paddingBottom: 15,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.045,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  contentTitle: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "900",
  },
  updatedDate: {
    color: MUTED,
    fontSize: 14,
    marginTop: 7,
  },
  introText: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    marginBottom: 10,
  },
  sectionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8EB",
  },
  sectionRow: {
    minHeight: 83,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 9,
  },
  sectionIconBox: {
    width: 62,
    height: 62,
    borderRadius: 16,
    backgroundColor: "#EFF7DF",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionText: {
    flex: 1,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "900",
  },
  sectionSubtitle: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  sectionDetails: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 73,
    paddingRight: 8,
    paddingBottom: 14,
  },
  infoNote: {
    marginTop: 15,
    padding: 12,
    borderRadius: 16,
    backgroundColor: PALE_GREEN,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoNoteText: {
    flex: 1,
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
  },
  readButton: {
    minHeight: 60,
    marginHorizontal: 14,
    marginTop: 18,
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  readButtonText: {
    color: DARK_GREEN,
    fontSize: 16,
    fontWeight: "900",
  },
});
