import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import TopNavbar from "../components/TopNavbar";

const GREEN = "#78A900";
const DARK_GREEN = "#578800";
const TEXT = "#151515";
const MUTED = "#555966";
const BORDER = "#D9D9DF";
const PALE_GREEN = "#F2F8E5";

const GENDERS = ["Male", "Female", "Other"];

const FITNESS_GOALS = [
  "Muscle Gain",
  "Weight Loss",
  "General Health",
  "Sports Performance",
  "Immunity",
];

const DEFAULT_PROFILE = {
  name: "Bilal Khan",
  email: "bilal.khan@email.com",
  phone: "+91 98765 43210",
  dateOfBirth: "2004-06-15",
  gender: "Male",
  fitnessGoals: ["Muscle Gain"],
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function EditProfileScreen({
  onBack,
  profile = DEFAULT_PROFILE,
  profileImage,
  onChangeProfileImage,
  onSaveProfile,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
}) {
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(
    (profile.phone || "").replace(/^\+91\s?/, ""),
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    profile.dateOfBirth || "2004-06-15",
  );
  const [gender, setGender] = useState(profile.gender || "Male");
  const [fitnessGoals, setFitnessGoals] = useState(
    Array.isArray(profile.fitnessGoals) ? profile.fitnessGoals : [],
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const selectedDate = dateOfBirth
    ? new Date(`${dateOfBirth}T00:00:00`)
    : new Date(2004, 5, 15);

  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow gallery access to change your profile photo.",
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
      console.warn("Profile photo selection failed:", error);
      Alert.alert("Error", "Unable to select your profile photo.");
    }
  };

  const handleDateChange = (event, selectedDateValue) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed" || !selectedDateValue) {
      return;
    }

    const year = selectedDateValue.getFullYear();
    const month = String(selectedDateValue.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDateValue.getDate()).padStart(2, "0");

    setDateOfBirth(`${year}-${month}-${day}`);
  };

  const toggleFitnessGoal = (goal) => {
    setFitnessGoals((previous) =>
      previous.includes(goal)
        ? previous.filter((item) => item !== goal)
        : [...previous, goal],
    );
  };

  const handleUpdateProfile = () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanName) {
      Alert.alert("Required", "Please enter your full name.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (cleanPhone.length !== 10) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit mobile number.",
      );
      return;
    }

    const updatedProfile = {
      name: cleanName,
      email: cleanEmail,
      phone: `+91 ${cleanPhone}`,
      dateOfBirth,
      gender,
      fitnessGoals,
    };

    onSaveProfile?.(updatedProfile);
  };

  const renderInput = ({
    label,
    icon,
    value,
    onChangeText,
    keyboardType = "default",
    autoCapitalize = "sentences",
    editable = true,
    maxLength,
  }) => (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>
        {label} <Text style={styles.required}>*</Text>
      </Text>

      <View style={[styles.inputContainer, !editable && styles.disabledInput]}>
        <Ionicons name={icon} size={25} color={MUTED} />

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          maxLength={maxLength}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#999999"
        />
      </View>
    </View>
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
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.pageTitle}>Edit Profile</Text>

          {/* PROFILE PHOTO */}
          <View style={styles.photoBanner}>
            <View style={styles.photoWrapper}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profilePhoto}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoInitials}>
                    {(name || "BK")
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </Text>
                </View>
              )}

              <Pressable style={styles.photoCamera} onPress={handlePickImage}>
                <Ionicons name="camera-outline" size={25} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          {/* FULL NAME */}
          {renderInput({
            label: "Full Name",
            icon: "person-outline",
            value: name,
            onChangeText: setName,
          })}

          {/* EMAIL */}
          {renderInput({
            label: "Email Address",
            icon: "mail-outline",
            value: email,
            onChangeText: setEmail,
            keyboardType: "email-address",
            autoCapitalize: "none",
          })}

          {/* PHONE */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={25} color={MUTED} />
              <Text style={styles.countryCode}>+91</Text>

              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={(value) =>
                  setPhone(value.replace(/\D/g, "").slice(0, 10))
                }
                keyboardType="phone-pad"
                maxLength={10}
                placeholder="Enter mobile number"
                placeholderTextColor="#999999"
              />
            </View>
          </View>

          {/* DATE OF BIRTH */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>

            <Pressable
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={25} color={MUTED} />

              <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>

              <Ionicons name="chevron-down" size={23} color={TEXT} />
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                maximumDate={new Date()}
                onChange={handleDateChange}
              />
            )}

            {Platform.OS === "ios" && showDatePicker && (
              <Pressable
                style={styles.dateDoneButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.dateDoneText}>Done</Text>
              </Pressable>
            )}
          </View>

          {/* GENDER */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Gender</Text>

            <View style={styles.genderRow}>
              {GENDERS.map((item) => {
                const selected = gender === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setGender(item)}
                    style={[
                      styles.genderOption,
                      selected && styles.selectedOption,
                    ]}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        selected && styles.radioSelected,
                      ]}
                    >
                      {selected && <View style={styles.radioInner} />}
                    </View>

                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.selectedOptionText,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* FITNESS GOALS */}
          <View style={styles.goalsSection}>
            <Text style={styles.fieldLabel}>
              Fitness Goal <Text style={styles.optional}>(Optional)</Text>
            </Text>

            <View style={styles.goalsContainer}>
              {FITNESS_GOALS.map((goal) => {
                const selected = fitnessGoals.includes(goal);

                return (
                  <Pressable
                    key={goal}
                    onPress={() => toggleFitnessGoal(goal)}
                    style={[
                      styles.goalChip,
                      selected && styles.selectedGoalChip,
                    ]}
                  >
                    {selected && (
                      <Ionicons name="checkmark" size={20} color={DARK_GREEN} />
                    )}

                    <Text
                      style={[
                        styles.goalText,
                        selected && styles.selectedGoalText,
                      ]}
                    >
                      {goal}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* UPDATE BUTTON */}
        <View style={styles.bottomContainer}>
          <Pressable style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </Pressable>
        </View>
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
    paddingHorizontal: 13,
    paddingBottom: 20,
  },
  pageTitle: {
    color: TEXT,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 17,
    marginBottom: 23,
  },
  photoBanner: {
    height: 158,
    borderRadius: 21,
    backgroundColor: "#F5F9E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  photoWrapper: {
    width: 132,
    height: 132,
    position: "relative",
  },
  profilePhoto: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  photoPlaceholder: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "#E5EFD4",
    alignItems: "center",
    justifyContent: "center",
  },
  photoInitials: {
    color: DARK_GREEN,
    fontSize: 38,
    fontWeight: "900",
  },
  photoCamera: {
    position: "absolute",
    right: -6,
    bottom: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GREEN,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldGroup: {
    marginBottom: 21,
  },
  fieldLabel: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 9,
  },
  required: {
    color: "#D71920",
  },
  optional: {
    fontWeight: "500",
  },
  inputContainer: {
    minHeight: 55,
    borderWidth: 1.4,
    borderColor: BORDER,
    borderRadius: 13,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    backgroundColor: "#FFFFFF",
  },
  disabledInput: {
    backgroundColor: "#F8F8F8",
  },
  input: {
    flex: 1,
    color: TEXT,
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 10,
  },
  countryCode: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "700",
  },
  dateText: {
    flex: 1,
    color: TEXT,
    fontSize: 16,
    fontWeight: "500",
  },
  dateDoneButton: {
    alignSelf: "flex-end",
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  dateDoneText: {
    color: DARK_GREEN,
    fontSize: 15,
    fontWeight: "800",
  },
  genderRow: {
    flexDirection: "row",
    gap: 8,
  },
  genderOption: {
    flex: 1,
    minHeight: 53,
    borderWidth: 1.3,
    borderColor: BORDER,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: PALE_GREEN,
    borderColor: "#E3F0C7",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.8,
    borderColor: "#9297A1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: GREEN,
    borderWidth: 2.5,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: GREEN,
  },
  optionText: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "600",
  },
  selectedOptionText: {
    color: DARK_GREEN,
    fontWeight: "900",
  },
  goalsSection: {
    marginTop: 1,
    marginBottom: 17,
  },
  goalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },
  goalChip: {
    minHeight: 46,
    borderWidth: 1.3,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  selectedGoalChip: {
    borderColor: GREEN,
    backgroundColor: "#FBFFF5",
  },
  goalText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "500",
  },
  selectedGoalText: {
    color: DARK_GREEN,
    fontWeight: "800",
  },
  bottomContainer: {
    paddingHorizontal: 13,
    paddingTop: 9,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  updateButton: {
    minHeight: 57,
    borderRadius: 16,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
});
