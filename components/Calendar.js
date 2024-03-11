import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";

import {
  getCalendar,
  getPreviousMonth,
  getNextMonth,
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

  const nextMonth = getNextMonth(
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
            {new Date(
              displayedCalendar.year,
              displayedCalendar.month,
              1
            ).toLocaleString("default", { month: "long" })}
          </Text>
          <Text style={styles.headerYear}>{displayedCalendar.year}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              setDisplayedCalendar({
                month: prevMonth.month,
                year: prevMonth.year,
              })
            }
          >
            <Text style={styles.button}>
              <ChevronLeft />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setDisplayedCalendar({
                month: nextMonth.month,
                year: nextMonth.year,
              })
            }
          >
            <Text style={styles.button}>
              <ChevronRight />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.calendar}>
        {calendar.map((week, idx) => (
          <View key={idx} style={styles.week}>
            {week.map((day) => {
              return (
                <TouchableOpacity
                  key={`${week}-${day.day}`}
                  onPress={() =>
                    setSelectedDate(
                      new Date(
                        displayedCalendar.year,
                        displayedCalendar.month,
                        day.day
                      )
                    )
                  }
                  disabled={day.state === "disabled"}
                >
                  <Text
                    style={[
                      styles.date,
                      styles[day.state],
                      day.state !== "disabled" &&
                      day.day === selectedDate.getDate() &&
                      displayedCalendar.month === selectedDate.getMonth() &&
                      displayedCalendar.year === selectedDate.getFullYear()
                        ? styles.selected
                        : null,
                    ]}
                  >
                    {day.day}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 5,
  },
  headerMonth: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#FFF",
    marginRight: 5,
  },
  headerYear: {
    fontFamily: "Poppins_500Medium",
    fontSize: 25,
    color: "#FFF",
  },
  actions: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  button: {
    color: "#FFF",
    padding: 7,
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
