import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';



const FieldDetailScreen: React.FC = () => {
    const [loaded] = useFonts({
        'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
    })

   
    
    return (
        <View style={styles.container}>
            <View style={styles.row} >
                <View style={styles.box}>
                    <Image source={require('../assets/icon-monitor.png')} style={{ width: 40, height: 40 }}></Image>
                </View>
                <View style={{ rowGap: 5, marginStart: 10, borderEndWidth: 0.2, }}>
                    <Text style={{ fontWeight: 'bold', color: '#2255B8', marginEnd: 10, }} >Monitor </Text>
                    <Text>Lahan</Text>
                </View>
                <View style={styles.box}>
                    <Image source={require('../assets/icon-clock.png')} style={{ width: 35, height: 35, marginStart: 20 }}></Image>
                </View>
                <View style={{ rowGap: 5, marginStart: 10, }}>
                    <Text style={{ fontWeight: 'bold', color: '#2255B8', marginEnd: 10, fontFamily: 'Montserrat-Bold' }} >History</Text>
                    <Text>Device Lahan</Text>
                </View>
            </View>

            <View style={styles.row2}>
                <Image source={require('../assets/field.png')} style={styles.img}></Image>
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
                    <Text style={[styles.cell2, {marginLeft:160}]}>IoT 1</Text>
                </View>
                <View style={[styles.col, { borderBottomWidth: 0.1, marginTop:20, }]}>
                    <Text style={{fontWeight: 'bold', color:'#2255B8'}}> Lokasi Lahan</Text>
                    
                </View>
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
    row: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 20,
        marginTop: 40,
        padding: 19,
        width: 350,
        justifyContent: 'center',
    },
    row2: {
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 20,
        marginTop: 40,
        padding: 19,
        width: 350,
        justifyContent: 'center',
    },
    box: {

    },
    img: {
        width: 295,
        height: 150,
    },
    cell: {
        marginTop: 15,
       
    },
    cell2: {
        marginTop: 15,
       
        textAlign:'right',
        marginLeft: 140,
        color: '#2255B8',
        fontWeight: '500',
    },
    col:{
        flexDirection: 'row', 
        borderBottomWidth: 0.2,
        borderColor: '#545454',
      
        
    },
});

export default FieldDetailScreen;