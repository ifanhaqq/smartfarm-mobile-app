import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { useFonts } from "expo-font";
import * as FileSystem from "expo-file-system";
import { FieldService } from "src/services/FieldService";
import Loading from "src/components/Loading";

const FieldDetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const fieldService: FieldService = new FieldService();
  const [loaded, setLoaded] = useState(false);
  const [field, setField] = useState<{
    id: number;
    image: string;
    name: string;
    datecrop: string;
    harveststate: string;
    description: string;
    latitude: string;
    longitude: string;
    created_at: string;
    updated_at: string;
    userId: number;
    deviceId: string;
    deviceName: string;
  }>();

  console.log("field id:", route.params.fieldId);

  async function main() {
    try {
      const field: {
        id: number;
        image: string;
        name: string;
        datecrop: string;
        harveststate: string;
        description: string;
        latitude: string;
        longitude: string;
        created_at: string;
        updated_at: string;
        userId: number;
        deviceId: string;
        deviceName: string;
      } = await fieldService.getField(route.params.fieldId);

      setField(field);

      console.log(field);
    } catch (error) {
      console.log("error fetching fields:", error);
    }
  }

  useEffect(() => {
    function runEffect() {
      main();

      setLoaded(true);
    }

    runEffect();
  }, []);

  if (!loaded) {
    return <Loading />;
  }

  const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
            <style>
                #map { height: 100vh; width: 100vw; }
                body, html { margin: 0; padding: 0; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
            <script>
                var map = L.map('map').setView([${field?.latitude}, ${field?.longitude}], 13);
                var marker = L.marker([${field?.latitude}, ${field?.longitude}], { draggable: false }).addTo(map);
                // show popup marker
                marker.bindPopup('${field?.name}').openPopup();
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
            </script>
        </body>
        </html>
    `;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerMenu}>
          <Text style={{ fontWeight: "500", color: "#255599" }}>menu</Text>
          <View style={styles.menuBox}>
            <View style={styles.menuItem}>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Predict", {
                    fieldId: field?.id,
                  })}
                >
                  <View style={styles.iconBox}>
                    <Image
                      source={require("../assets/icon-search.png")}
                      style={{
                        width: 50,
                        height: 50,
                        marginHorizontal: "auto",
                      }}
                    ></Image>
                  </View>
                </TouchableOpacity>
                <Text style={styles.menuName}>Prediksi masa tanam</Text>
              </View>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("History")}
                >
                  <View style={styles.iconBox}>
                    <Image
                      source={require("../assets/icon-report.png")}
                      style={{
                        width: 30,
                        height: 50,
                        marginHorizontal: "auto",
                      }}
                    ></Image>
                  </View>
                </TouchableOpacity>
                <Text style={styles.menuName}>Laporan curah hujan</Text>
              </View>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Monthly Report")}
                >
                  <View style={styles.iconBox}>
                    <Image
                      source={require("../assets/icon-water.png")}
                      style={{
                        width: 33,
                        height: 50,
                        marginHorizontal: "auto",
                      }}
                    ></Image>
                  </View>
                </TouchableOpacity>
                <Text style={styles.menuName}>Neraca air</Text>
              </View>
              <View style={styles.item}>
                <View style={styles.iconBox}>
                  <Image
                    source={require("../assets/icon-cloud.png")}
                    style={{
                      width: 55,
                      height: 30,
                      marginHorizontal: "auto",
                      marginVertical: "auto",
                    }}
                  ></Image>
                </View>
                <Text style={styles.menuName}>Prediksi hari hujan</Text>
              </View>
            </View>
          </View>
          <View style={styles.menuBox}>
            <View style={[styles.menuItem, { justifyContent: "flex-start" }]}>
              <View style={styles.item}>
                <TouchableOpacity onPress={() => navigation.navigate("Charts")}>
                  <View style={styles.iconBox}>
                    <Image
                      source={require("../assets/icon-monitor.png")}
                      style={{
                        width: 33,
                        height: 55,
                        marginHorizontal: "auto",
                      }}
                    ></Image>
                  </View>
                </TouchableOpacity>
                <Text style={styles.menuName}>Monitor lahan</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.row2}>
          {!field?.image ? (
            <Image
              source={require("../assets/alternative-image.png")}
              style={styles.img}
            ></Image>
          ) : (
            <Image
              source={{
                uri: `https://planting-prediction.petanitech.com/storage/img/fields/${field.image}`,
              }}
              style={styles.img}
            ></Image>
          )}
          <View style={styles.col}>
            <Text style={styles.cell}> Nama Lahan</Text>
            <Text style={styles.cell2}>{field?.name}</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.cell}> Masa Tanam</Text>
            <Text style={styles.cell2}>175 Hari</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.cell}> Device Iot</Text>
            <Text style={styles.iotText}>{field?.deviceName}</Text>
          </View>

          {/* WebView Container */}
          <View style={styles.webViewContainer}>
            <Text style={styles.locationText}>Lokasi Lahan</Text>
            <WebView
              originWhitelist={["*"]}
              source={{ html }}
              style={styles.webView}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    opacity: 0.8,
  },
  containerMenu: {
    margin: 20,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
  },
  menuBox: {},
  menuItem: {
    flex: 1,
    justifyContent: "space-between",
    // borderWidth: 1,
    borderRadius: 10,
    padding: "4%",
    marginEnd: "4%",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  item: {
    // padding: "4%",
    flex: 0,
    // borderWidth: 1,
    width: 80,
  },
  icon: {
    width: "auto",
    height: 90,
  },
  iconBox: {
    backgroundColor: "#F4F6FA",
    height: 60,
    width: 60,
    marginHorizontal: "auto",
    padding: "10%",
    borderRadius: 10,
  },
  menuName: {
    marginTop: "2%",
    textAlign: "center",
    flexDirection: "column",
    width: "110%",
    flexWrap: "wrap",
    fontWeight: "400",
    fontSize: 12,
    color: "#0F2652",
  },
  row2: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 20,
    marginTop: 20,
    padding: 19,
    width: 350,
    justifyContent: "center",
  },

  img: {
    width: 295,
    height: 150,
  },
  cell: {
    marginTop: 15,
    fontWeight: "bold",
  },
  cell2: {
    marginTop: 15,
    marginLeft: "auto",
    color: "#2255B8",
    fontWeight: "500",
  },
  col: {
    flexDirection: "row",
    borderBottomWidth: 0.2,
    borderColor: "#545454",
    paddingVertical: 5,
  },
  iotText: {
    marginTop: 15,
    marginLeft: "auto",
    color: "#2255B8",
    fontWeight: "500",
  },
  info: {
    rowGap: 5,
    marginStart: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "#2255B8",
    fontFamily: "Montserrat-Bold",
  },
  locationText: {
    fontWeight: "bold",
    color: "#2255B8",
    marginBottom: 10,
  },
  webViewContainer: {
    marginTop: 20,
    height: 250, // Set height to ensure WebView displays correctly
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  webView: {
    flex: 1,
  },
});

export default FieldDetailScreen;
