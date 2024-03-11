import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";

import {
  firstWeekday,
  daysInMonth,
  getPreviousMonth,
  getCalendar,
} from "../utils/date-utils";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [displayedCalendar, setDisplayedCalendar] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  const prevMonth = getPreviousMonth(
    displayedCalendar.month,
    displayedCalendar.year
  );

  let [fontsLoaded, fontsError] = useFonts({ Poppins_500Medium });
  if (!fontsLoaded && !fontsError) {
    return null;
  }

  const calendar = getCalendar(displayedCalendar.month, displayedCalendar.year);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerMonth}>
            {selectedDate.toLocaleString("default", { month: "long" })}
          </Text>
          <Text style={styles.headerYear}>{selectedDate.getFullYear()}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity>
            <Text style={styles.button}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.button}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.calendar}>
        {calendar.map((week, idx) => (
          <View key={idx} style={styles.week}>
            {week.map((day) => (
              <Text
                key={`${week}-${day.day}`}
                style={[
                  styles.date,
                  styles[day.state],
                  day.day === selectedDate.getDate() &&
                  displayedCalendar.month === selectedDate.getMonth() &&
                  displayedCalendar.year === selectedDate.getFullYear()
                    ? styles.selected
                    : null,
                ]}
              >
                {day.day}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#131313",
    borderColor: "#B7B7B75E",
    borderWidth: 1,
    borderRadius: 7,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  headerMonth: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#FFF",
  },
  headerYear: {
    fontFamily: "Poppins_500Medium",
    fontSize: 25,
    color: "#FFF",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    color: "#FFF",
  },
  calendar: {},
  week: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  date: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#FFF",
    textAlign: "center",
    lineHeight: 27,
    width: 27,
    height: 27,
  },
  disabled: {
    opacity: 0.2,
  },
  selected: {
    backgroundColor: "#00A19B",
    borderRadius: 13.5,
    overflow: "hidden",
  },
});
