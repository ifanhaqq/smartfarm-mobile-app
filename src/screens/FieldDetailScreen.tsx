import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { WebView } from "react-native-webview";
import { useFonts } from "expo-font";

const FieldDetailScreen: React.FC = () => {
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
                var map = L.map('map').setView([51.505, -0.09], 13);
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
          <Text style={{ fontWeight: '500', color: '#255599', }}>menu</Text>
          <View style={styles.menuBox}>
            <View style={styles.menuItem}>
              <View style={styles.item}>
                <View style={styles.iconBox}>
                  <Image source={require('../assets/icon-search.png')} style={styles.icon}></Image>
                </View>
                <Text style={styles.menuName}>Prediksi masa tanam</Text>
              </View>
              <View style={styles.menuItem}>
                <View style={styles.item}>
                  <View style={styles.iconBox}>
                    <Image source={require('../assets/icon-report.png')} style={styles.icon}></Image>
                  </View>
                  <Text style={styles.menuName}>Prediksi masa tanam</Text>
                </View>
              </View>
            </View> 
          </View>
        </View>
        <View style={styles.row2}>
          <Image
            source={require("../assets/field.png")}
            style={styles.img}
          ></Image>
          <View style={styles.col}>
            <Text style={styles.cell}> Nama Lahan</Text>
            <Text style={styles.cell2}>Lahan Padi</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.cell}> Masa Tanam</Text>
            <Text style={styles.cell2}>175 Hari</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.cell}> Device Iot</Text>
            <Text style={styles.iotText}>IoT 1</Text>
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
    margin: 5,
    backgroundColor: 'white',
    flex: 1,
  },
  menuBox: {
   
  },
  menuItem: {
    width: '20%',
    borderRadius: 10,
    padding: '4%',
    marginEnd: '4%',
    flexDirection: 'row', 
  },
  item: {
    padding: '4%',
  },
  icon: {
    width: 'auto',
    height: '100%',
  },
  iconBox: {
    backgroundColor: '#F4F6FA',
    height: 'auto',
    padding: '10%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0.2,
    elevation: 19,
  },
  menuName: {
    marginTop: '2%',
    textAlign: 'center',
    flexDirection: 'column',
    width: '110%',
    flexWrap: 'wrap',
    fontWeight: '400',
    fontSize: 12,
    color: '#0F2652',
  },
  row2: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 20,
    marginTop: 40,
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
