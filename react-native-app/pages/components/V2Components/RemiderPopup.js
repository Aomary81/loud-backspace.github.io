import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import theme from "../../../styles/theme.style";
import BlurredPopup from "./BlurredPopup";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ReminderPopup({ reminder, hidePopup }) {
  return (
    <BlurredPopup onExitPress={() => hidePopup(false)}>
      <View
        style={{
          flex: 1,
          height: "37%",
          width: "90%",
          flexDirection: "row",
          marginBottom: 4,
          marginLeft: 5,
          marginTop: 5,
          backgroundColor: theme.BACKGROUND_COLOR,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={[
              styles.text,
              { fontSize: 16, paddingBottom: 2, fontWeight: "bold" },
            ]}
          >
            {monthNames[new Date(reminder.dueDate).getMonth()]}
            {", "}
            {new Date(reminder.dueDate).getDay()}{" "}
            {new Date(reminder.dueDate).getFullYear()}
          </Text>
          <Text
            style={[
              styles.text,
              { fontSize: 16, paddingBottom: 2, fontWeight: "bold" },
            ]}
          >
            {reminder.title}
          </Text>
          <Text
            style={[
              styles.text,
              { fontSize: 16, paddingBottom: 2, fontWeight: "bold" },
            ]}
          >
            {reminder.description}
          </Text>
        </View>
      </View>
    </BlurredPopup>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.TEXT_COLOR,
    fontSize: 15,
  },
  popupImages: {
    backgroundColor: theme.TEXT_COLOR,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
});
