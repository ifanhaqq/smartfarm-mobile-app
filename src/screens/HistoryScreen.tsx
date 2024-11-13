import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { DailyStatusService } from "src/services/DailyStatusService";
import { format, subDays } from 'date-fns';

type rainListProps = { rainListDate: string; rainListStatus: string };

const Item = ({ rainListDate, rainListStatus }: rainListProps) => (
  <View
    style={[
      styles.rainList,
      rainListStatus == "Hari Kering"
        ? { backgroundColor: "#CBC103" }
        : { backgroundColor: "#357FD3" },
    ]}
  >
    <Text style={styles.rainListDate}>{rainListDate}</Text>
    <Text style={styles.rainListStatus}>{rainListStatus}</Text>
  </View>
);

const HistoryScreen: React.FC = () => {
  const [coloredDates, setColoredDates] = useState();

  useEffect(() => {
    const fetch = async () => {
        const dailyStatusService: DailyStatusService = new DailyStatusService();
        const response: {status: number, date: string}[] = await dailyStatusService.getDailyStatus();
        const dateMarkers: any = {};
        
        let startDate = subDays(new Date(), 1);

        response.map((value, index) => {
            const date = format(subDays(startDate, index), 'yyyy-MM-dd');
            dateMarkers[date] = {
                selected: true,
                color: value.status === 1 ? '#50cebb' : '#CBC103'
            }
        });

        setColoredDates(dateMarkers);
        console.log(dateMarkers)
    }

    fetch();
  }, []);

  return (
    <LinearGradient colors={["#bfd7eb", "#ffffff"]} style={styles.background}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "transparent", // Set theme background color to transparent
            calendarBackground: "transparent", // Set calendar background to transparent
            textSectionTitleColor: "#255599",
            textSectionTitleDisabledColor: "#255599",
            textDayHeaderFontWeight: "bold",
          }}
          markingType={"period"}
          markedDates={coloredDates}
        ></Calendar>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            marginTop: "20%",
            marginBottom: "7%",
          }}
        >
          Keterangan:
        </Text>
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#CBC103",
              alignSelf: "center",
            }}
          ></View>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Hari Kering</Text>
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 7,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#50cebb",
              alignSelf: "center",
            }}
          ></View>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Hari Basah</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  calendar: {
    backgroundColor: "transparent",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 740,
  },
  flatListContainer: {
    // marginBottom: 10
  },
  rainList: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 10,
  },

  rainListDate: {
    color: "#ffffff",
    fontSize: 15,
    fontStyle: "italic",
  },

  rainListStatus: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 20,
  },
});

export default HistoryScreen;
