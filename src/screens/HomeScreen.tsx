import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";

const HomeScreen: React.FC = () => {

    // console.log(fieldContext);
    return (
        <ScrollView style={styles.background}>
            <View style={styles.container}> 
                <View style={styles.helloBar}>
                    <Text style={[styles.textStyle, styles.align]}>Hello</Text>
                    <Text style={styles.textStyle}>Thursday, 21 April 2023</Text>
                </View>
                <View >
                    <Image source={require('../assets/banner-home-1.png')} style={styles.homeBanner}></Image>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#DDECF8',
    },
    container: {
        flex: 1,
    },
    helloBar: {
        flexDirection: 'row',
        margin: '5%',
        marginTop: '10%',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: '5%',
    },
    textStyle: {
        color: '#2255B8',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,



    },
    align: {
        marginEnd: '37%',
        fontWeight: '500',
        fontSize: 16
    },
    homeBanner: {
        marginStart: '2%',
        marginEnd: '2%',
        width: 350, 
        height: 180,  
        borderRadius: 15,  
    },
});

export default HomeScreen;