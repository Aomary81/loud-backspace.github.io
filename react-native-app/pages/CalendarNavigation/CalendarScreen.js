import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Modal,
  Button,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useContext } from "react";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../../styles/theme.style";
import InputField from "../components/V2Components/InputField";
import { AuthContext } from "../../context";

function CalendarScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMonth, setMonth] = useState(
    parseInt(new Date().toISOString().slice(5, 7))
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [success, setSuccess] = useState(false);
  const { myIp } = useContext(AuthContext).ip;
  const { token } = useContext(AuthContext);

  const handleDayPress = (date) => {
    setDueDate(date.dateString);
    setModalVisible(true);
    console.log(date.dateString);
  };
  const ReminderCreation = async () => {
    try {
      const response = await fetch("http://" + myIp + ":3000/reminders/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          dueDate: dueDate,
          token: token,
        }),
        https: false,
      });
      const result = await response.json();
      if (response.status == 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const clearInputs = () => {
    setDueDate("");
    setTitle("");
    setDescription("");
  };

  const renderDay = (date, now) => {
    const isCurrentMonth = date.month === currentMonth;

    return (
      <TouchableOpacity
        onPress={() => handleDayPress(date)}
        opacity={isCurrentMonth ? 1 : 0}
        style={{
          dayTextColor: "white",
          backgroundColor:
            date.dateString === now
              ? "dodgerblue"
              : isCurrentMonth
              ? theme.CONTENT_MODULE_COLOR
              : "white",
          height: 50,
          width: 50,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{date.day}</Text>
      </TouchableOpacity>
    );
  };
  if (success) {
    return (
      <SafeAreaView style={styles.background}>
        <StatusBar />
        <View style={styles.container}>
          <Text style={{ color: "dodgerblue", paddingBottom: 10 }}>
            Your Reminder was created successfully!
          </Text>
          <Button
            onPress={() => {
              setSuccess(false);
              navigation.goBack();
              setModalVisible(false);
            }}
            title="OK"
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Calendar
            style={styles.calendar}
            onDayPress={handleDayPress}
            onMonthChange={(date) =>
              setMonth(parseInt(date.dateString.slice(5, 7)))
            }
            renderArrow={(direction) => {
              if (direction == "left")
                return <Ionicons name="chevron-back-outline" size={30} />;
              if (direction == "right")
                return <Ionicons name="chevron-forward-outline" size={30} />;
            }}
            dayComponent={({ date }) =>
              renderDay(date, new Date().toISOString().slice(0, 10))
            }
            theme={{
              calendarBackground: theme.CONTAINER_COLOR,
            }}
            current={new Date().toISOString().slice(0, 10)}
            monthFormat={"MMMM yyyy"}
            monthOnly={true}

            //onMonthChange={(month) => console.log(month)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "column", gap: 5 }}>
          <InputField
            placeholder={"Date Format: YYYY-MM-DD"}
            value={dueDate}
            onChangeText={setDueDate}
            style={styles.TextInput}
          />
          <InputField
            placeholder={"Title"}
            value={title}
            onChangeText={setTitle}
            style={styles.TextInput}
          />
          <InputField
            placeholder={"Description"}
            value={description}
            onChangeText={setDescription}
            style={styles.TextInput}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 25,
              paddingHorizontal: 50,
            }}
          >
            <Button
              style={styles.button}
              title="Save"
              onPress={ReminderCreation}
            />
            <Button style={styles.button} title="Clear" onPress={clearInputs} />
          </View>
        </View>
        <Modal visible={modalVisible}>
          {" "}
          <SafeAreaView style={styles.background}>
            <View style={styles.modal}>
              <InputField
                placeholder={"Title"}
                value={title}
                onChangeText={setTitle}
                style={styles.TextInput}
              />
              <InputField
                placeholder={"Description"}
                value={description}
                onChangeText={setDescription}
                style={styles.TextInput}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 25,
                  paddingHorizontal: 50,
                }}
              >
                <Button
                  style={styles.button}
                  title="Save"
                  onPress={ReminderCreation}
                />
                <Button
                  style={styles.button}
                  title="Clear"
                  onPress={clearInputs}
                />
                <Button
                  style={styles.button}
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>{" "}
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    gap: 25,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    height: "100%",
    width: 100,
    backgroundColor: "dodgerblue",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputArea: {
    height: 120,
    width: 300,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    flex: 1,
    aspectRatio: 1.5,
    width: "100%",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,
  },
  TextInput: {
    height: 40,
    width: 220,
    marginBottom: 10,
    fontSize: 15,
  },
});
