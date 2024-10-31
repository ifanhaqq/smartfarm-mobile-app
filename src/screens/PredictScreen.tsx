import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import CloudHeader from 'src/components/CloudHeader';
import { Background } from 'victory-native';

const PredictScreen: React.FC = () => {
    return (

        <ScrollView style={styles.screenBackground}>
            <CloudHeader ></CloudHeader>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Text style={styles.bannerText}>Prediksi presentase dan kadar air selama satu bulan ke depan</Text>
                    {/* <Image source={require('../assets/predict-vector-yes.png')} style={styles.vector}></Image> */}
                    <Image source={require('../assets/predict-vector-no.png')} style={styles.vector}></Image>
                </View>
                <View style={styles.containerValue}>

                    <Text style={styles.title}>Hasil Prediksi</Text>
                    <View style={styles.datecoloumn}>
                        <Text style={{ color: '#2255B8' }}>Bulan  </Text>
                        <Text style={{ color: '#2255B8' }}>November</Text>
                    </View>
                    <View style={styles.col}>
                        <View style={styles.col2}>
                            <Image source={require("../assets/icon-soil.png")} style={styles.icon}></Image>
                            <View style={{ flexDirection: 'column', marginStart: 5, }}>
                                <Text style={{ color: '#616161' }} > kadar air tanah</Text>
                                <Text style={styles.value}>0.75</Text>
                            </View>
                        </View>
                        <View style={styles.col2}>
                            <Image source={require("../assets/icon-water.png")} style={{ width: 19, height: 28, }}></Image>
                            <View style={{ flexDirection: 'column', marginStart: 5, }}>
                                <Text style={{ color: '#616161' }}> % air tanah tersedia</Text>
                                <Text style={styles.value}>0.75</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.valueText}>Tidak disarankan untuk menanam padi</Text>
                    {/* <Text style={styles.valueText}>Cukup tidak disarankan untuk menanam padi</Text>
                    <Text style={styles.valueText}>Sangat disarankan untuk menanam padi</Text>
                    <Text style={styles.valueText}>Cukup disarankan untuk menanam padi</Text>
                    <Text style={styles.valueText}>Sangat tidak disarankan untuk menanam padi</Text> */}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenBackground: {
        backgroundColor: '#DDECF8',
        flex: 1,
    },
    container: {
        alignSelf: 'flex-start',
        margin: '5%',
        backgroundColor: '#FFFFFF', 
        borderRadius: 60,
        width: '90%', 
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5, 
  
    },
    imageContainer: { 
        borderRadius: 30,
        borderBottomWidth: 0.2,
        paddingBottom: 10,
        borderBottomColor: "#545454", 
        backgroundColor: '#FFFFFF',
    
        marginBottom: '10%',
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5, 
    },
    bannerText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500',
        color: '#255599', 
        marginTop: '10%',
        marginStart: '2%',
        marginEnd: '2%',
        borderBottomWidth: 0.3,
        borderBottomColor: '#DDDDDD', 
        rowGap: 20,
    },
    vector: {
        alignSelf: 'center',
        width: 300,
        height: 330,
       

    },
    containerValue: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: '2%',
    },
    title: {
        color: '#2255B8',
        fontWeight: '500',
        fontSize: 17,
        textAlign: 'center',
    },
    valueText: {
        color: '#616161',
        fontWeight: '400',
        fontSize: 15,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: '#D9D9D9',
        padding: '5%',
        textAlign: 'center',
    },
    col: {
        flexDirection: 'row',
        padding: 4,

    },
    col2: {
        borderRadius: 10,
        borderColor: '#D9D9D9',
        borderWidth: 0.2,
        flexDirection: 'row',
        padding: 10,
        marginEnd: 5,

    },
    value: {
        color: '#407BFF',
    },
    icon: {
        width: 30,
        height: 30,
    },
    datecoloumn: {
        flexDirection: 'row',
        marginEnd: '50%',
        borderWidth: 0.2,
        padding: 5,
        borderColor: '#D9D9D9',
        borderRadius: 15,
    }
});

export default PredictScreen;