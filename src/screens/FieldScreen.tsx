import React, { useState, useContext, useEffect,  } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { FieldService } from "src/services/FieldService";
import * as FileSystem from "expo-file-system";
import FieldContext from "src/contexts/FieldContext";
import Loading from "src/components/Loading";

import CloudHeader from 'src/components/CloudHeader';

const FieldScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const fieldService: FieldService = new FieldService();
  const [loaded, setLoaded] = useState(false);
  const fieldContext = useContext(FieldContext);
  const { setField } = fieldContext;
  const [fields, setFields] = useState<
    {
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
    }[]
  >([]);

  async function main() {
    try {
      const fields: {
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
      }[] = await fieldService.getAllFields();
      console.log(JSON.stringify(fields, null, 2));

      setFields(fields);
    } catch (error) {
      console.log("error fetching fields:", error);
    }
  }

  useEffect(() => {
    async function runEffect() {
      main()

      setLoaded(true);
    }

    runEffect();
  }, []);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <ImageBackground
    source={require('../assets/background-screen.png')}
    style={styles.background}
    resizeMode="cover"
>
<CloudHeader></CloudHeader>
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.box]}>
          <Text style={styles.h1}>Semua lahan</Text>
          <ScrollView style={styles.fieldsWrapper}>
            {fields.map((field, index) => (
              <View key={index} style={styles.fieldColumn}>
                <View style={styles.fieldImageWrapper}>
                  <Image
                    source={{
                      uri:
                        `https://planting-prediction.petanitech.com/storage/img/fields/${field.image}`,
                    }}
                    style={styles.fieldImage}
                  />
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ color: "#2255B8", fontWeight: "semibold" }}>
                    {field.name}
                  </Text>
                  <View
                    style={{
                      flex: 0,
                      flexDirection: "row",
                      marginTop: 7,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#D9D9D9",
                      height: 40,
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 12 }}>Masa tanam</Text>
                      <Text style={{ fontSize: 12 }}>Status panen</Text>
                    </View>
                    <View style={{ marginLeft: 40 }}>
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
                        {field.harveststate}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() =>
                      navigation.navigate("Field Detail", {
                        fieldId: field.id,
                      })
                    }
                  >
                    <Text
                      style={{
                        color: "#fff",
                        marginHorizontal: 18,
                        fontSize: 18,
                      }}
                    >
                      Detail
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <Image
          source={require("../assets/vector-lahan.png")}
          style={styles.img2}  ></Image>
      </View>
    </ScrollView>
     </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {  
  }, 
  background: {
    flex: 1,

},
  wrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginStart: '2%',
    marginEnd: '2%',
    // marginRight: 20,
    marginTop: '5%',
    width: '96%', 
    marginBottom: '10%',
    borderRadius: 15,
    flex: 1,
    paddingBottom: '27%',

  },

  box: {
    height: '85%',
    backgroundColor: "#fff",
    padding: 5,
    // borderWidth: 0.4,
    borderColor: "grey",
    borderRadius: 15, // Shadow color
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },

  fieldsWrapper: {
    width: '100%',
    borderRadius: 30,
    borderBottomWidth: 0.2,
    paddingBottom: 10,
    borderBottomColor: "#545454",
    height: '90%',

  },
  h1: {
    fontSize: 17,
    color: "#2255B8",
    fontWeight: "semibold",
    backgroundColor: 'white',
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 0.2,

    width: '100%',
    borderRadius: 10,
    padding: 10,
    // marginVertical: 15, 
    marginBottom: '2%',
    textAlign: 'center',

  },
  box2: {
    // backgroundColor: '#5C93E0',  
    marginStart: 15,
    borderRadius: 10,
  },
  img2: {
    width: 300,
    height: 180, 
    marginStart: '9%',
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
    alignSelf: "center",
    borderRadius: 15,
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
