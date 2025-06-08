import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import ScreenWrapper from "../../style/ScreenWrapper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";

export default function Performance() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("All");
  const [items, setItems] = useState([
    { label: "All", value: "All" },
    { label: "Teacher", value: "Teacher" },
    { label: "Admin", value: "Admin" },
    { label: "Barangay", value: "Barangay" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const sampleData = [
    {
      id: "10101",
      name: "Juan Dela Cruz",
      date: "6/9/2025",
      timein: "7:50am",
      timeout: "12:00pm",
      status: "Present",
    },
    {
      id: "10102",
      name: "Mel Anie",
      date: "6/5/2025",
      timein: "8:00am",
      timeout: "12:00pm",
      status: "",
    },
    {
      id: "10103",
      name: "Abella Della",
      date: "6/2/2025",
      timein: "8:05am",
      timeout: "11:50am",
      status: "Present",
    },
  ];

  const filteredData = sampleData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (value === "All" || item.role === value)
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Attendance Record</Text>

        {/* Top Controls */}
        <View style={styles.topControls}>
          <View style={styles.leftControls}>
            {/* <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="plus" size={18} color="#000" />
              <Text style={styles.addButtonText}>Add Staff</Text>
            </TouchableOpacity> */}

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
          <Text style={styles.cellHeader}>Staff ID</Text>
          <Text style={styles.cellHeader}>Staff Name</Text>
          <Text style={styles.cellHeader}>Date</Text>
          <Text style={styles.cellHeader}>Time-In</Text>
          <Text style={styles.cellHeader}>Time-Out</Text>
          <Text style={styles.cellHeader}>Status</Text>
        </View>

        {/* Table Rows */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.date}</Text>
              <Text style={styles.cell}>{item.timein}</Text>
              <Text style={styles.cell}>{item.timeout}</Text>
              <Text style={styles.cell}>{item.status}</Text>
            </View>
          )}
        />

        {/* Modal for Add Staff */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Staff Form</Text>
              {/* Example Form Fields */}
              <TextInput placeholder="Name" style={styles.modalInput} />
              <TextInput placeholder="Location" style={styles.modalInput} />
              <TextInput placeholder="Role" style={styles.modalInput} />
              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                    // Submit logic here
                    setModalVisible(false);
                  }}
                >
                  <Text>Submit</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Inter",
    alignSelf: "center",
    marginBottom: 10,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    zIndex: 100,
  },
  leftControls: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    height: 40,
  },
  addButtonText: {
    color: "#000",
    fontSize: 14,
    marginLeft: 10,
  },
  dropdown: {
    height: 10,
    maxHeight: "100%",
    borderColor: "#D9D9D9",
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 10,
    marginBottom: 9,
    fontSize: 14,
  },
  dropdownContainer: {
    borderColor: "#D9D9D9",
    backgroundColor: "#D9D9D9",
    width: "100%",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    minWidth: 370,
  },
  tableHeader: {
    backgroundColor: "#213594",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ccc",
  },
  cellHeader: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#FBFBFB",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
  },
});
