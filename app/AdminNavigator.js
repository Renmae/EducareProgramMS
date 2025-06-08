import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import Dashboard from "../screen/admin/Dashboard";
import Classroom from "../screen/admin/Classroom";
import Message from "../screen/admin/Message";
import Staff from "../screen/admin/Staff";
import Applicant from "../screen/admin/Applicant";
import Performance from "../screen/admin/Performance";
import Profile from "../screen/admin/Profile";
import Setting from "../screen/admin/Setting";

const Drawer = createDrawerNavigator();

// Static tabs
const tabs = [
  { text: "Dashboard", icon: "view-dashboard-outline", route: "Dashboard" },
  { text: "Classroom", icon: "chart-box-outline", route: "Classroom" },
  { text: "Message", icon: "email-outline", route: "Message" },
  { text: "Profile", icon: "account-circle-outline", route: "Profile" },
  { text: "Setting", icon: "cog-outline", route: "Setting" },
];

function CustomDrawerContent(props) {
  const [expandStaff, setExpandStaff] = useState(false);
  const activeRoute = props.state.routeNames[props.state.index];

  // Auto-expand staff submenu if active
  useEffect(() => {
    if (["Staff", "Applicant"].includes(activeRoute)) {
      setExpandStaff(true);
    }
  }, [activeRoute]);

  const handleNavigate = (route) => {
    props.navigation.navigate(route);
    if (route === "Staff" || route === "Applicant") {
      setExpandStaff(true);
    } else {
      setExpandStaff(false);
    }
  };

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.route}
      onPress={() => handleNavigate(item.route)}
      style={[
        styles.drawerItemCustom,
        activeRoute === item.route && styles.drawerItemActive,
      ]}
    >
      <Icon
        name={item.icon}
        size={25}
        color="#f2f2f1"
        style={styles.drawerIcon}
      />
      <Text style={styles.drawerLabel}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImage}
          />
        </View>
      </View>

      <View style={styles.dividerFaded} />

      {/* Top Tabs */}
      {tabs
        .filter((item) =>
          ["Dashboard", "Classroom", "Message"].includes(item.route)
        )
        .map(renderMenuItem)}

      {/* Staff Nav - looks like normal nav but expands submenu */}
      <TouchableOpacity
        style={[
          styles.drawerItemCustom,
          activeRoute === "Staff" && styles.drawerItemActive,
        ]}
        onPress={() => handleNavigate("Staff")}
      >
        <Icon name="account-group-outline" size={25} color="#f2f2f1" />
        <Text style={styles.drawerLabel}>Staff</Text>
      </TouchableOpacity>

      {expandStaff && (
        <>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => handleNavigate("Staff")}
          >
            <Icon
              name="account-tie-outline"
              size={20}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.subMenuLabel}>Staff Masterlist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => handleNavigate("Applicant")}
          >
            <Icon
              name="account-plus-outline"
              size={20}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.subMenuLabel}>Applicant</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Monitoring */}
      {renderMenuItem({
        text: "Monitoring",
        icon: "monitor-multiple",
        route: "Performance",
      })}

      <View style={[styles.dividerFaded, { marginTop: 30 }]} />

      {/* Bottom Tabs */}
      {tabs
        .filter((item) => ["Setting", "Profile"].includes(item.route))
        .map(renderMenuItem)}
    </DrawerContentScrollView>
  );
}

// Main Navigator
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "permanent",
        swipeEnabled: false,
        gestureEnabled: false,
        drawerStyle: {
          width: 260,
          backgroundColor: "#213594",
          borderRightWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
        },
        sceneContainerStyle: {
          backgroundColor: "#213594",
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Classroom" component={Classroom} />
      <Drawer.Screen name="Message" component={Message} />
      <Drawer.Screen name="Staff" component={Staff} />
      <Drawer.Screen name="Applicant" component={Applicant} />
      <Drawer.Screen name="Performance" component={Performance} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#213594",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 40,
  },
  logoWrapper: {
    overflow: "hidden",
  },
  logoImage: {
    width: 90,
    height: 90,
  },
  drawerItemCustom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  drawerItemActive: {
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "105%",
  },
  drawerLabel: {
    color: "#fff",
    fontSize: 17,
    marginLeft: 60,
    fontFamily: "Inter",
  },
  drawerIcon: {
    width: 10,
  },
  dividerFaded: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 60,
    paddingVertical: 8,
  },
  subMenuLabel: {
    color: "#fff",
    fontSize: 15,
  },
});
