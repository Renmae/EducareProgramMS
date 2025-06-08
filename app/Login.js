import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Admin", value: "admin" },
    { label: "Teacher", value: "teacher" },
  ]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Demo credentials
  const teacherProfiles = {
    teacher1: { password: "12345", hasCompletedInfo: false },
    teacher2: { password: "abcde", hasCompletedInfo: true },
  };

  const handleLogin = () => {
    if (!value || !username || !password) {
      Alert.alert("Missing Fields", "Please fill all fields.");
      return;
    }
  
    if (value === "admin") {
      if (username === "admin" && password === "adminpass") {
        if (Platform.OS === "web") {
          navigation.reset({
            index: 0,
            routes: [{ name: "AdminNavigator" }], // this should be your permanent web navigator
          });
        } else {
          Alert.alert("Access Denied", "Admin is only accessible via web.");
        }
      } else {
        Alert.alert("Login Failed", "Invalid admin credentials.");
      }
    } else if (value === "teacher") {
      const user = teacherProfiles[username];
      if (user && user.password === password) {
        if (!user.hasCompletedInfo) {
          navigation.navigate("UserInformation", { username });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Navigator", params: { username } }],
          });
        }
      } else {
        Alert.alert("Login Failed", "Invalid teacher credentials.");
      }
    }
  };
    

  // Web-specific layout
  if (Platform.OS === "web") {
    return (
      <View style={styles.webBorder}>
        <View style={styles.webContainer}>
          <View style={styles.webRow}>
            <View style={styles.webLeft}>
              <Image
                source={require("../assets/images/bluebg.png")}
                style={styles.webImage}
              />
              <Text style={styles.appTitleWeb}>educare+</Text>
            </View>

            <View style={styles.webRight}>
              <View style={styles.FormRight}>
                <Text style={styles.signin}>Sign in</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Select Role"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
                <Text style={styles.appText}>Username</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
                <Text style={styles.appText}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <Text style={styles.label2}>Forgot Password?</Text>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#00188D" }]}
                  onPress={handleLogin}
                >
                  <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Mobile layout
  return (
    <ScrollView contentContainerStyle={styles.appContainer}>
      <View style={styles.imageCenter}>
        <Image
          source={require("../assets/images/bluebg.png")}
          style={styles.imageLeft}
        />
      </View>
      <Text style={styles.appTitle}>educare+</Text>
      <View style={styles.appLogin}>
        <Text style={styles.signin}>Sign in</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select Role"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
        <Text style={styles.appText}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.appText}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label2}>Forgot Password?</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#00188D" }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Shared Styles
  appTitle: {
    color: "#00188D",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    font: "Inter",
    textShadowColor: "#999",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  appLogin: {
    width: 300,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D9D9D9",
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  textInput: {
    width: "100%",
    padding: 13,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },

  appText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginBottom: 5,
    color: "#333",
    fontWeight: "500",
  },
  signin: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00188D",
    marginBottom: 30,
    marginTop: 20,
    alignSelf: "center",
  },
  label2: {
    fontSize: 12,
    color: "#00188D",
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop: -15,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
  dropdown: {
    borderColor: "#D9D9D9",
    height: 55,
    width: "100%",
    marginBottom: 20,
    fontSize: 16,
  },
  dropdownContainer: {
    borderColor: "#D9D9D9",
    width: "100%",
  },

  // Mobile Specific
  appContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    alignItems: "center",
  },
  imageCenter: {
    justifyContent: "center",
  },
  imageLeft: {
    width: 150,
    height: 150,
  },

  // Web Specific

  webBorder: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    marginTop: 45,
    marginHorizontal: "auto",
    width: 900,
    height: 500,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },

  webRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  webContainer: {
    height: "70%",
    width: "70%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  FormRight: {
    width: 400,
    maxWidth: 500,
    alignItems: "center",
    padding: 20,
    marginLeft: 190,
  },

  webLeft: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
  },
  webRight: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  webImage: {
    width: 200,
    height: 200,
  },
  appTitleWeb: {
    color: "#00188D",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    font: "Inter",
    textShadowColor: "#999",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
});
