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
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";

import {
  civilStatusOptions,
  religionOptions,
  cityMunicipalityOptions,
  provinceOptions,
  nationalityOptions,
  regionOptions,
  barangayOptions,
} from "../../DataOptions/dataOptions";
import { styles } from "../../style/styles";

export default function UserInformation() {
  const navigation = useNavigation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Personal Information States
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [extension, setExtension] = useState("");
  const [selectedSex, setSelectedSex] = useState(null);
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Dropdown States
  const [civilStatus, setCivilStatus] = useState(null);
  const [civilStatusItems, setCivilStatusItems] = useState(civilStatusOptions);
  const [religion, setReligion] = useState(null);
  const [religionItems, setReligionItems] = useState(religionOptions);

  // Birthplace States
  const [birthplaceCity, setBirthplaceCity] = useState(null);
  const [birthplaceCityItems, setBirthplaceCityItems] = useState(
    cityMunicipalityOptions
  );
  const [birthplaceProvince, setBirthplaceProvince] = useState(null);
  const [birthplaceProvinceItems, setBirthplaceProvinceItems] =
    useState(provinceOptions);

  // Contact Information States
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [nationality, setNationality] = useState(null);
  const [nationalityItems, setNationalityItems] = useState(nationalityOptions);
  const [emergencyNumber, setEmergencyNumber] = useState("");

  // Address States
  const [street, setStreet] = useState("");
  const [barangayAddress, setBarangayAddress] = useState(null);
  const [barangayAddressItems, setBarangayAddressItems] =
    useState(barangayOptions);
  const [cityAddress, setCityAddress] = useState(null);
  const [cityAddressItems, setCityAddressItems] = useState(
    cityMunicipalityOptions
  );
  const [provinceAddress, setProvinceAddress] = useState(null);
  const [provinceAddressItems, setProvinceAddressItems] =
    useState(provinceOptions);
  const [regionAddress, setRegionAddress] = useState(null);
  const [regionAddressItems, setRegionAddressItems] = useState(regionOptions);

  // Validation States
  const [errors, setErrors] = useState({});

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const age = calculateAge(selectedDate);
      if (age > 35) {
        setErrors((prev) => ({
          ...prev,
          birthday: "Applicant must not be older than 35 years old.",
        }));
      } else {
        setBirthday(selectedDate);
        setErrors((prev) => ({
          ...prev,
          birthday: "", // clear the error
        }));
      }
    }
    setShowDatePicker(false);
  };

  // Text-only validation for names
  const validateTextOnly = (text) => {
    const textRegex = /^[a-zA-Z\s]*$/;
    return textRegex.test(text);
  };

  // Handle name inputs (Last Name, First Name)
  const handleNameInput = (text, setter, fieldName) => {
    if (validateTextOnly(text) || text === "") {
      setter(text);
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: null }));
      }
    }
  };

  // Handle contact number (must start with 9)
  const handleContactInput = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
    setContactNumber(cleaned);

    if (cleaned.length > 0 && !cleaned.startsWith("9")) {
      setErrors((prev) => ({
        ...prev,
        contactNumber: "Contact number must start with 9",
      }));
    } else if (errors.contactNumber) {
      setErrors((prev) => ({ ...prev, contactNumber: null }));
    }
  };

  // Handle emergency number (must start with 9)
  const handleEmergencyInput = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
    setEmergencyNumber(cleaned);

    if (cleaned.length > 0 && !cleaned.startsWith("9")) {
      setErrors((prev) => ({
        ...prev,
        emergencyNumber: "Emergency number must start with 9",
      }));
    } else if (errors.emergencyNumber) {
      setErrors((prev) => ({ ...prev, emergencyNumber: null }));
    }
  };

  // Handle email validation
  const handleEmailInput = (text) => {
    setEmailAddress(text);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text.length > 0 && !emailRegex.test(text)) {
      setErrors((prev) => ({
        ...prev,
        emailAddress: "Please enter a valid email format (example@email.com)",
      }));
    } else if (errors.emailAddress) {
      setErrors((prev) => ({ ...prev, emailAddress: null }));
    }
  };

  // Handle address selection for birthplace
  const handleBirthplaceSelection = (value, type) => {
    if (type === "city") {
      setBirthplaceCity(value);
      const selectedCity = cityMunicipalityOptions.find(
        (city) => city.value === value
      );
      if (selectedCity && selectedCity.label !== "Naga City") {
        const outsideNagaProvince = provinceOptions.find(
          (prov) => prov.label === "Outside Naga"
        );
        if (outsideNagaProvince) {
          setBirthplaceProvince(outsideNagaProvince.value);
        }
      }
    } else if (type === "province") {
      setBirthplaceProvince(value);
    }
  };

  // Handle address selection for home address
  const handleAddressSelection = (value, type) => {
    if (type === "city") {
      setCityAddress(value);
      const selectedCity = cityMunicipalityOptions.find(
        (city) => city.value === value
      );
      if (selectedCity && selectedCity.label !== "Naga City") {
        const outsideNagaProvince = provinceOptions.find(
          (prov) => prov.label === "Outside Naga"
        );
        if (outsideNagaProvince) {
          setProvinceAddress(outsideNagaProvince.value);
        }
      }
    }
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required text fields
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!firstName.trim()) newErrors.firstName = "First name is required";

    // Optional fields validation (only validate format if filled)
    if (middleName && !validateTextOnly(middleName)) {
      newErrors.middleName = "Middle name should contain only letters";
    }
    if (extension && !validateTextOnly(extension)) {
      newErrors.extension = "Extension should contain only letters";
    }

    // Sex validation
    if (!selectedSex) newErrors.selectedSex = "Please select sex";

    // Birthplace validation
    if (!birthplaceCity)
      newErrors.birthplaceCity = "Birthplace city is required";
    if (!birthplaceProvince)
      newErrors.birthplaceProvince = "Birthplace province is required";

    // Contact number validation
    if (!contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!contactNumber.startsWith("9")) {
      newErrors.contactNumber = "Contact number must start with 9";
    } else if (contactNumber.length !== 10) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }

    // Email validation
    if (!emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailAddress)) {
        newErrors.emailAddress = "Please enter a valid email format";
      }
    }

    // Emergency number validation
    if (!emergencyNumber.trim()) {
      newErrors.emergencyNumber = "Emergency number is required";
    } else if (!emergencyNumber.startsWith("9")) {
      newErrors.emergencyNumber = "Emergency number must start with 9";
    } else if (emergencyNumber.length !== 10) {
      newErrors.emergencyNumber = "Emergency number must be 10 digits";
    }

    // Address validation
    if (!street.trim()) newErrors.street = "Street address is required";
    if (!barangayAddress) newErrors.barangayAddress = "Barangay is required";
    if (!cityAddress) newErrors.cityAddress = "City/Municipality is required";
    if (!provinceAddress) newErrors.provinceAddress = "Province is required";
    if (!regionAddress) newErrors.regionAddress = "Region is required";

    // Civil Status validation
    if (!civilStatus) newErrors.civilStatus = "Civil status is required";

    // Religion validation
    if (!religion) newErrors.religion = "Religion is required";

    // Nationality validation
    if (!nationality) newErrors.nationality = "Nationality is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate("UserEducation");
    } else {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields correctly."
      );
    }
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
              source={require("../../assets/images/check.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/short-line.png")}
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
            I. Identifying Information
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Name Fields */}
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={[styles.input, errors.lastName && styles.errorInput]}
            value={lastName}
            onChangeText={(text) =>
              handleNameInput(text, setLastName, "lastName")
            }
            placeholder="Enter last name"
          />
          <Text style={styles.label2}>Last Name</Text>
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}

          <TextInput
            style={[styles.input, errors.firstName && styles.errorInput]}
            value={firstName}
            onChangeText={(text) =>
              handleNameInput(text, setFirstName, "firstName")
            }
            placeholder="Enter first name"
          />
          <Text style={styles.label2}>First Name</Text>
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}

          <TextInput
            style={[styles.input, errors.middleName && styles.errorInput]}
            value={middleName}
            onChangeText={(text) =>
              handleNameInput(text, setMiddleName, "middleName")
            }
            placeholder="Enter middle name (optional)"
          />
          <Text style={styles.label2}>Middle Name (Optional)</Text>
          {errors.middleName && (
            <Text style={styles.errorText}>{errors.middleName}</Text>
          )}

          <TextInput
            style={[styles.input, errors.extension && styles.errorInput]}
            value={extension}
            onChangeText={(text) =>
              handleNameInput(text, setExtension, "extension")
            }
            placeholder="Jr., Sr., etc. (optional)"
          />
          <Text style={styles.label2}>Ext. (Jr., Sr., etc.) (Optional)</Text>
          {errors.extension && (
            <Text style={styles.errorText}>{errors.extension}</Text>
          )}

          {/* Sex */}
          <Text style={styles.label}>Sex *</Text>
          <View style={styles.radioContainer}>
            {["Male", "Female"].map((option) => (
              <View key={option} style={styles.radioButton}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSex(option);
                    if (errors.selectedSex) {
                      setErrors((prev) => ({ ...prev, selectedSex: null }));
                    }
                  }}
                  style={[
                    styles.radioOuterCircle,
                    selectedSex === option && styles.radioOuterCircleSelected,
                  ]}
                >
                  {selectedSex === option && (
                    <View style={styles.radioInnerCircle} />
                  )}
                </TouchableOpacity>
                <Text style={styles.radioLabel}>{option}</Text>
              </View>
            ))}
          </View>
          {errors.selectedSex && (
            <Text style={styles.errorText}>{errors.selectedSex}</Text>
          )}

          {/* Birthday */}
          <View style={styles.DateContiner}>
            <Text style={styles.label}>Birthday</Text>

            <TouchableOpacity
              style={[styles.input, errors.birthday && errorInput]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{birthday.toDateString()}</Text>
            </TouchableOpacity>

            {/* Floating calendar using modal */}
            {showDatePicker && (
              <Modal
                transparent
                animationType="fade"
                visible={showDatePicker}
                onRequestClose={() => setShowDatePicker(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPressOut={() => setShowDatePicker(false)}
                >
                  <View style={styles.pickerContainer}>
                    <DateTimePicker
                      value={birthday}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "calendar"}
                      maximumDate={new Date()}
                      onChange={handleDateChange}
                      themeVariant="light"
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            )}
          </View>
          {/* Show error if exists */}
          {errors.birthday ? (
            <Text style={styles.errorText}>{errors.birthday}</Text>
          ) : null}

          {/* Birthplace */}
          <Text style={styles.label}>Birthplace *</Text>
          <DropDownPicker
            open={openDropdown === "birthplaceCity"}
            value={birthplaceCity}
            items={birthplaceCityItems}
            setOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "birthplaceCity" : null)
            }
            setValue={(callback) => {
              const value =
                typeof callback === "function"
                  ? callback(birthplaceCity)
                  : callback;
              handleBirthplaceSelection(value, "city");
              if (errors.birthplaceCity) {
                setErrors((prev) => ({ ...prev, birthplaceCity: null }));
              }
            }}
            setItems={setBirthplaceCityItems}
            placeholder="Select City/Municipality"
            style={[
              styles.dropdown,
              errors.birthplaceCity && styles.errorInput,
            ]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={3000}
            zIndexInverse={1000}
          />
          <Text style={styles.label2}>City/Municipality</Text>
          {errors.birthplaceCity && (
            <Text style={styles.errorText}>{errors.birthplaceCity}</Text>
          )}

          <DropDownPicker
            open={openDropdown === "birthplaceProvince"}
            value={birthplaceProvince}
            items={birthplaceProvinceItems}
            setOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "birthplaceProvince" : null)
            }
            setValue={(callback) => {
              const value =
                typeof callback === "function"
                  ? callback(birthplaceProvince)
                  : callback;
              handleBirthplaceSelection(value, "province");
              if (errors.birthplaceProvince) {
                setErrors((prev) => ({ ...prev, birthplaceProvince: null }));
              }
            }}
            setItems={setBirthplaceProvinceItems}
            placeholder="Select Province"
            style={[
              styles.dropdown,
              errors.birthplaceProvince && styles.errorInput,
            ]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2900}
            zIndexInverse={1100}
          />
          <Text style={styles.label2}>Province</Text>
          {errors.birthplaceProvince && (
            <Text style={styles.errorText}>{errors.birthplaceProvince}</Text>
          )}

          {/* Contact */}
          <Text style={styles.label}>Contact Number *</Text>
          <View
            style={[styles.number, errors.contactNumber && styles.errorInput]}
          >
            <Text style={styles.prefix}>+63</Text>
            <TextInput
              style={styles.phoneInput}
              value={contactNumber}
              onChangeText={handleContactInput}
              keyboardType="number-pad"
              placeholder="9123456789"
              maxLength={10}
            />
          </View>
          {errors.contactNumber && (
            <Text style={styles.errorText}>{errors.contactNumber}</Text>
          )}

          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={[styles.input, errors.emailAddress && styles.errorInput]}
            value={emailAddress}
            onChangeText={handleEmailInput}
            keyboardType="email-address"
            placeholder="example@email.com"
          />
          {errors.emailAddress && (
            <Text style={styles.errorText}>{errors.emailAddress}</Text>
          )}

          <Text style={styles.label}>Emergency Number *</Text>
          <View
            style={[styles.number, errors.emergencyNumber && styles.errorInput]}
          >
            <Text style={styles.prefix}>+63</Text>
            <TextInput
              style={styles.phoneInput}
              value={emergencyNumber}
              onChangeText={handleEmergencyInput}
              keyboardType="number-pad"
              placeholder="9123456789"
              maxLength={10}
            />
          </View>
          {errors.emergencyNumber && (
            <Text style={styles.errorText}>{errors.emergencyNumber}</Text>
          )}

          {/* Address Fields */}
          <Text style={styles.label}>Home Address *</Text>
          <TextInput
            style={[styles.input, errors.street && styles.errorInput]}
            value={street}
            onChangeText={(text) => {
              setStreet(text);
              if (errors.street) {
                setErrors((prev) => ({ ...prev, street: null }));
              }
            }}
            placeholder="Enter street address"
          />
          <Text style={styles.label2}>Street</Text>
          {errors.street && (
            <Text style={styles.errorText}>{errors.street}</Text>
          )}

          <DropDownPicker
            open={openDropdown === "barangayAddress"}
            value={barangayAddress}
            items={barangayAddressItems}
            setOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "barangayAddress" : null)
            }
            setValue={(callback) => {
              const value =
                typeof callback === "function"
                  ? callback(barangayAddress)
                  : callback;
              setBarangayAddress(value);
              if (errors.barangayAddress) {
                setErrors((prev) => ({ ...prev, barangayAddress: null }));
              }
            }}
            setItems={setBarangayAddressItems}
            placeholder="Select Barangay"
            style={[
              styles.dropdown,
              errors.barangayAddress && styles.errorInput,
            ]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2800}
            zIndexInverse={1200}
          />
          <Text style={styles.label2}>Barangay</Text>
          {errors.barangayAddress && (
            <Text style={styles.errorText}>{errors.barangayAddress}</Text>
          )}

          <DropDownPicker
            open={openDropdown === "cityAddress"}
            value={cityAddress}
            items={cityAddressItems}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "cityAddress" : null)}
            setValue={(callback) => {
              const value =
                typeof callback === "function"
                  ? callback(cityAddress)
                  : callback;
              handleAddressSelection(value, "city");
              if (errors.cityAddress) {
                setErrors((prev) => ({ ...prev, cityAddress: null }));
              }
            }}
            setItems={setCityAddressItems}
            placeholder="Select City/Municipality"
            style={[styles.dropdown, errors.cityAddress && styles.errorInput]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2700}
            zIndexInverse={1300}
          />
          <Text style={styles.label2}>City/Municipality</Text>
          {errors.cityAddress && (
            <Text style={styles.errorText}>{errors.cityAddress}</Text>
          )}

          <DropDownPicker
            open={openDropdown === "provinceAddress"}
            value={provinceAddress}
            items={provinceAddressItems}
            setOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "provinceAddress" : null)
            }
            setValue={(callback) => {
              const value =
                typeof callback === "function"
                  ? callback(provinceAddress)
                  : callback;
              setProvinceAddress(value);
              if (errors.provinceAddress) {
                setErrors((prev) => ({ ...prev, provinceAddress: null }));
              }
            }}
            setItems={setProvinceAddressItems}
            placeholder="Select Province"
            style={[
              styles.dropdown,
              errors.provinceAddress && styles.errorInput,
            ]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2600}
            zIndexInverse={1400}
          />
          <Text style={styles.label2}>Province</Text>
          {errors.provinceAddress && (
            <Text style={styles.errorText}>{errors.provinceAddress}</Text>
          )}

          <DropDownPicker
            open={openDropdown === "regionAddress"}
            value={regionAddress}
            items={regionAddressItems}
            setOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "regionAddress" : null)
            }
            setValue={(callback) => {
              const value =
                typeof callback === "function"
                  ? callback(regionAddress)
                  : callback;
              setRegionAddress(value);
              if (errors.regionAddress) {
                setErrors((prev) => ({ ...prev, regionAddress: null }));
              }
            }}
            setItems={setRegionAddressItems}
            placeholder="Select Region"
            style={[styles.dropdown, errors.regionAddress && styles.errorInput]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2500}
            zIndexInverse={1500}
          />
          <Text style={styles.label2}>Region</Text>
          {errors.regionAddress && (
            <Text style={styles.errorText}>{errors.regionAddress}</Text>
          )}

          {/* Civil Status Dropdown */}
          <Text style={styles.label}>Civil Status *</Text>
          <DropDownPicker
            open={openDropdown === "civilStatus"}
            value={civilStatus}
            items={civilStatusItems}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "civilStatus" : null)}
            setValue={(callback) => {
              const value =
                typeof callback === "function"
                  ? callback(civilStatus)
                  : callback;
              setCivilStatus(value);
              if (errors.civilStatus) {
                setErrors((prev) => ({ ...prev, civilStatus: null }));
              }
            }}
            setItems={setCivilStatusItems}
            placeholder="Select Civil Status"
            style={[styles.dropdown, errors.civilStatus && styles.errorInput]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2400}
            zIndexInverse={1600}
          />
          {errors.civilStatus && (
            <Text style={styles.errorText}>{errors.civilStatus}</Text>
          )}

          {/* Religion Dropdown */}
          <Text style={styles.label}>Religion *</Text>
          <DropDownPicker
            open={openDropdown === "religion"}
            value={religion}
            items={religionItems}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "religion" : null)}
            setValue={(callback) => {
              const value =
                typeof callback === "function" ? callback(religion) : callback;
              setReligion(value);
              if (errors.religion) {
                setErrors((prev) => ({ ...prev, religion: null }));
              }
            }}
            setItems={setReligionItems}
            placeholder="Select Religion"
            style={[styles.dropdown, errors.religion && styles.errorInput]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2300}
            zIndexInverse={1700}
          />
          {errors.religion && (
            <Text style={styles.errorText}>{errors.religion}</Text>
          )}

          <Text style={styles.label}>Nationality *</Text>
          <DropDownPicker
            open={openDropdown === "nationality"}
            value={nationality}
            items={nationalityItems}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "nationality" : null)}
            setValue={(callback) => {
              const value =
                typeof callback === "function"
                  ? callback(nationality)
                  : callback;
              setNationality(value);
              if (errors.nationality) {
                setErrors((prev) => ({ ...prev, nationality: null }));
              }
            }}
            setItems={setNationalityItems}
            placeholder="Select Nationality"
            style={[styles.dropdown, errors.nationality && styles.errorInput]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2200}
            zIndexInverse={1800}
          />
          {errors.nationality && (
            <Text style={styles.errorText}>{errors.nationality}</Text>
          )}
        </View>

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRight}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#00188D" }]}
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
