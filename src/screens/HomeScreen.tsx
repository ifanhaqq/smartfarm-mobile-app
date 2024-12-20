import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground

} from "react-native"; 
import Loading from "src/components/Loading";
import FieldContext from "src/contexts/FieldContext";
import { FieldService } from "src/services/FieldService";

const HomeScreen: React.FC = () => {
    const fieldService: FieldService = new FieldService();
    const fieldContext = useContext(FieldContext);
    const { setField } = fieldContext;
    const [loaded, setLoaded] = useState(false);

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
      
            setField(fields);
          } catch (error) {
            console.log("error fetching fields:", error);
          }
    }

    useEffect(() => {
        async function runEffect() {
            main();

            setLoaded(true);
        }

        runEffect();
    }, []);

    if (!loaded) {
        return <Loading />;
      }

    return (
       
        <ImageBackground
            source={require('../assets/main-bg.png')}
            style={styles.background}
            resizeMode="cover"
        > 
            
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
                    <ScrollView
                        horizontal={true}
                        style={[styles.slide, {padding: 10, overflow: 'visible' ,}]} >
                    <View style={{marginEnd: '10%', flexDirection: 'row'}}>
                            <View style={styles.slideColoumn}>
                                <Image source={require('../assets/home-feature-1.png')} style={styles.slideImg}></Image>
                                <Text style={{ fontSize: 13, fontWeight: '400', padding: '2%', color: '#0F2652', textAlign: 'center' }}>Prediksi masa tanam</Text>
                                <Text style={styles.paragraph}>Prediksi dari data neraca air dari bulan sebelumnya
                                    untuk  gambaran kondisi air tanah selama 1 bulan kedepan
                                </Text>
                            </View>
                            <View style={styles.slideColoumn}>
                                <Image source={require('../assets/home-feature-2.png')} style={styles.slideImg}></Image>
                                <Text style={{ fontSize: 13, fontWeight: '400', padding: '2%', color: '#0F2652', textAlign: 'center' }}>Smart Farming</Text>
                                <Text style={styles.paragraph}>Bertani secara digital untuk mendapatkan informasi
                                    lahan secara update dan berkala
                                </Text>
                            </View>
                            <View style={styles.slideColoumn}>
                                <Image source={require('../assets/home-feature-3.png')} style={styles.slideImg}></Image>
                                <Text style={{ fontSize: 13, fontWeight: '400', padding: '2%', color: '#0F2652', textAlign: 'center' }}>Peta Lahan </Text>
                                <Text style={styles.paragraph}>Dapatkan lokasi lahanmu agar lebih mudah dalam pemantauan lahan secara digital</Text>
                            </View>
                            <View style={styles.slideColoumn}>
                                <Image source={require('../assets/home-feature-4.png')} style={styles.slideImg}></Image>
                                <Text style={{ fontSize: 13, fontWeight: '400', padding: '2%', color: '#0F2652', textAlign: 'center' }}>Neraca air</Text>
                                <Text style={styles.paragraph}>Ketahui waktu terbaik saat menanam, waktu kapan irigasi yang tepat 
                                    dengan neraca air
                                </Text>
                            </View>
                            </View>
                    </ScrollView>
                    <View >
                        <Image source={require('../assets/banner-home-2.png')} style={styles.homeBanner}></Image>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,

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
        margin: '2%',
        flex: 1,
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
        marginStart: '1%', 
        marginBottom: '5%',
        marginRight: '10%',
    },
    slideColoumn: {
        flexDirection: 'column',
        width: 150, 
        backgroundColor: 'white',
        borderRadius: 20,
        marginEnd: '2%',

        
    },
    slideImg: {
        width: 150,
        height: 150,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20, 

    },
    paragraph: { 
        textAlign: 'justify',
        fontSize: 10,
        fontWeight: '300',
        paddingStart: '2%',
        padding: '5%',
        color: '#0F2652',
        overflow: 'scroll',
    },
});

export default HomeScreen;