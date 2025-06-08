import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

import { monthlyIncomeOptions } from "../../DataOptions/dataOptions";
import { styles } from "../../style/styles";

export default function UserFamInfo() {
  const navigation = useNavigation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Spouse Info
  const [spouseLastName, setSpouseLastName] = useState("");
  const [spouseFirstName, setSpouseFirstName] = useState("");
  const [spouseMiddleName, setSpouseMiddleName] = useState("");
  const [spouseExtension, setSpouseExtension] = useState("");
  const [spouseOccupation, setSpouseOccupation] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [monthlyIncomeItems, setMonthlyIncomeItems] =
    useState(monthlyIncomeOptions);

  // Children Info
  const [children, setChildren] = useState([]);
  const addChild = () => {
    setChildren([
      ...children,
      { lastName: "", firstName: "", middleName: "", extension: "" },
    ]);
  };
  const updateChild = (index, field, value) => {
    const updated = [...children];
    updated[index][field] = value;
    setChildren(updated);
  };
  const removeChild = (index) => {
    const updated = [...children];
    updated.splice(index, 1);
    setChildren(updated);
  };

  const [errors, setErrors] = useState({});

  const handleNameInput = (text, setter, field) => {
    setter(text);
    setErrors((prev) => ({
      ...prev,
      [field]: text.trim() === "" ? "This field is required." : "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!spouseLastName.trim())
      newErrors.spouseLastName = "Last name is required.";
    if (!spouseFirstName.trim())
      newErrors.spouseFirstName = "First name is required.";
    if (!monthlyIncome) newErrors.monthlyIncome = "Monthly income is required.";
    if (!spouseOccupation.trim())
      newErrors.spouseOccupation = "Occupation is required.";

    children.forEach((child, index) => {
      if (!child.lastName.trim())
        newErrors[`childLastName${index}`] = "Last name is required.";
      if (!child.firstName.trim())
        newErrors[`childFirstName${index}`] = "First name is required.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate("UserEmployment");
    } else {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields correctly."
      );
    }
  };

  const handleBack = () => {
    navigation.navigate("UserEducation");
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/bluebg.png")}
            style={styles.logo}
          />
        </View>

        {/* Title */}
        <Text style={styles.mainTitle}>educare+</Text>

        {/* Navigation Tabs */}
        <View style={styles.navigationTabs}>
          <TouchableOpacity
            onPress={() => navigation.navigate("UserInformation")}
          >
            <Image
              source={require("../../assets/images/active-check.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/long-line.png")}
            style={styles.lineIcon}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("UserEducation")}
          >
            <Image
              source={require("../../assets/images/active-check.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/short-line-active.png")}
            style={styles.lineIcon}
          />
          <TouchableOpacity onPress={() => navigation.navigate("UserFamInfo")}>
            <Image
              source={require("../../assets/images/active-check.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/short-line-active.png")}
            style={styles.lineIcon}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("UserEmployment")}
          >
            <Image
              source={require("../../assets/images/check.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionTitleBox}>
          <Text style={styles.sectionTitleText}>III. Family Information</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* SPOUSE INFO */}
          <Text style={styles.label}>Spouse Name *</Text>

          <TextInput
            style={[styles.input, errors.spouseLastName && styles.errorInput]}
            value={spouseLastName}
            onChangeText={(text) =>
              handleNameInput(text, setSpouseLastName, "spouseLastName")
            }
            placeholder="Enter last name"
          />
          <Text style={styles.label2}>Last Name</Text>
          {errors.spouseLastName && (
            <Text style={styles.errorText}>{errors.spouseLastName}</Text>
          )}

          <TextInput
            style={[styles.input, errors.spouseFirstName && styles.errorInput]}
            value={spouseFirstName}
            onChangeText={(text) =>
              handleNameInput(text, setSpouseFirstName, "spouseFirstName")
            }
            placeholder="Enter first name"
          />
          <Text style={styles.label2}>First Name</Text>
          {errors.spouseFirstName && (
            <Text style={styles.errorText}>{errors.spouseFirstName}</Text>
          )}

          <TextInput
            style={styles.input}
            value={spouseMiddleName}
            onChangeText={setSpouseMiddleName}
            placeholder="Enter middle name (optional)"
          />
          <Text style={styles.label2}>Middle Name (Optional)</Text>

          <TextInput
            style={styles.input}
            value={spouseExtension}
            onChangeText={setSpouseExtension}
            placeholder="Jr., Sr., etc. (optional)"
          />
          <Text style={styles.label2}>Ext. (Jr., Sr., etc.)</Text>

          <Text style={styles.label}>Spouse Monthly Income *</Text>
          <DropDownPicker
            open={openDropdown === "monthlyIncome"}
            value={monthlyIncome}
            items={monthlyIncomeItems}
            setOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "monthlyIncome" : null)
            }
            setValue={setMonthlyIncome}
            setItems={setMonthlyIncomeItems}
            placeholder="Select spouse monthly income"
            style={[styles.dropdown, errors.monthlyIncome && styles.errorInput]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={5000}
            zIndexInverse={4000}
          />
          {errors.monthlyIncome && (
            <Text style={styles.errorText}>{errors.monthlyIncome}</Text>
          )}

          <Text style={styles.label}>Occupation</Text>
          <TextInput
            style={[styles.input, errors.spouseOccupation && styles.errorInput]}
            value={spouseOccupation}
            onChangeText={(text) =>
              handleNameInput(text, setSpouseOccupation, "spouseOccupation")
            }
            placeholder="Occupation"
          />

          {errors.spouseOccupation && (
            <Text style={styles.errorText}>{errors.spouseOccupation}</Text>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={styles.label}>List of Children *</Text>
            <TouchableOpacity
              onPress={addChild}
              style={{
                marginLeft: 10,
                backgroundColor: "#00188D",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>＋</Text>
            </TouchableOpacity>
          </View>

          {/* CHILD FIELDS */}
          {children.map((child, index) => (
            <View
              key={index}
              style={{
                marginBottom: 20,
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label2}>Child {index + 1}</Text>
                <TouchableOpacity
                  onPress={() => removeChild(index)}
                  style={{
                    backgroundColor: "#D9D9D9",
                    borderRadius: 13,
                    width: 25,
                    height: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#000", fontSize: 20 }}>−</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={[
                  styles.input,
                  errors[`childLastName${index}`] && styles.inputError,
                ]}
                value={child.lastName}
                onChangeText={(text) => updateChild(index, "lastName", text)}
                placeholder="Enter last name"
              />
              <Text style={styles.label2}>Last Name</Text>
              {errors[`childLastName${index}`] && (
                <Text style={styles.errorText}>
                  {errors[`childLastName${index}`]}
                </Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  errors[`childFirstName${index}`] && styles.inputError,
                ]}
                value={child.firstName}
                onChangeText={(text) => updateChild(index, "firstName", text)}
                placeholder="Enter first name"
              />
              <Text style={styles.label2}>First Name</Text>
              {errors[`childFirstName${index}`] && (
                <Text style={styles.errorText}>
                  {errors[`childFirstName${index}`]}
                </Text>
              )}

              <TextInput
                style={styles.input}
                value={child.middleName}
                onChangeText={(text) => updateChild(index, "middleName", text)}
                placeholder="Enter middle name (optional)"
              />
              <Text style={styles.label2}>Middle Name (Optional)</Text>

              <TextInput
                style={styles.input}
                value={child.extension}
                onChangeText={(text) => updateChild(index, "extension", text)}
                placeholder="Jr., Sr., etc. (optional)"
              />
              <Text style={styles.label2}>
                Ext. (Jr., Sr., etc.) (Optional)
              </Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#D9D9D9", marginRight: 10, marginLeft: 40 },
              ]}
              onPress={handleBack}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#00188D", marginLeft: 100 },
              ]}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
