import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

import Calendar from "./components/Calendar";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  let [fontsLoaded, fontsError] = useFonts({ Poppins_600SemiBold });

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar</Text>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030303",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    color: "#FFF",
    fontSize: 32,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "left",
    width: "100%",
  },
});
