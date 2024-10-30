import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

const FieldScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.box]}>
          <Text style={styles.h1}>Semua lahan</Text>
          <ScrollView style={styles.fieldsWrapper}>
            <View style={styles.fieldColumn}>
              <View style={styles.fieldImageWrapper}>
                <Image
                  style={styles.fieldImage}
                  source={require("../assets/field.png")}
                />
              </View>
              <View style={{ paddingTop: 20 }}>
                <Text style={{ color: "#2255B8", fontWeight: "bold" }}>
                  Field Title
                </Text>
                <View
                  style={{
                    flex: 0,
                    flexDirection: "row",
                    marginTop: 7,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#D9D9D9',
                    height: 40,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 12 }}>Masa tanam</Text>
                    <Text style={{ fontSize: 12 }}>Status panen</Text>
                  </View>
                  <View style={{ marginLeft: 50 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#2255B8",
                        fontWeight: "medium",
                      }}
                    >
                      175 Hari
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#2255B8",
                        fontWeight: "medium",
                      }}
                    >
                      Panen
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.detailButton}>
                  <Text style={{ color: "#fff", marginHorizontal: 18, fontSize: 18 }}>
                    Detail
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.box2}>
          <Image
            source={require("../assets/vektor-lahan.png")}
            style={styles.img2}
          ></Image>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DDECF8",
    paddingTop: 50,
  },

  wrapper: {
    backgroundColor: "#5C93E0",
    marginStart: 20,
    // marginRight: 20,
    marginTop: 20,
    width: 340,
    borderRadius: 15,
  },

  box: {
    backgroundColor: "#fff",
    padding: 5,
    // borderWidth: 0.4,
    borderColor: "grey",
    borderRadius: 15, // Shadow color
  },

  fieldsWrapper: {
    width: 320,
    borderRadius: 30,
    borderBottomWidth: 0.2,
    paddingBottom: 10,
    borderBottomColor: "#545454",
    height: 300,
  },
  h1: {
    fontSize: 20,
    color: "#2255B8",
    fontWeight: "bold",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 0.2,
    // marginVertical: 15,
    marginTop: 15,
  },
  box2: {
    // backgroundColor: '#5C93E0',
    width: 350,
    marginStart: 15,
    borderRadius: 10,
  },
  img2: {
    width: 150,
    height: 140,
    margin: 15,
  },
  fieldColumn: {
    flex: 1,
    height: 145,
    flexDirection: "row",
    // borderWidth: 1,
  },
  fieldImage: {
    height: 100,
    width: 120,
    // marginLefft: 5,
    marginVertical: "auto",
    borderRadius: 15
  },
  fieldImageWrapper: {
    // borderWidth: 1,
    width: 135,
  },
  detailButton: {
    marginLeft: "auto",
    backgroundColor: "#255599",
    marginTop: 12,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default FieldScreen;
