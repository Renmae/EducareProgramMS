import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Button,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../style/styles";
import ReviewForm from "./ReviewForm"; // Make sure ReviewForm uses default export

export default function UserEmployment() {
  const navigation = useNavigation();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const formData = {
    // EMPLOYMENT INFO
    educareCenter: "Educare Center 1",
    barangay: "Abella",
    location: "Barangay Hall",
    department: "City Social Welfare Development Office",
    employmentType: "Full-Time",
    employmentStatus: "Permanent",
  };

  const handleBack = () => {
    navigation.navigate("UserFamInfo");
  };

  const handleNext = () => {
    Alert.alert(
      "Confirmation",
      "Is all the information correct?",
      [
        {
          text: "No",
          onPress: () => console.log("User wants to revise data"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setShowReviewModal(false);
            navigation.navigate("Navigator");
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Get screen dimensions for modal sizing
  const { width, height } = Dimensions.get("window");

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
              source={require("../../assets/images/active-check.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionTitleBox}>
          <Text style={styles.sectionTitleText}>IV. Employment Details</Text>
        </View>

        {/* Employment Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Assigned Educare Center</Text>
          <TextInput
            style={styles.input}
            value={formData.educareCenter}
            editable={false}
          />
          <Text style={styles.label}>Barangay</Text>
          <TextInput
            style={styles.input}
            value={formData.barangay}
            editable={false}
          />
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={formData.location}
            editable={false}
          />
          <Text style={styles.label}>Department</Text>
          <TextInput
            style={styles.input}
            value={formData.department}
            editable={false}
          />
          <Text style={styles.label}>Employment Type</Text>
          <TextInput
            style={styles.input}
            value={formData.employmentType}
            editable={false}
          />
          <Text style={styles.label}>Employment Status</Text>
          <TextInput
            style={styles.input}
            value={formData.employmentStatus}
            editable={false}
          />
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
              onPress={() => setShowReviewModal(true)}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* REVIEW FORM MODAL */}
        <Modal
          visible={showReviewModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowReviewModal(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: width * 0.8,
                height: height * 0.8,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
              }}
            >
              <ScrollView>
                <ReviewForm formData={formData} />
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { backgroundColor: "#D9D9D9", marginLeft: 40 },
                      ]}
                      onPress={() => setShowReviewModal(false)}
                    >
                      <Text style={[styles.buttonText, { marginTop: -2 }]}>
                        Back
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor: "#00188D",
                          marginLeft: 20,
                        },
                      ]}
                      onPress={handleNext}
                    >
                      <Text style={[styles.buttonText, { marginTop: -2 }]}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
