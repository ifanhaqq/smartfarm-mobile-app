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
                <View >
                    <Text style={[styles.featureText, styles.textStyle]}> Features</Text>
                </View>
                <ScrollView style={styles.slide}>
                    <View style={styles.slideColoumn}>
                        <Image source={require('../assets/field.png')} style={styles.slideImg}></Image>
                        <Text style={{ fontSize: 13, fontWeight: '400', padding: '2%', color: '#0F2652', textAlign: 'center' }}>Prediksi masa tanam</Text>
                        <Text style={styles.paragraph}>Each "row" represents a horizontal section of
                            boxes that can scroll horizontally while.</Text>
                    </View>
                    <View style={styles.slideColoumn}>
                        <Image source={require('../assets/field.png')} style={styles.slideImg}></Image>
                        <Text style={{ fontSize: 13, fontWeight: '400', padding: '2%', color: '#0F2652', textAlign: 'center' }}>Prediksi masa tanam</Text>
                        <Text style={styles.paragraph}>Each "row" represents a horizontal section of
                            boxes that can scroll horizontally while.</Text>
                    </View>

                </ScrollView>

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
    featureText: {
        backgroundColor: 'white',
        color: '#2255B8',
        marginEnd: '70%',
        marginBottom: '5%',
        paddingTop: '2%',
        paddingBottom: '2%',
        marginTop: '2%',
        marginStart: '4%',
        borderRadius: 20,
        fontWeight: 'semibold',
        textAlign: 'center',
    },
    slide: {
        flex: 1,
        flexDirection: 'row',
        marginStart: '5%',
    },
    slideColoumn: {
        flexDirection: 'column',
        width: 150,
        height: 220,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    slideImg: {
        width: 150,
        height: 150,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    paragraph: {
        fontSize: 10,
        fontWeight: '300',
        paddingStart: '2%',
        color: '#0F2652',
        overflow: 'scroll',
    },
});

export default HomeScreen;