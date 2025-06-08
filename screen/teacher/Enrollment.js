import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width } = Dimensions.get("window");

export default function Enrollment() {
  const swiper = useRef();
  const contentSwiper = useRef();
  const [week, setWeek] = useState(0);
  const [value, setValue] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [timeframe, setTimeframe] = useState(null);
  const [items, setItems] = useState([
    { label: "AM", value: "am" },
    { label: "PM", value: "pm" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState({});

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const getMinMaxTime = () => {
    if (timeframe === "am") {
      return {
        min: moment().set({ hour: 8, minute: 0, second: 0 }),
        max: moment().set({ hour: 11, minute: 59, second: 59 }),
      };
    } else if (timeframe === "pm") {
      return {
        min: moment().set({ hour: 13, minute: 0, second: 0 }),
        max: moment().set({ hour: 17, minute: 0, second: 0 }),
      };
    } else {
      return {
        min: moment().startOf("day"),
        max: moment().endOf("day"),
      };
    }
  };

  const weeks = React.useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");
    return [-1, 0, 1].map((adj) =>
      Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");
        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      })
    );
  }, [week]);

  const days = React.useMemo(() => {
    return [
      moment(value).subtract(1, "day").toDate(),
      value,
      moment(value).add(1, "day").toDate(),
    ];
  }, [value]);

  const validateAndSave = () => {
    if (!timeframe) {
      Alert.alert("Validation Error", "Please select a timeframe.");
      return;
    }

    const selectedDate = moment(value);
    const dayOfWeek = selectedDate.day();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      Alert.alert(
        "Invalid Day",
        "You can only schedule events from Monday to Friday."
      );
      return;
    }

    const start = moment(startTime).seconds(0).milliseconds(0);
    const end = moment(endTime).seconds(0).milliseconds(0);
    const duration = end.diff(start, "minutes");

    // if (duration >= 120) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Event duration must be 2 hours (120 minutes)."
    //   );
    //   return;
    // }

    const dateKey = selectedDate.toDate().toDateString();

    const formattedStart = start.format("HH:mm");
    const formattedEnd = end.format("HH:mm");

    // Check timeframe bounds
    if (timeframe === "am") {
      const amStart = moment(start).set({ hour: 8, minute: 0, second: 0 });
      const amEnd = moment(start).set({ hour: 11, minute: 59, second: 59 });

      if (start.isBefore(amStart) || end.isAfter(amEnd)) {
        Alert.alert(
          "Validation Error",
          "AM timeframe must be between 8:00 AM and 11:59 AM."
        );
        return;
      }
    }

    if (timeframe === "pm") {
      const pmStart = moment(start).set({ hour: 13, minute: 0, second: 0 });
      const pmEnd = moment(start).set({ hour: 17, minute: 0, second: 0 });

      if (start.isBefore(pmStart) || end.isAfter(pmEnd)) {
        Alert.alert(
          "Validation Error",
          "PM timeframe must be between 1:00 PM and 5:00 PM."
        );
        return;
      }
    }

    const newEvent = {
      timeframe,
      start: start.format("hh:mm A"),
      end: end.format("hh:mm A"),
      startRaw: formattedStart,
      endRaw: formattedEnd,
    };

    const updatedEvents = { ...events };

    for (let i = 0; i < 40; i++) {
      const recurringDate = moment(value).add(i, "weeks");
      if (recurringDate.day() !== dayOfWeek) continue;

      const recurringKey = recurringDate.toDate().toDateString();
      const dayEvents = updatedEvents[recurringKey] || [];

      if (dayEvents.length >= 2) continue;

      const duplicateTimeframe = dayEvents.some(
        (evt) => evt.timeframe === timeframe
      );
      if (duplicateTimeframe) {
        Alert.alert(
          "Duplicate Entry",
          `You already have an event in the ${timeframe.toUpperCase()} timeframe.`
        );
        return;
      }

      const hasOverlap = dayEvents.some((evt) => {
        return (
          (formattedStart >= evt.startRaw && formattedStart < evt.endRaw) ||
          (formattedEnd > evt.startRaw && formattedEnd <= evt.endRaw) ||
          (formattedStart <= evt.startRaw && formattedEnd >= evt.endRaw)
        );
      });

      if (hasOverlap) {
        Alert.alert(
          "Overlap Detected",
          "Event overlaps with an existing event."
        );
        return;
      }

      updatedEvents[recurringKey] = [...dayEvents, newEvent];
    }

    setEvents(updatedEvents);
    setModalVisible(false);
    setTimeframe(null);
    setStartTime(new Date());
    setEndTime(new Date());

    Alert.alert("Success", "Event saved and scheduled weekly for 10 months.");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Schedule</Text>
        </View>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={(ind) => {
              if (ind === 1) return;
              const index = ind - 1;
              setValue(moment(value).add(index, "week").toDate());
              setTimeout(() => {
                setWeek(week + index);
                swiper.current.scrollTo(1, false);
              }, 10);
            }}
          >
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: "#111",
                            borderColor: "#111",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: "#fff" },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: "#fff" },
                          ]}
                        >
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <Swiper
          index={1}
          ref={contentSwiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={(ind) => {
            if (ind === 1) return;
            setTimeout(() => {
              const nextValue = moment(value).add(ind - 1, "days");
              if (moment(value).week() !== nextValue.week()) {
                setWeek(
                  moment(value).isBefore(nextValue) ? week + 1 : week - 1
                );
              }
              setValue(nextValue.toDate());
              contentSwiper.current.scrollTo(1, false);
            }, 10);
          }}
        >
          {days.map((day, index) => (
            <View
              key={index}
              style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}
            >
              <Text style={styles.subtitle}>
                {day.toLocaleDateString("en-US", { dateStyle: "full" })}
              </Text>
              <View style={styles.placeholder}>
                <View style={styles.placeholderInset}>
                  {events[day.toDateString()]?.map((evt, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                      <Text style={{ fontWeight: "600" }}>{evt.timeframe}</Text>
                      <Text>Start: {evt.start}</Text>
                      <Text>End: {evt.end}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </Swiper>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.btn}>
              <MaterialCommunityIcons
                color="#fff"
                name="plus"
                size={22}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.btnText}>Add Event</Text>
            </View>
          </TouchableOpacity>
        </View>

        {modalVisible && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Class Schedule</Text>

              <Text style={styles.label}>Timeframe</Text>
              <DropDownPicker
                open={open}
                value={timeframe}
                items={items}
                setOpen={setOpen}
                setValue={setTimeframe}
                setItems={setItems}
                placeholder="Select timeframe"
              />

              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                <Text style={styles.inputText}>
                  {moment(startTime).format("hh:mm A")}
                </Text>
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowStartPicker(false);
                    if (event.type === "dismissed" || !selectedDate) return;

                    const { min, max } = getMinMaxTime();
                    const momentTime = moment(selectedDate);

                    if (momentTime.isBefore(min) || momentTime.isAfter(max)) {
                      Alert.alert(
                        "Invalid Time",
                        `Start time must be within the ${timeframe?.toUpperCase()} range.`
                      );
                      return;
                    }

                    setStartTime(selectedDate);
                  }}
                />
              )}

              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                <Text style={styles.inputText}>
                  {moment(endTime).format("hh:mm A")}
                </Text>
              </TouchableOpacity>
              {showEndPicker && (
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowEndPicker(false);
                    if (event.type === "dismissed" || !selectedDate) return;

                    const { min, max } = getMinMaxTime();
                    const momentTime = moment(selectedDate);

                    if (momentTime.isBefore(min) || momentTime.isAfter(max)) {
                      Alert.alert(
                        "Invalid Time",
                        `End time must be within the ${timeframe?.toUpperCase()} range.`
                      );
                      return;
                    }

                    setEndTime(selectedDate);
                  }}
                />
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={validateAndSave}
                >
                  <Text style={{ color: "#fff" }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ marginTop: 12, color: "#007aff" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  picker: { height: 100 },
  itemRow: { flexDirection: "row", justifyContent: "space-around" },
  item: {
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    width: width / 8,
  },
  itemWeekday: { fontSize: 12 },
  itemDate: { fontSize: 16 },
  subtitle: { fontSize: 18, fontWeight: "600" },
  placeholder: {
    flex: 1,
    backgroundColor: "#eee",
    marginTop: 10,
    borderRadius: 8,
  },
  placeholderInset: { padding: 10 },
  footer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "90%",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: "500" },
  inputText: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  modalButtons: { marginTop: 20, alignItems: "center" },
  saveButton: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
});
