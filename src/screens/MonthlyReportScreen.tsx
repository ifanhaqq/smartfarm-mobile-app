import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Icon } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";
import { ReportService } from "src/services/ReportService";
import CloudHeader from "src/components/CloudHeader";
const MonthlyReportScreen: React.FC = () => {
  const [monthsPriorData, setMonthsPriorData] = useState<string>("");
  const [dropdownItem, setDropdownItem] = useState<
    { label: string; value: string }[]
  >([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [reportData, setReportData] = useState<any[]>([]);
  const [ats, setAts] = useState<number>(0);
  const [waterData, setWaterData] = useState<
    {
      month: string;
      groundwater_level: number;
      groundwater_available: number;
    }[]
  >([]);

  useEffect(() => {
    async function reportHandler() {
      const reportService: ReportService = new ReportService();

      try {
        const stats: {
          groundwater_available: number;
          groundwater_level: number;
          month: string;
        }[] = await reportService.getMonthlyWaterStats();

        const newDropdownItems = stats.map((stat, index) => ({
          value: stat.month,
          label: stat.month,
        }));

        setDropdownItem(newDropdownItems);
        setWaterData(stats);

        console.log(stats);
      } catch (error) {
        console.log(error);
      }
    }

    reportHandler();

    return () => {
      setDropdownItem([]);
    };
  }, [monthsPriorData]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Laporan Bulanan Neraca Air</Text>
      <DropDownPicker
        style={styles.dropdown}
        open={dropdownOpen}
        items={dropdownItem}
        value={monthsPriorData}
        setValue={(callback) => {
          // Manually update monthsPriorData from the dropdown
          const newValue =
            typeof callback === "function"
              ? callback(monthsPriorData)
              : callback;
          setMonthsPriorData(newValue);
        }}
        setItems={setDropdownItem}
        setOpen={setDropdownOpen}
        placeholder="Pilih bulan"
      />
      {monthsPriorData.length === 0 ? (
        <View style={styles.box}>
            <Text style={styles.tableTitle}>Tolong pilih bulan terlebih dahulu!</Text>
        </View>
      ) : (
        <View style={styles.box}>
          <View style={styles.table}>
            <Text style={styles.tableTitle}>Hasil laporan</Text>
            <View style={styles.col}>
              <View style={styles.col2}>
                <Image
                  source={require("../assets/icon-soil.png")}
                  style={styles.icon}
                ></Image>
                <View style={styles.textGroup}>
                  <Text style={styles.textLabel}> kadar air tanah</Text>
                  <Text style={styles.value}>{waterData.find((element) => element.month === monthsPriorData)?.groundwater_available}</Text>
                </View>
              </View>
              <View style={styles.col2}>
                <Image
                  source={require("../assets/icon-water.png")}
                  style={{ width: 23, height: 30 }}
                ></Image>
                <View style={{ flexDirection: "column", marginStart: 5 }}>
                  <Text style={{ color: "#616161" }}>
                    {" "}
                    % air tanah tersedia
                  </Text>
                  <Text style={styles.value}>{waterData.find((element) => element.month === monthsPriorData)?.groundwater_level}</Text>
                </View>
              </View>
            </View>

            {ats <= 40 && ats >= 10 ? (
              <Text style={styles.description}>
                Tidak disarankan untuk menanam padi
              </Text>
            ) : ats <= 60 && ats >= 41 ? (
              <Text style={styles.description}>
                Cukup tidak disarankan untuk menanam padi
              </Text>
            ) : ats <= 90 && ats >= 61 ? (
              <Text style={styles.description}>
                Sangat disarankan untuk menanam padi
              </Text>
            ) : ats >= 91 ? (
              <Text style={styles.description}>
                Cukup disarankan untuk menanam padi
              </Text>
            ) : (
              <Text style={styles.description}>
                Sangat tidak disarankan untuk menanam padi
              </Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.row2}>
        <Image
          source={require("../assets/banner-1.png")}
          style={{ width: 350, height: 100 }}
        ></Image>
        <Text style={styles.headline}>Berikut beberapa kegunaannya :</Text>
        <Text style={styles.p}>1. Mengatur jadwal tanam dan panen</Text>
        <Text style={styles.p}>
          2. Mengatur pemberian air irigasi dalam jumlah dan waktu yang tepat
        </Text>
        <Text style={styles.p}>
          3. Mempertimbangkan kesesuaian lahan pertanian
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7E8F4",
  },
  dropdown: {
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
    color: "#A1A1A1",
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    borderColor: "white",
    color: "#545454",
    fontWeight: "semibold",
    fontSize: 20,
  },
  table: {
    paddingTop: 10,
    paddingStart: 10,
    backgroundColor: "white",
    borderRadius: 10,
    color: "#616161",
    marginStart: 20,
    marginEnd: 20,
  },
  textLabel: { color: "#616161" },
  row: {
    flexDirection: "row",
    marginStart: 25,
    marginEnd: 25,
    marginBottom: 10,
    color: "#616161",
  },
  row2: {
    backgroundColor: "white",
    height: "auto",
    padding: 10,
    borderRadius: 10,
  },
  cell: {
    padding: 10,

    borderColor: "#ccc",
    textAlign: "center",
    width: "auto",
    rowGap: 5,
    color: "#616161",
  },
  description: {
    margin: 10,
    padding: 10,
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: "#D9D9D9",
    color: "#616161",
  },
  textGroup: {
    color: "#616161",
    margin: 5,
    fontWeight: "semibold",
    fontSize: 17,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    margin: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  col: {
    flexDirection: "row",
    padding: 4,
  },
  col2: {
    borderRadius: 10,
    borderColor: "#D9D9D9",
    borderWidth: 0.2,
    flexDirection: "row",
    padding: 10,
    marginEnd: 5,
  },
  value: {
    color: "#407BFF",
  },
  headline: {
    marginTop: 10,
    marginStart: 15,
    fontSize: 14,
    fontWeight: "300",
    color: "#545454",
  },
  p: {
    color: "#545454",
    margin: 4,
    marginStart: 15,
    fontWeight: "300",
  },
  tableTitle: {
    color: "#616161",
    margin: 5,
    fontWeight: "semibold",
    fontSize: 17,
  },
});

export default MonthlyReportScreen;
