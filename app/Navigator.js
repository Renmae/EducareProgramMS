import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// ✅ Screens
import TeacherDashboard from "../screen/teacher/TeacherDashboard";
import Enrollment from "../screen/teacher/Enrollment";
import Reports from "../screen/teacher/Reports";
import TeacherCalendar from "../screen/teacher/TeacherCalendar";
import TeacherProfile from "../screen/teacher/TeacherProfile";
import TeacherSetting from "../screen/teacher/TeacherSetting";
import Mail from "../screen/teacher/Mail";

const Drawer = createDrawerNavigator();

// ✅ Drawer Menu Items
const tabs = [
  { text: "Dashboard", icon: "home-outline", route: "TeacherDashboard" },
  { text: "Inbox", icon: "email-outline", route: "Inbox" },
  { text: "Enrollment", icon: "clipboard-outline", route: "Enrollment" },
  { text: "Report", icon: "folder-outline", route: "Reports" },
  { text: "Calendar", icon: "calendar-blank", route: "TeacherCalendar" },
  { text: "Profile", icon: "account-circle-outline", route: "TeacherProfile" },
  { text: "Setting", icon: "cog-outline", route: "TeacherSetting" },
];

// ✅ Custom Drawer
function CustomDrawerContent(props) {
  const activeRoute = props.state.routeNames[props.state.index];

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.route}
      onPress={() => props.navigation.navigate(item.route)}
      style={[
        styles.drawerItemCustom,
        activeRoute === item.route && styles.drawerItemActive,
      ]}
    >
      <Icon name={item.icon} size={22} color="#fff" style={styles.drawerIcon} />
      <Text style={styles.drawerLabel}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImage}
          />
        </View>
      </View>

      <View style={styles.dividerFaded} />
      <Text style={styles.sectionHeader}>MAIN</Text>

      {tabs
        .filter((item) =>
          [
            "TeacherDashboard",
            "Inbox",
            "Enrollment",
            "Reports",
            "TeacherCalendar",
          ].includes(item.route)
        )
        .map(renderMenuItem)}

      <View style={styles.dividerFaded} />
      <Text style={styles.sectionHeader}>USER</Text>

      {tabs
        .filter((item) =>
          ["TeacherProfile", "TeacherSetting"].includes(item.route)
        )
        .map(renderMenuItem)}
    </DrawerContentScrollView>
  );
}

// ✅ Main Drawer Navigator
export default function DrawerNavigator() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleProfilePress = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleNavigateToProfile = () => {
    setModalVisible(false);
    // Navigating manually using ref is optional, for now just log
    console.log("Navigate to profile");
  };

  const handleLogout = () => {
    setModalVisible(false);
    console.log("User logged out");
    // Add logout logic here
  };

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          drawerType: Platform.OS === "web" ? "permanent" : "front",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#E4E6F2",
            height: 60, // ← change this to adjust total header height
          },
          headerRightContainerStyle: {
            marginTop: -40, // ← move avatar up/down within the header
          },
          headerLeftContainerStyle: {
            marginTop: -40, // ← move menu icon up/down within the header
          },
          headerRight: () => (
            <View style={{ marginRight: 20 }}>
              <TouchableOpacity onPress={handleProfilePress}>
                <Image
                  source={require("../assets/images/naga.png")}
                  style={styles.profileCircle}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Drawer.Screen name="TeacherDashboard" component={TeacherDashboard} />
        <Drawer.Screen name="Inbox" component={Mail} />
        <Drawer.Screen name="Enrollment" component={Enrollment} />
        <Drawer.Screen name="Reports" component={Reports} />
        <Drawer.Screen name="TeacherCalendar" component={TeacherCalendar} />
        <Drawer.Screen name="TeacherProfile" component={TeacherProfile} />
        <Drawer.Screen name="TeacherSetting" component={TeacherSetting} />
      </Drawer.Navigator>

      {/* Modal Dropdown */}
      <Modal
  visible={modalVisible}
  transparent
  animationType="fade"
  onRequestClose={handleCloseModal}
>
  <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
    <View style={[styles.dropdownMenu, { marginTop: 30 }]}>
      <TouchableOpacity
        onPress={handleNavigateToProfile}
        style={styles.dropdownItem}
      >
        <Text style={styles.dropdownText}>View Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.dropdownItem}
      >
        <Text style={styles.dropdownText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </Pressable>
</Modal>
    </>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#213594",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logoWrapper: {
    overflow: "hidden",
  },
  logoImage: {
    width: 86,
    height: 86,
  },
  sectionHeader: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 20,
    marginLeft: 30,
    fontWeight: "600",
  },
  drawerItemCustom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 5,
  },
  drawerItemActive: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  drawerLabel: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
    marginLeft: 40,
    fontFamily: "Inter",
  },
  drawerIcon: {
    width: 30,
  },
  dividerFaded: {
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: Platform.OS === "ios" ? 70 : 50,
    paddingRight: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    width: 160,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginTop: 30, 
  },
  dropdownItem: {
    padding: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
});
