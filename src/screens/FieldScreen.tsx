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
                    <LinearGradient colors={['#24C6DC   , #514A9D']} style={styles.cellBtn2}>
                        <View style={styles.row}>
                            <Text style={styles.cellBtn2} >Detail</Text>
                            <Text style={styles.line}></Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>

            <View style={styles.box2}>
                <Image source={require('../assets/vektor-lahan.png')} style={styles.img2}></Image>
            </View>
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
        marginStart: 20,
        marginEnd: 20,
        marginTop: 20,
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
        fontWeight: 'medium',
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
        marginStart: 7,
        paddingTop: 7,
        borderRadius: 30,
        color: 'white',
        fontWeight: 'bold',
        width: 300,
        textAlign: 'center',
    },
    box2: {
        backgroundColor: '#5C93E0',
        width: 350,
        marginStart: 15, 
        borderRadius: 10,
    },
    img2: {
        width: 150,
        height: 140,
        margin: 15,
    }

});

export default FieldScreen;