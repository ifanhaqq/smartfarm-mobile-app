import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'; 

const FieldScreen: React.FC = () => {
    return ( 
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.h1}>Semua lahan</Text>
                <View style={styles.col}>

                    <View style={styles.table}>
                        <Image style={styles.img}></Image>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Nama lahan </Text>
                        <Text style={styles.cellTitle}>Lahan padi</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Masa Tanam </Text>
                        <Text style={styles.cellTitle}>175 Hari</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Status Panen </Text>
                        <Text style={styles.cellTitle}>Sudah</Text>
                    </View>
                    <LinearGradient colors={['#2255B8', '#4D73A9E6' ]} style={styles.cellBtn2}>
                        <View style={styles.row}>
                            <Text style={styles.cellBtn2} >Detail</Text>
                            <Text style={styles.line}></Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>
            <LinearGradient colors={['rgba(77, 115, 169, 1)', 'rgba(204, 221, 226, 0.5)']} style={styles.box2}>

                <Text style={styles.title2}>Rekomendasi</Text>
                <View style={styles.box3}>
                    <View style={styles.row}>
                        <Text style={styles.h3}>Prediksi Masa Tanam </Text>
                        <Image source={require('../assets/icon-search.png')} style={styles.icon}></Image>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.pwhite}>dapatkan momen yang pas untuk bertani </Text>
                    </View>
                </View>
            </LinearGradient>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        backgroundColor: '#DDECF8',
        opacity: 0.8,


    },
    box: {
        margin: 20,
        backgroundColor: 'white',
        padding: 5,
        width: 340,
        borderRadius: 15, 
        shadowColor: '#000000',    // Shadow color
       
    },

    col: {
        width: 320,
        borderRadius: 30,
        borderBottomWidth: 0.2,
        paddingBottom: 10,
        borderBottomColor: '#545454',

    },
    h1: {
        fontSize: 20,
        color: '#2255B8',
        fontWeight: 'bold',
        borderBottomColor: '#545454',
        borderBottomWidth: 0.2,
        marginVertical: 15,

    },

    img: {
        width: 290,
        height: 120,
        backgroundColor: '#545454',
        borderRadius: 10,
        textAlign: 'center',
    },
    h2: {
        fontSize: 15,
        color: '#2255B8',
        borderBottomColor: '#545454',
        textAlign: 'left',
        fontWeight: 'bold',

    },
    br: {

    },
    pBold: {

    },
    table: {
        margin: 20,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        padding: 10,
        textAlign: 'left',
        width: 150,

    },
    cellTitle: {
        padding: 10,
        textAlign: 'left',
        width: 150,
        color: '#2255B8',
        fontWeight: 'bold',
    },
    line: {
        borderBottomWidth: 0.5,
        marginVertical: 10,
    },
    cellBtn2: { 
         
        marginStart:7,
        paddingTop: 7,
        borderRadius: 30,
        color: 'white',
        fontWeight: 'bold',
        width: 300,
        textAlign: 'center',

    },
    box2: {
        flex: 1,
        margin: 20,
        backgroundColor: '#245194',
        padding: 5,
        width: 340,
        borderRadius: 15,
    },
    title2: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 15,
    },
    h3: {
        fontSize: 15,
        color: 'white',
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: 15,
    },
    icon: {
        width: 50,
        height: 50,
        marginStart: 100,
    },
    pwhite: {
        color: 'white',
    },
    box3: {
        backgroundColor: '#FFFFFF1A',
        padding: 10,
        borderRadius: 20,
        gap: 2,
    },
});

export default FieldScreen;