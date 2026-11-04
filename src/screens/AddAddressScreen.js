
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#78A900";
const DARK_GREEN = "#578800";
const TEXT = "#151515";
const MUTED = "#666A74";
const BORDER = "#E5E7E2";
const PALE_GREEN = "#F2F8E5";

const ADDRESS_TYPES = [
  { id: "Home", icon: "home-outline" },
  { id: "Work", icon: "briefcase-outline" },
  { id: "Other", icon: "location-outline" },
];

export default function AddAddressScreen({
  onBack,
  onSaveAddress,
  initialAddress = null,
}) {
  const [fullName, setFullName] = useState(initialAddress?.name || "");
  const [phone, setPhone] = useState(
    initialAddress?.phone?.replace(/^\+91\s?/, "") || "",
  );
  const [pincode, setPincode] = useState(initialAddress?.pincode || "");
  const [houseNo, setHouseNo] = useState(initialAddress?.houseNo || "");
  const [addressLine1, setAddressLine1] = useState(
    initialAddress?.addressLine1 || "",
  );
  const [landmark, setLandmark] = useState(initialAddress?.landmark || "");
  const [city, setCity] = useState(initialAddress?.city || "");
  const [state, setState] = useState(initialAddress?.state || "");
  const [type, setType] = useState(initialAddress?.type || "Home");
  const [isDefault, setIsDefault] = useState(
    initialAddress?.isDefault || false,
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    if (!houseNo.trim()) {
      newErrors.houseNo = "House / Flat number is required.";
    }

    if (!addressLine1.trim()) {
      newErrors.addressLine1 = "Street / Area is required.";
    }

    if (!city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!state.trim()) {
      newErrors.state = "State is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert(
        "Incomplete Address",
        "Please check the highlighted fields and enter valid details.",
      );
      return;
    }

    const address = {
      id: initialAddress?.id || `address_${Date.now()}`,
      name: fullName.trim(),
      phone: `+91 ${phone.trim()}`,
      pincode: pincode.trim(),
      houseNo: houseNo.trim(),
      addressLine1: addressLine1.trim(),
      landmark: landmark.trim(),
      city: city.trim(),
      state: state.trim(),
      type,
      isDefault,
    };

    onSaveAddress?.(address);
  };

  const renderInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    keyboardType = "default",
    maxLength,
    optional = false,
    autoCapitalize = "words",
  }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>
        {label}
        {optional && <Text style={styles.optionalText}> (Optional)</Text>}
      </Text>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A1A3A8"
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={onBack} style={styles.backButton} hitSlop={8}>
            <Ionicons name="arrow-back" size={29} color={TEXT} />
          </Pressable>

          <Text style={styles.headerTitle}>
            {initialAddress ? "Edit Address" : "Add New Address"}
          </Text>

          <View style={styles.headerRight} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.pageTitle}>
            Delivery Address
          </Text>

          <Text style={styles.pageSubtitle}>
            Enter your details so we can deliver your order to the right place.
          </Text>

          {/* CONTACT DETAILS */}
          <Text style={styles.sectionTitle}>Contact Details</Text>

          {renderInput({
            label: "Full Name",
            value: fullName,
            onChangeText: setFullName,
            placeholder: "Enter your full name",
            error: errors.fullName,
          })}

          <View style={styles.phoneInputContainer}>
            <Text style={styles.fieldLabel}>Mobile Number</Text>

            <View
              style={[
                styles.phoneInput,
                errors.phone && styles.inputError,
              ]}
            >
              <Text style={styles.countryCode}>+91</Text>

              <View style={styles.phoneDivider} />

              <TextInput
                style={styles.phoneTextInput}
                value={phone}
                onChangeText={(value) =>
                  setPhone(value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor="#A1A3A8"
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>

            {!!errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          {/* ADDRESS DETAILS */}
          <Text style={styles.sectionTitle}>Address Details</Text>

          {renderInput({
            label: "Pincode",
            value: pincode,
            onChangeText: (value) =>
              setPincode(value.replace(/\D/g, "").slice(0, 6)),
            placeholder: "Enter 6-digit pincode",
            error: errors.pincode,
            keyboardType: "number-pad",
            maxLength: 6,
          })}

          {renderInput({
            label: "House / Flat / Building Number",
            value: houseNo,
            onChangeText: setHouseNo,
            placeholder: "e.g. H.No. 123, Flat 4B",
            error: errors.houseNo,
          })}

          {renderInput({
            label: "Street / Area / Locality",
            value: addressLine1,
            onChangeText: setAddressLine1,
            placeholder: "Enter street, area or locality",
            error: errors.addressLine1,
          })}

          {renderInput({
            label: "Landmark",
            value: landmark,
            onChangeText: setLandmark,
            placeholder: "Nearby landmark",
            optional: true,
          })}

          {renderInput({
            label: "City",
            value: city,
            onChangeText: setCity,
            placeholder: "Enter city",
            error: errors.city,
          })}

          {renderInput({
            label: "State",
            value: state,
            onChangeText: setState,
            placeholder: "Enter state",
            error: errors.state,
          })}

          {/* ADDRESS TYPE */}
          <Text style={styles.sectionTitle}>Save Address As</Text>

          <View style={styles.typeContainer}>
            {ADDRESS_TYPES.map((item) => {
              const selected = type === item.id;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => setType(item.id)}
                  style={[
                    styles.typeButton,
                    selected && styles.typeButtonSelected,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={selected ? DARK_GREEN : MUTED}
                  />

                  <Text
                    style={[
                      styles.typeButtonText,
                      selected && styles.typeButtonTextSelected,
                    ]}
                  >
                    {item.id}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* DEFAULT ADDRESS */}
          <Pressable
            style={styles.defaultRow}
            onPress={() => setIsDefault(!isDefault)}
          >
            <View
              style={[
                styles.checkbox,
                isDefault && styles.checkboxSelected,
              ]}
            >
              {isDefault && (
                <Ionicons name="checkmark" size={17} color="#FFFFFF" />
              )}
            </View>

            <View style={styles.defaultTextContainer}>
              <Text style={styles.defaultTitle}>
                Set as Default Address
              </Text>
              <Text style={styles.defaultSubtitle}>
                Use this address automatically for future orders.
              </Text>
            </View>
          </Pressable>

          {/* SAVE BUTTON */}
          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.saveButtonText}>
              {initialAddress ? "Update Address" : "Save Address"}
            </Text>

            <Ionicons name="arrow-forward" size={23} color="#FFFFFF" />
          </Pressable>

          <View style={styles.bottomSpace} />
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
    height: 58,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  backButton: {
    width: 40,
    height: 45,
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 19,
    fontWeight: "900",
    color: TEXT,
  },
  headerRight: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 25,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: TEXT,
  },
  pageSubtitle: {
    fontSize: 14,
    color: MUTED,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 25,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 17,
  },
  fieldContainer: {
    marginBottom: 17,
  },
  fieldLabel: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },
  optionalText: {
    color: MUTED,
    fontWeight: "500",
  },
  input: {
    height: 53,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: TEXT,
    fontSize: 15,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#D94B4B",
  },
  errorText: {
    color: "#D94B4B",
    fontSize: 12,
    marginTop: 5,
  },
  phoneInputContainer: {
    marginBottom: 17,
  },
  phoneInput: {
    height: 53,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  countryCode: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "800",
  },
  phoneDivider: {
    width: 1,
    height: 25,
    backgroundColor: BORDER,
    marginHorizontal: 13,
  },
  phoneTextInput: {
    flex: 1,
    height: "100%",
    color: TEXT,
    fontSize: 15,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  typeButton: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  typeButtonSelected: {
    borderColor: GREEN,
    backgroundColor: PALE_GREEN,
  },
  typeButtonText: {
    color: MUTED,
    fontSize: 14,
    fontWeight: "700",
  },
  typeButtonTextSelected: {
    color: DARK_GREEN,
    fontWeight: "900",
  },
  defaultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 23,
    marginBottom: 27,
    gap: 12,
  },
  checkbox: {
    width: 23,
    height: 23,
    borderWidth: 1.5,
    borderColor: "#999DA4",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  defaultTextContainer: {
    flex: 1,
  },
  defaultTitle: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "900",
  },
  defaultSubtitle: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  saveButton: {
    height: 59,
    backgroundColor: GREEN,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  buttonPressed: {
    opacity: 0.82,
  },
  bottomSpace: {
    height: 15,
  },
});
