import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const icons: Record<string, any> = {
    'icon-humidity': require("../assets/icon-humidity.png"),
    'icon-pm10': require("../assets/icon-pm10.png"),
    'icon-pm25': require("../assets/icon-pm25.png"),
    'icon-pressure': require("../assets/icon-pressure.png"),
    'icon-noise': require("../assets/icon-noise.png"),
    'icon-luxh': require("../assets/icon-luxh.png"),
    'icon-thermostat': require("../assets/icon-thermostat.png"),
    'icon-luxl': require("../assets/icon-luxl.png"),
    'icon-wd': require("../assets/icon-wd.png"),
    'icon-avgws': require("../assets/icon-avgws.png"),
    'icon-raind': require("../assets/icon-raind.png")
};

const SmallWidgetIcon: React.FC<any> = ({ icon, value, title }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconText}>
        <Image
          style={{ width: 20, height: 21 }}
          source={icons[icon]}
        />
        <Text style={styles.iconTitle}>{value}</Text>
      </View>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    alignItems: "center",
    marginBottom: 15,
  },
  titleText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  iconText: {
    backgroundColor: "#ffffff",
    borderRadius: 100,
    padding: 1,
    paddingHorizontal: 10,
    marginStart: 5,
  },
  iconTitle: {
    textAlign: "center",
    color: "#407bff",
  },
  icon: {},
});

export default SmallWidgetIcon;
