import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import ScreenWrapper from "../../style/ScreenWrapper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
import { styles } from "../../style/staffStyle";

// New component for the status chip
const StatusChip = ({ status, onPress }) => {
  const statusColors = {
    Pending: "#ffc107", // Yellow
    Approved: "#28a745", // Green
    Rejected: "#dc3545", // Red

    "For Screening": "#007bff", // Blue
    Accepted: "#28a745", // Green
  };
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: statusColors[status] || "#6c757d" },
      ]} // Fallback color
      onPress={onPress} // Use the onPress function passed from the parent
    >
      <Text style={styles.chipText}>{status}</Text>
    </TouchableOpacity>
  );
};
const handleOpenEditModal = (applicant) => {
  setSelectedApplicant(applicant);
  setEditModalVisible(true);
};

const handleApprove = () => {
  if (!selectedApplicant) return;

  setSubmittedData((currentData) =>
    currentData.map((applicant) =>
      applicant.id === selectedApplicant.id
        ? { ...applicant, status: "Approved" }
        : applicant
    )
  );

  setEditModalVisible(false);
  setSelectedApplicant(null);
  Alert.alert("Success", "Applicant has been approved!");
};

const handleReject = () => {
  if (!selectedApplicant) return;

  setSubmittedData((currentData) =>
    currentData.map((applicant) =>
      applicant.id === selectedApplicant.id
        ? { ...applicant, status: "Rejected" }
        : applicant
    )
  );
  setEditModalVisible(false);
  setSelectedApplicant(null);
  Alert.alert("Success", "Applicant has been rejected.");
};

