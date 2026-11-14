
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#83AE12";
const DARK_GREEN = "#56880B";

const TABS = [
  {
    label: "Home",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    label: "Categories",
    icon: "grid-outline",
    activeIcon: "grid",
  },
  {
    label: "Search",
    icon: "search-outline",
    activeIcon: "search",
  },
  {
    label: "Orders",
    icon: "cube-outline",
    activeIcon: "cube",
  },
  {
    label: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
];

export default function BottomTabBar({
  activeTab,
  onTabPress,
}) {
  return (
    <View style={styles.bottomNavigation}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.label;

        return (
          <Pressable
            key={tab.label}
            style={styles.tabItem}
            onPress={() => onTabPress?.(tab.label)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
          >
            <View
              style={[
                styles.tabIconContainer,
                isActive && styles.activeTabContainer,
              ]}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={27}
                color={isActive ? DARK_GREEN : "#111111"}
              />
            </View>

            <Text
              style={[
                styles.tabLabel,
                isActive && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingHorizontal: 5,
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },

  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  tabIconContainer: {
    width: 57,
    height: 37,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  activeTabContainer: {
    backgroundColor: "#F0F6DE",
  },

  tabLabel: {
    color: "#171717",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },

  activeTabLabel: {
    color: DARK_GREEN,
    fontWeight: "800",
  },
});
