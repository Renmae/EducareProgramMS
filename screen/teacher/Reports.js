import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Chip, Button, Portal, Provider, Menu } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const statusColor = {
  Present: "#4CAF50",
  Absent: "#F44336",
  Late: "#FF9800",
};

const Reports = () => {
  const [attendance, setAttendance] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [searchText, setSearchText] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editField, setEditField] = useState(null);
  const [status, setStatus] = useState("Present");
  const [reason, setReason] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [imageDateTime, setImageDateTime] = useState("");
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleChipPress = (item) => {
    if (item.status === "Present" || item.status === "Late") return;
    setSelectedReason(item.reason || "No reason provided.");
    setModalVisible(true);
  };

  const filteredData = attendance.filter((item) =>
    item.reason?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleImagePick = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== "granted") {
      Alert.alert("Permission needed", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      const now = new Date();
      const datetime = now.toLocaleString();
      setImageDateTime(datetime);
    }
  };

  const handleSubmit = () => {
    if (!imageUri) {
      Alert.alert("Error", "Please capture an image.");
      return;
    }

    if (status === "Absent" && !reason.trim()) {
      Alert.alert("Error", "Please enter a reason for being absent.");
      return;
    }

    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const isLate = now.getHours() > 8;
    const finalStatus =
      status === "Present" ? (isLate ? "Late" : "Present") : "Absent";

    if (editingRecordId && editField) {
      setAttendance((prev) =>
        prev.map((rec) =>
          rec.id === editingRecordId
            ? {
                ...rec,
                [editField]: time,
                image: imageUri,
                dateTime: imageDateTime,
              }
            : rec
        )
      );
    } else {
      const record = {
        id: attendance.length + 1,
        date,
        time,
        dateTime: imageDateTime,
        morningIn: finalStatus === "Present" ? time : "-",
        morningOut: "-",
        afternoonIn: "-",
        afternoonOut: "-",
        status: finalStatus,
        reason: status === "Absent" ? reason : "",
        image: imageUri,
      };
      setAttendance((prev) => [...prev, record]);
    }

    setReason("");
    setStatus("Present");
    setImageUri(null);
    setImageDateTime("");
    setEditingRecordId(null);
    setEditField(null);
    setAddModalVisible(false);
  };

  const handleEdit = (recordId, field) => {
    setEditingRecordId(recordId);
    setEditField(field);
    setAddModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      {["morningIn", "morningOut", "afternoonIn", "afternoonOut"].map(
        (field) => (
          <TouchableOpacity
            key={field}
            style={styles.cell}
            onPress={() => handleEdit(item.id, field)}
          >
            <Text>{item[field]}</Text>
          </TouchableOpacity>
        )
      )}
      <TouchableOpacity
        style={styles.cell}
        onPress={() => handleChipPress(item)}
      >
        <Chip
          style={[styles.chip, { backgroundColor: statusColor[item.status] }]}
        >
          {" "}
          {item.status}{" "}
        </Chip>
      </TouchableOpacity>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.thumbnail} />
      )}
      <Text style={[styles.cell, { fontSize: 10 }]}>{item.dateTime}</Text>
    </View>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Attendance Records</Text>
        <View style={styles.topBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search reason..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <Button mode="contained" onPress={() => setAddModalVisible(true)}>
            Add Record
          </Button>
        </View>

        <View style={styles.header}>
          {[
            "Date",
            "Time In",
            "Time Out",
            "Time In",
            "Time Out",
            "Status",
            "Image",
          ].map((label, index) => (
            <Text key={index} style={styles.headerCell}>
              {label}
            </Text>
          ))}
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        <Portal>
          <Modal
            transparent
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Reason</Text>
                <Text style={styles.modalText}>{selectedReason}</Text>
                <Button mode="text" onPress={() => setModalVisible(false)}>
                  Close
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal
            transparent
            visible={addModalVisible}
            animationType="slide"
            onRequestClose={() => setAddModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Add/Update Attendance</Text>

                {!editingRecordId && (
                  <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                      <Button
                        mode="outlined"
                        onPress={() => setMenuVisible(true)}
                      >
                        {status}
                      </Button>
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        setStatus("Present");
                        setMenuVisible(false);
                      }}
                      title="Present"
                    />
                    <Menu.Item
                      onPress={() => {
                        setStatus("Absent");
                        setMenuVisible(false);
                      }}
                      title="Absent"
                    />
                  </Menu>
                )}

                {status === "Absent" && (
                  <TextInput
                    style={styles.textArea}
                    placeholder="Enter reason for absence..."
                    multiline
                    value={reason}
                    onChangeText={setReason}
                  />
                )}

                <Button
                  icon="camera"
                  mode="outlined"
                  onPress={handleImagePick}
                  style={{ marginTop: 10 }}
                >
                  Capture Image
                </Button>
                {imageUri && (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.imagePreview}
                  />
                )}

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={{ marginTop: 20 }}
                >
                  Submit
                </Button>
                <Button
                  mode="text"
                  onPress={() => setAddModalVisible(false)}
                  style={{ marginTop: 5 }}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    width: 150,
    fontSize: 13,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  headerCell: { flex: 1, fontWeight: "bold", fontSize: 13 },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  cell: { flex: 1, justifyContent: "center" },
  chip: { alignSelf: "flex-start", height: 28, justifyContent: "center" },
  thumbnail: { width: 50, height: 50, borderRadius: 6 },
  imagePreview: { width: 100, height: 100, marginTop: 10 },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  modalBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontWeight: "bold", fontSize: 16 },
  modalText: { marginTop: 10 },
  textArea: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    minHeight: 80,
    fontSize: 14,
    textAlignVertical: "top",
  },
});

export default Reports;
