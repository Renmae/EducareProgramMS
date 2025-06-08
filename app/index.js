import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Navigator from "./Navigator";
import UserInformation from "../screen/teacher/UserInformation";
import UserEducation from "../screen/teacher/UserEducation";
import UserFamInfo from "../screen/teacher/UserFamInfo";
import UserEmployment from "../screen/teacher/UserEmployment";
import { enableScreens } from "react-native-screens";
import TeacherDashboard from "../screen/teacher/TeacherDashboard";
import Enrollment from "../screen/teacher/Enrollment";
import Reports from "../screen/teacher/Reports";
import TeacherCalendar from "../screen/teacher/TeacherCalendar";
import TeacherProfile from "../screen/teacher/TeacherProfile";
import TeacherSetting from "../screen/teacher/TeacherSetting";
import Mail from "../screen/teacher/Mail";
import Classroom from "../screen/admin/Classroom";
import Staff from "../screen/admin/Staff";
import Dashboard from "../screen/admin/Dashboard";
import Message from "../screen/admin/Message";
import Performance from "../screen/admin/Performance";
import Setting from "../screen/admin/Setting";
import Profile from "../screen/admin/Profile";
import AdminNavigator from "./AdminNavigator";

enableScreens(); // Performance boost

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Navigator"
        component={Navigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserInformation"
        component={UserInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserEducation"
        component={UserEducation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserFamInfo"
        component={UserFamInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserEmployment"
        component={UserEmployment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeacherDashboard"
        component={TeacherDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Enrollment"
        component={Enrollment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeacherCalendar"
        component={TeacherCalendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeacherProfile"
        component={TeacherProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeacherSetting"
        component={TeacherSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Mail"
        component={Mail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Classroom"
        component={Classroom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Staff"
        component={Staff}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Performance"
        component={Performance}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminNavigator"
        component={AdminNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