export default function Applicant() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("All");
  const [items, setItems] = useState([
    { label: "All", value: "All" },
    { label: "Teacher", value: "Teacher" },
    { label: "Admin", value: "Admin" },
    { label: "Barangay", value: "Barangay" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const sampleData = [
    {
      id: "1",
      lastName: "Cruz",
      firstName: "Juan",
      middleName: "Santos",
      extension: "",
      selectedSex: "Male",
      birthday: "1995-05-12",
      birthplaceCity: "Naga",
      birthplaceProvince: "Camarines Sur",
      contactNumber: "09123456789",
      emailAddress: "juan.cruz@example.com",
      emergencyNumber: "09987654321",
      street: "Panganiban Drive",
      barangayAddress: "Bagumbayan Norte",
      cityAddress: "Naga City",
      provinceAddress: "Camarines Sur",
      regionAddress: "Region V",
      civilStatus: "Single",
      religion: "Catholic",
      nationality: "Filipino",
      scheduleDate: "2025-06-10",
      scheduleTime: "09:00 AM",
      status: "Pending",
    },
    {
      id: "2",
      lastName: "Dela Rosa",
      firstName: "Maria",
      middleName: "Lopez",
      extension: "",
      selectedSex: "Female",
      birthday: "1993-10-20",
      birthplaceCity: "Iriga",
      birthplaceProvince: "Camarines Sur",
      contactNumber: "09225556677",
      emailAddress: "maria.rosa@example.com",
      emergencyNumber: "09111222333",
      street: "Bonifacio Street",
      barangayAddress: "San Roque",
      cityAddress: "Iriga City",
      provinceAddress: "Camarines Sur",
      regionAddress: "Region V",
      civilStatus: "Married",
      religion: "Christian",
      nationality: "Filipino",
      scheduleDate: "2025-06-11",
      scheduleTime: "10:30 AM",
      status: "Pending",
    },
    {
      id: "3",
      lastName: "Reyes",
      firstName: "Carlos",
      middleName: "Gomez",
      extension: "Jr.",
      selectedSex: "Male",
      birthday: "1990-01-15",
      birthplaceCity: "Legazpi",
      birthplaceProvince: "Albay",
      contactNumber: "09334445566",
      emailAddress: "carlos.reyes@example.com",
      emergencyNumber: "09887776655",
      street: "Rizal Avenue",
      barangayAddress: "Bgy. 1",
      cityAddress: "Legazpi City",
      provinceAddress: "Albay",
      regionAddress: "Region V",
      civilStatus: "Widowed",
      religion: "Catholic",
      nationality: "Filipino",
      scheduleDate: "2025-06-12",
      scheduleTime: "02:00 PM",
      status: "Pending",
    },
  ];

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
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const [submittedData, setSubmittedData] = useState([]);

  // Validation States
  const [errors, setErrors] = useState({});

  const handleDateInput = (dateStr) => {
    if (!dateStr) return;

    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    if (!isValid) {
      setErrors({ birthday: "Use format YYYY-MM-DD." });
      return;
    }

    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) {
      setErrors({ birthday: "Invalid date." });
      return;
    }
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

  const resetFormFields = () => {
    setLastName("");
    setFirstName("");
    setMiddleName("");
    setExtension("");
    setSelectedSex(null);
    setBirthday(new Date());
    setBirthplaceCity(null);
    setBirthplaceProvince(null);
    setContactNumber("");
    setEmailAddress("");
    setEmergencyNumber("");
    setStreet("");
    setBarangayAddress(null);
    setCityAddress(null);
    setProvinceAddress(null);
    setRegionAddress(null);
    setCivilStatus(null);
    setReligion(null);
    setNationality("");
    setScheduleDate(null);
    setScheduleTime(null);
    setErrors({});
    setOpenDropdown(null);
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      const newEntry = {
        id: Date.now().toString(), // Unique ID for keyExtractor
        lastName,
        firstName,
        middleName,
        extension,
        selectedSex,
        birthday: birthday.toDateString(),
        birthplaceCity,
        birthplaceProvince,
        contactNumber,
        emailAddress,
        emergencyNumber,
        street,
        barangayAddress,
        cityAddress,
        provinceAddress,
        regionAddress,
        civilStatus,
        religion,
        nationality,
        scheduleDate,
        scheduleTime,
        status: "Pending",
      };

      setSubmittedData((prev) => [...prev, newEntry]);
      setModalVisible(false);
      resetFormFields();
      Alert.alert("Success", "Applicant added successfully!");
    } else {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields correctly."
      );
    }
  };
  const handleOpenEditModal = (applicant) => {
    setSelectedApplicant(applicant);
    setEditModalVisible(true);
  };

  const handleApprove = () => {
    if (!selectedApplicant) return;

    setSubmittedData((currentData) =>
      currentData.map((applicant) =>
        applicant.id === selectedApplicant.id
          ? { ...applicant, status: "Approved" }
          : applicant
      )
    );

    setEditModalVisible(false);
    setSelectedApplicant(null);
    Alert.alert("Success", "Applicant has been approved!");
  };

  const filteredData = submittedData.filter((item) => {
    const searchTerm = search.toLowerCase();
    const name =
      `${item.firstName} ${item.middleName} ${item.lastName}`.toLowerCase();
    const email = item.emailAddress.toLowerCase();
    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  const handleReject = () => {
    if (!selectedApplicant) {
      Alert.alert("No applicant selected");
      return;
    }
    setSubmittedData((currentData) =>
      currentData.map((applicant) =>
        applicant.id === selectedApplicant.id
          ? { ...applicant, status: "Rejected" }
          : applicant
      )
    );
    setEditModalVisible(false);
    setSelectedApplicant(null);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Applicant List</Text>

        {/* Top Controls */}
        <View style={styles.topControls}>
          <View style={styles.leftControls}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                resetFormFields();
                setModalVisible(true);
              }}
            >
              <Icon name="plus" size={18} color="#000" />
              <Text style={styles.addButtonText}>Add Applicant</Text>
            </TouchableOpacity>

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              zIndex={1000}
            />
          </View>

          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.cellHeader}>Schedule</Text>
          <Text style={styles.cellHeader}>Name</Text>
          <Text style={styles.cellHeader}>Email</Text>
          <Text style={styles.cellHeader}>Status</Text>
        </View>

        {/* Table Rows */}
        <FlatList
          data={sampleData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>
                {`${item.scheduleDate} ${item.scheduleTime}`}
              </Text>
              <Text
                style={styles.cell}
              >{`${item.lastName}, ${item.firstName} ${item.middleName}`}</Text>
              <Text style={styles.cell}>{item.emailAddress}</Text>
              <View style={styles.cell}>
                <StatusChip
                  status={item.status}
                  onPress={() => handleOpenEditModal(item)}
                />
              </View>
            </View>
          )}
        />

        {/* Modal for Add Staff */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Section Title */}
              <View style={styles.webContainer}>
                <View style={styles.webBorder}>
                  <Text style={styles.sectionTitleText}>
                    Applicant Information
                  </Text>
                </View>

                {/* Form Container */}
                <View
                  style={styles.formContainer}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  {/* Row 1: Name Fields */}
                  <View style={styles.fieldRow}>
                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Name *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          errors.lastName && styles.errorInput,
                        ]}
                        value={lastName}
                        onChangeText={(text) =>
                          handleNameInput(text, setLastName, "lastName")
                        }
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <Text style={styles.errorText}>{errors.lastName}</Text>
                      )}
                      <Text style={styles.label}>Name *</Text>
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>First Name *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          errors.firstName && styles.errorInput,
                        ]}
                        value={firstName}
                        onChangeText={(text) =>
                          handleNameInput(text, setFirstName, "firstName")
                        }
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <Text style={styles.errorText}>{errors.firstName}</Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Middle Name</Text>
                      <TextInput
                        style={[
                          styles.input,
                          errors.middleName && styles.errorInput,
                        ]}
                        value={middleName}
                        onChangeText={(text) =>
                          handleNameInput(text, setMiddleName, "middleName")
                        }
                        placeholder="Enter middle name (optional)"
                      />
                      {errors.middleName && (
                        <Text style={styles.errorText}>
                          {errors.middleName}
                        </Text>
                      )}
                    </View>
                  </View>
                  {/* Row 2: Extension, Sex, Birthday */}
                  <View style={styles.fieldRow}>
                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Extension</Text>
                      <TextInput
                        style={[
                          styles.input,
                          errors.extension && styles.errorInput,
                        ]}
                        value={extension}
                        onChangeText={(text) =>
                          handleNameInput(text, setExtension, "extension")
                        }
                        placeholder="Jr., Sr., etc. (optional)"
                      />
                      {errors.extension && (
                        <Text style={styles.errorText}>{errors.extension}</Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Sex *</Text>
                      <View style={styles.radioContainer}>
                        {["Male", "Female"].map((option) => (
                          <View key={option} style={styles.radioButton}>
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedSex(option);
                                if (errors.selectedSex) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    selectedSex: null,
                                  }));
                                }
                              }}
                              style={[
                                styles.radioOuterCircle,
                                selectedSex === option &&
                                  styles.radioOuterCircleSelected,
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
                        <Text style={styles.errorText}>
                          {errors.selectedSex}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Birthday</Text>
                      <input
                        type="date"
                        value={birthday.toISOString().split("T")[0]}
                        onChange={(e) => handleDateInput(e.target.value)}
                        style={{
                          ...styles.number,
                          borderColor: errors.birthday ? "red" : "#ccc",
                        }}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </View>
                  </View>
                  {/* Row 3: Birthplace */}
                  <View style={styles.fieldRow}>
                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Birthplace City *</Text>
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
                            setErrors((prev) => ({
                              ...prev,
                              birthplaceCity: null,
                            }));
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
                      {errors.birthplaceCity && (
                        <Text style={styles.errorText}>
                          {errors.birthplaceCity}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Birthplace Province *</Text>
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
                            setErrors((prev) => ({
                              ...prev,
                              birthplaceProvince: null,
                            }));
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
                      {errors.birthplaceProvince && (
                        <Text style={styles.errorText}>
                          {errors.birthplaceProvince}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Contact Number *</Text>
                      <View
                        style={[
                          styles.number,
                          errors.contactNumber && styles.errorInput,
                        ]}
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
                        <Text style={styles.errorText}>
                          {errors.contactNumber}
                        </Text>
                      )}
                    </View>
                  </View>
                  {/* Row 4: Email, Emergency Number, Street */}
                  <View style={styles.fieldRow}>
                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Email Address *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          errors.emailAddress && styles.errorInput,
                        ]}
                        value={emailAddress}
                        onChangeText={handleEmailInput}
                        keyboardType="email-address"
                        placeholder="example@email.com"
                      />
                      {errors.emailAddress && (
                        <Text style={styles.errorText}>
                          {errors.emailAddress}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Emergency Number *</Text>
                      <View
                        style={[
                          styles.number,
                          errors.emergencyNumber && styles.errorInput,
                        ]}
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
                        <Text style={styles.errorText}>
                          {errors.emergencyNumber}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Street *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          errors.street && styles.errorInput,
                        ]}
                        value={street}
                        onChangeText={(text) => {
                          setStreet(text);
                          if (errors.street) {
                            setErrors((prev) => ({ ...prev, street: null }));
                          }
                        }}
                        placeholder="Enter street address"
                      />
                      {errors.street && (
                        <Text style={styles.errorText}>{errors.street}</Text>
                      )}
                    </View>
                  </View>
                  {/* Row 5: Address Fields */}
                  <View style={styles.fieldRow}>
                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Barangay *</Text>
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
                            setErrors((prev) => ({
                              ...prev,
                              barangayAddress: null,
                            }));
                          }
                        }}
                        setItems={setBarangayAddressItems}
                        placeholder="Select Barangay"
                        style={[
                          styles.dropdown,
                          errors.barangayAddress && styles.errorInput,
                        ]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        zIndex={7800}
                        zIndexInverse={7200}
                      />
                      {errors.barangayAddress && (
                        <Text style={styles.errorText}>
                          {errors.barangayAddress}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>City/Municipality *</Text>
                      <DropDownPicker
                        open={openDropdown === "cityAddress"}
                        value={cityAddress}
                        items={cityAddressItems}
                        setOpen={(isOpen) =>
                          setOpenDropdown(isOpen ? "cityAddress" : null)
                        }
                        setValue={(callback) => {
                          const value =
                            typeof callback === "function"
                              ? callback(cityAddress)
                              : callback;
                          handleAddressSelection(value, "city");
                          if (errors.cityAddress) {
                            setErrors((prev) => ({
                              ...prev,
                              cityAddress: null,
                            }));
                          }
                        }}
                        setItems={setCityAddressItems}
                        placeholder="Select City/Municipality"
                        style={[
                          styles.dropdown,
                          errors.cityAddress && styles.errorInput,
                        ]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        zIndex={2700}
                        zIndexInverse={1300}
                      />
                      {errors.cityAddress && (
                        <Text style={styles.errorText}>
                          {errors.cityAddress}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Province *</Text>
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
                            setErrors((prev) => ({
                              ...prev,
                              provinceAddress: null,
                            }));
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
                      {errors.provinceAddress && (
                        <Text style={styles.errorText}>
                          {errors.provinceAddress}
                        </Text>
                      )}
                    </View>
                  </View>
                  {/* Row 6: Region, Civil Status, Religion */}
                  <View style={styles.fieldRow}>
                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Region *</Text>
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
                            setErrors((prev) => ({
                              ...prev,
                              regionAddress: null,
                            }));
                          }
                        }}
                        setItems={setRegionAddressItems}
                        placeholder="Select Region"
                        style={[
                          styles.dropdown,
                          errors.regionAddress && styles.errorInput,
                        ]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        zIndex={2500}
                        zIndexInverse={1500}
                      />
                      {errors.regionAddress && (
                        <Text style={styles.errorText}>
                          {errors.regionAddress}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Civil Status *</Text>
                      <DropDownPicker
                        open={openDropdown === "civilStatus"}
                        value={civilStatus}
                        items={civilStatusItems}
                        setOpen={(isOpen) =>
                          setOpenDropdown(isOpen ? "civilStatus" : null)
                        }
                        setValue={(callback) => {
                          const value =
                            typeof callback === "function"
                              ? callback(civilStatus)
                              : callback;
                          setCivilStatus(value);
                          if (errors.civilStatus) {
                            setErrors((prev) => ({
                              ...prev,
                              civilStatus: null,
                            }));
                          }
                        }}
                        setItems={setCivilStatusItems}
                        placeholder="Select Civil Status"
                        style={[
                          styles.dropdown,
                          errors.civilStatus && styles.errorInput,
                        ]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        zIndex={2400}
                        zIndexInverse={1600}
                      />
                      {errors.civilStatus && (
                        <Text style={styles.errorText}>
                          {errors.civilStatus}
                        </Text>
                      )}
                    </View>

                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Religion *</Text>
                      <DropDownPicker
                        open={openDropdown === "religion"}
                        value={religion}
                        items={religionItems}
                        setOpen={(isOpen) =>
                          setOpenDropdown(isOpen ? "religion" : null)
                        }
                        setValue={(callback) => {
                          const value =
                            typeof callback === "function"
                              ? callback(religion)
                              : callback;
                          setReligion(value);
                          if (errors.religion) {
                            setErrors((prev) => ({ ...prev, religion: null }));
                          }
                        }}
                        setItems={setReligionItems}
                        placeholder="Select Religion"
                        style={[
                          styles.dropdown,
                          errors.religion && styles.errorInput,
                        ]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        zIndex={2300}
                        zIndexInverse={1700}
                      />
                      {errors.religion && (
                        <Text style={styles.errorText}>{errors.religion}</Text>
                      )}
                    </View>
                  </View>
                  {/* Row 7: Nationality */}
                  <View style={styles.fieldRow}>
                    <View style={styles.fieldColumn}>
                      <Text style={styles.label}>Nationality *</Text>
                      <DropDownPicker
                        open={openDropdown === "nationality"}
                        value={nationality}
                        items={nationalityItems}
                        setOpen={(isOpen) =>
                          setOpenDropdown(isOpen ? "nationality" : null)
                        }
                        setValue={(callback) => {
                          const value =
                            typeof callback === "function"
                              ? callback(nationality)
                              : callback;
                          setNationality(value);
                          if (errors.nationality) {
                            setErrors((prev) => ({
                              ...prev,
                              nationality: null,
                            }));
                          }
                        }}
                        setItems={setNationalityItems}
                        placeholder="Select Nationality"
                        style={[
                          styles.dropdown,
                          errors.nationality && styles.errorInput,
                        ]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        zIndex={2200}
                        zIndexInverse={1800}
                      />
                      {errors.nationality && (
                        <Text style={styles.errorText}>
                          {errors.nationality}
                        </Text>
                      )}

                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Schedule Date *</Text>
                        <input
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          style={styles.number}
                        />
                      </View>

                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Schedule Time *</Text>
                        <input
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          style={styles.number}
                        />
                      </View>
                    </View>
                    <View style={styles.fieldColumn}></View>
                    <View style={styles.fieldColumn}></View>
                  </View>
                </View>

                {/* Submit Buttons */}
                <View style={styles.modalButtons}>
                  <Pressable
                    style={styles.modalButtonLeft}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalButtonRight}
                    onPress={handleFormSubmit}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {selectedApplicant && (
          <Modal
            visible={editModalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {/* Section Title */}
                <View style={styles.webContainer}>
                  <View style={styles.webBorder}>
                    <Text style={styles.sectionTitleText}>
                      Applicant Information
                    </Text>
                  </View>

                  {/* Form Container */}
                  <View style={styles.formContainer}>
                    {/* Row 1: Name Fields */}
                    <View style={styles.fieldRow}>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Name *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.lastName}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>First Name *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.firstName}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Middle Name</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.middleName}
                          editable={false}
                        />
                      </View>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.fieldRow}>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Extension</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.extension}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Sex *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.sex}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Birthday</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.birthday}
                          editable={false}
                        />
                      </View>
                    </View>

                    {/* Row 3 */}
                    <View style={styles.fieldRow}>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Birthplace City *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.birthplaceCity}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Birthplace Province *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.birthplaceProvince}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Contact Number *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.contactNumber}
                          editable={false}
                        />
                      </View>
                    </View>

                    {/* Row 4 */}
                    <View style={styles.fieldRow}>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Email Address *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.emailAddress}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Emergency Number *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.emergencyNumber}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Street *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.streetAddress}
                          editable={false}
                        />
                      </View>
                    </View>

                    {/* Row 5 */}
                    <View style={styles.fieldRow}>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Barangay *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.barangayAddress}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>City/Municipality *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.cityAddress}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Province *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.provinceAddress}
                          editable={false}
                        />
                      </View>
                    </View>

                    {/* Row 6 */}
                    <View style={styles.fieldRow}>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Region *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.regionAddress}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Civil Status *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.civilStatus}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Religion *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.religion}
                          editable={false}
                        />
                      </View>
                    </View>

                    {/* Row 7 */}
                    <View style={styles.fieldRow}>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Nationality *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.nationality}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Schedule Date *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.scheduleDate}
                          editable={false}
                        />
                      </View>
                      <View style={styles.fieldColumn}>
                        <Text style={styles.label}>Schedule Time *</Text>
                        <TextInput
                          style={styles.input}
                          value={selectedApplicant.scheduleTime}
                          editable={false}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Buttons */}
                  <View style={styles.modalButtons}>
                    <Pressable
                      style={[
                        styles.modalButtonLeft,
                        { backgroundColor: "#dc3545" },
                      ]}
                      onPress={handleReject}
                    >
                      <Text style={styles.buttonText}>Reject</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.modalButtonRight,
                        { backgroundColor: "#28a745" },
                      ]}
                      onPress={handleApprove}
                    >
                      <Text style={styles.buttonText}>Approve</Text>
                    </Pressable>
                  </View>

                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => setEditModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScreenWrapper>
  );
}
