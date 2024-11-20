import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { WebView } from "react-native-webview";
import { FieldService } from "src/services/FieldService";
import Loading from "src/components/Loading";
import { RadioButton, Text } from "react-native-paper";
import FieldContext from "src/contexts/FieldContext";

const FieldDetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const fieldService: FieldService = new FieldService();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);
  const [field, setFieldState] = useState<{
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
  const [editName, setEditName] = useState("");
  const fieldContext = useContext(FieldContext);
  // const { setField } = fieldContext;
  
  const [editStatus, setEditStatus] = useState("Panen");

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

      setFieldState(field);
      setEditName(field.name);
      setEditStatus(field.harveststate);

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
  }, [loaded]);

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

  const updateField = async () => {
    const response = await fieldService.updateField(field!.id, editStatus, editName);

    Alert.alert("Sukses", "Data lahan anda berhasil diperbarui!");
    setModalVisible(false);
    setLoaded(false);

    navigation.navigate("Detail Lahan", {
      fieldId: field!.id,
    })

  };
  return (
    <ImageBackground
      source={require("../assets/background-screen.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              marginHorizontal: "10%",
              marginTop: "20%",
              padding: "5%",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 20, height: 20 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
              elevation: 200,
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 0.2,
                borderColor: "%b3b3b3",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginBottom: "5%" }}
              >
                Edit Lahan
              </Text>
              <Image
                source={require("../assets/icon-close.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
            </TouchableOpacity>
            <Text style={{ marginBottom: "3%", marginTop: "5%" }}>
              Nama Lahan
            </Text>
            <TouchableOpacity>
              <TextInput
                style={{
                  borderWidth: 0.2,
                  color: "#5e5e5e",
                  padding: "4%",
                  borderRadius: 10,
                }}
                value={editName}
                onChangeText={setEditName}
              />
            </TouchableOpacity>
            <Text style={{ marginTop: 19 }}>Status</Text>
            <View>
              <RadioButton.Group
                onValueChange={(value) => setEditStatus(value)}
                value={editStatus}
              >
                <View style={{ flexDirection: "row" }}>
                  <RadioButton value="Panen" />
                  <Text style={{ alignSelf: "center" }}>Panen</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton value="Belum panen" />
                  <Text style={{ alignSelf: "center" }}>Belum panen</Text>
                </View>
              </RadioButton.Group>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#74a2d2",
                padding: "2%",
                borderRadius: 10,
                marginTop: "25%",
              }}
              onPress={updateField}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Simpan Edit
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.container}>
          <View style={styles.containerMenu}>
            <View style={styles.menuBox}>
              <View style={styles.menuItem}>
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Predict", {
                        fieldId: field?.id,
                      })
                    }
                  >
                    <View style={styles.iconBox}>
                      <Image
                        source={require("../assets/icon-search.png")}
                        style={{
                          width: 40,
                          height: 40,
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
                        source={require("../assets/icon-cloud.png")}
                        style={{
                          width: 55,
                          height: 30,
                          marginHorizontal: "auto",
                          marginVertical: "auto",
                        }}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.menuName}>Laporan curah hujan</Text>
                </View>
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Neraca Air")}
                  >
                    <View style={styles.iconBox}>
                      <Image
                        source={require("../assets/icon-water.png")}
                        style={{
                          width: 39,
                          height: 50,
                          marginHorizontal: "auto",
                        }}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.menuName}>Neraca air</Text>
                </View>
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Charts")}
                  >
                    <View style={styles.iconBox}>
                      <Image
                        source={require("../assets/icon-monitor.png")}
                        style={{
                          width: 35,
                          height: 45,
                          marginHorizontal: "auto",
                        }}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.menuName}>Monitor lahan</Text>
                </View>
              </View>
              <View style={styles.menuItem}>
                <View style={styles.item}>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.iconBox}>
                      <Image
                        source={require("../assets/icon-edit.png")}
                        style={{
                          width: 40,
                          height: 40,
                          marginHorizontal: "auto",
                        }}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.menuName}>Edit informasi lahan</Text>
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

            <View style={styles.col}>
              <Text style={styles.cell}> Status panen</Text>
              <Text style={styles.iotText}>{field?.harveststate}</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMenu: {
    marginTop: "10%",
    margin: "4%",
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
    padding: "2%",
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
    width: "25%",
    marginBottom: "2%",
    marginRight: "3%",
  },
  icon: {
    width: "auto",
    height: 90,
  },
  iconBox: {
    backgroundColor: "#F4F6FA",
    height: "84%",
    width: "95%",
    marginHorizontal: "auto",
    padding: "10%",
    borderRadius: 20,
  },
  menuName: {
    marginTop: "2%",
    textAlign: "center",
    flexDirection: "column",
    width: "100%",
    flexWrap: "wrap",
    fontWeight: "400",
    fontSize: 12,
    color: "#0F2652",
  },
  row2: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: "4%",
    marginTop: "5%",
    padding: "3%",
  },

  img: {
    width: "99%",
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
  },
  cell: {
    marginTop: 15,
    color: "#545454",
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
    borderColor: "#E0E0E0",
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
