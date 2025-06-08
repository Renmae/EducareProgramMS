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

import {
  highestEducationOptions,
  eligibilityOptions,
  collegeDegreeOptions,
} from "../../DataOptions/dataOptions";
import { styles } from "../../style/styles";

export default function UserEducation() {
  const navigation = useNavigation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const [schoolName, setSchoolName] = useState("");
  const [graduate, setGraduate] = useState("");

  const [collegeDegree, setCollegeDegree] = useState(null);
  const [collegeDegreeItems, setCollegeDegreeItems] =
    useState(collegeDegreeOptions);
  const [collegeDegreeOther, setCollegeDegreeOther] = useState("");

  const [highestEducation, setHighestEducation] = useState(null);
  const [highestEducationItems, setHighestEducationItems] = useState(
    highestEducationOptions
  );
  const [highestEducationOther, setHighestEducationOther] = useState("");

  const [eligibility, setEligibility] = useState([]);
  const [eligibilityItems, setEligibilityItems] = useState(eligibilityOptions);
  const [eligibilityOther, setEligibilityOther] = useState("");

  const [errors, setErrors] = useState({});

  const handleNameInput = (text, setter, field) => {
    setter(text);
    if (text.trim() === "") {
      setErrors((prev) => ({ ...prev, [field]: "This field is required." }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleYearInput = (text) => {
    setGraduate(text);
    if (
      !/^\d{4}$/.test(text) ||
      Number(text) < 1900 ||
      Number(text) > new Date().getFullYear()
    ) {
      setErrors((prev) => ({
        ...prev,
        graduate: "Enter a valid 4-digit year.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, graduate: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!schoolName.trim()) newErrors.schoolName = "School name is required.";
    if (!collegeDegree) {
      newErrors.collegeDegree = "College degree is required.";
    } else if (collegeDegree === "Other" && !collegeDegreeOther.trim()) {
      newErrors.collegeDegreeOther = "Please specify your degree.";
    }

    if (!highestEducation) {
      newErrors.highestEducation = "Education level is required.";
    } else if (highestEducation === "Other" && !highestEducationOther.trim()) {
      newErrors.highestEducationOther = "Please specify your education level.";
    }

    if (eligibility.length === 0) {
      newErrors.eligibility = "Eligibility is required.";
    }

    if (
      !graduate ||
      !/^\d{4}$/.test(graduate) ||
      Number(graduate) < 2000 ||
      Number(graduate) > new Date().getFullYear()
    ) {
      newErrors.graduate = "Enter a valid 4-digit year.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate("userFamInfo");
    } else {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields correctly."
      );
    }
  };

  const handleBack = () => {
    navigation.navigate("UserInformation");
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.container}>
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
              source={require("../../assets/images/check.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/short-line.png")}
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
          <Text style={styles.sectionTitleText}>
            II. Educational Attainment
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>
            Name of School (Highest educational attainment) *
          </Text>
          <TextInput
            style={[styles.input, errors.schoolName && styles.errorInput]}
            value={schoolName}
            onChangeText={(text) =>
              handleNameInput(text, setSchoolName, "schoolName")
            }
            placeholder="Enter name of your school"
          />
          {errors.schoolName && (
            <Text style={styles.errorText}>{errors.schoolName}</Text>
          )}

          <Text style={styles.label}>College Degree *</Text>
          <DropDownPicker
            open={openDropdown === "collegeDegree"}
            value={collegeDegree}
            items={collegeDegreeItems}
            setOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "collegeDegree" : null)
            }
            setValue={setCollegeDegree}
            setItems={setCollegeDegreeItems}
            placeholder="Select your college degree"
            style={[styles.dropdown, errors.collegeDegree && styles.errorInput]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={5000}
            zIndexInverse={4000}
          />
          {collegeDegree === "Other" && (
            <TextInput
              style={[
                styles.input,
                errors.collegeDegreeOther && styles.errorInput,
              ]}
              value={collegeDegreeOther}
              onChangeText={(text) =>
                handleNameInput(
                  text,
                  setCollegeDegreeOther,
                  "collegeDegreeOther"
                )
              }
              placeholder="Enter your degree"
            />
          )}
          {errors.collegeDegree && (
            <Text style={styles.errorText}>{errors.collegeDegree}</Text>
          )}
          {errors.collegeDegreeOther && (
            <Text style={styles.errorText}>{errors.collegeDegreeOther}</Text>
          )}

          <Text style={styles.label}>Highest Educational Attainment *</Text>
          <DropDownPicker
            open={openDropdown === "highestEducation"}
            value={highestEducation}
            items={highestEducationItems}
            setOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "highestEducation" : null)
            }
            setValue={setHighestEducation}
            setItems={setHighestEducationItems}
            placeholder="Select highest education"
            style={[
              styles.dropdown,
              errors.highestEducation && styles.errorInput,
            ]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={4000}
            zIndexInverse={3000}
          />
          {highestEducation === "Other" && (
            <TextInput
              style={[
                styles.input,
                errors.highestEducationOther && styles.errorInput,
              ]}
              value={highestEducationOther}
              onChangeText={(text) =>
                handleNameInput(
                  text,
                  setHighestEducationOther,
                  "highestEducationOther"
                )
              }
              placeholder="Enter your education level"
            />
          )}
          {errors.highestEducation && (
            <Text style={styles.errorText}>{errors.highestEducation}</Text>
          )}
          {errors.highestEducationOther && (
            <Text style={styles.errorText}>{errors.highestEducationOther}</Text>
          )}

          <Text style={styles.label}>Year Graduated *</Text>
          <TextInput
            style={[styles.input, errors.graduate && styles.errorInput]}
            value={graduate}
            onChangeText={handleYearInput}
            keyboardType="number-pad"
            placeholder="2024"
            maxLength={4}
          />
          {errors.graduate && (
            <Text style={styles.errorText}>{errors.graduate}</Text>
          )}

          <Text style={styles.label}>
            Eligibility (select all that apply) *
          </Text>
          <DropDownPicker
            multiple={true}
            mode="BADGE"
            min={0}
            max={10}
            open={openDropdown === "eligibility"}
            value={eligibility}
            items={eligibilityItems}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "eligibility" : null)}
            setValue={setEligibility}
            setItems={setEligibilityItems}
            placeholder="Select eligibility certificate(s)"
            style={[styles.dropdown, errors.eligibility && styles.errorInput]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={6000}
            zIndexInverse={5000}
          />
          {errors.eligibility && (
            <Text style={styles.errorText}>{errors.eligibility}</Text>
          )}
        </View>

        {/* Navigation Buttons */}
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
