import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chart from 'src/components/Chart';
import { LinearGradient } from 'expo-linear-gradient';
import '../../shim';
import SmallWidgetIcon from 'src/components/SmallWidgetIcon';
import CloudHeader from 'src/components/CloudHeader';


const MainChartScreen: React.FC = () => {

    const [data, setData] = useState<{ x: Date, y: number }[]>([]);

    return (
        <>
            <LinearGradient colors={['#bfd7eb', '#ffffff']} style={styles.background}>
                <CloudHeader />
                <View style={styles.container}>

                    <View style={styles.childContainerLeft}>
                        <SmallWidgetIcon name="cloud" color="#bfd7eb" title="0" />
                        <SmallWidgetIcon name="thermostat" color="#bfd7eb" title="2" />
                        <SmallWidgetIcon name="visibility" color="#bfd7eb" title="0" />
                    </View>
                    <View style={styles.middleWidget}>
                        <Text style={styles.middleWidgetChild}>12°</Text>
                    </View>
                    <View style={styles.childContainerRight}>
                        <SmallWidgetIcon name="arrow-downward" color="#bfd7eb" title="0" />
                        <SmallWidgetIcon name="wind-power" color="#bfd7eb" title="0" />
                        <SmallWidgetIcon name="surround-sound" color="#bfd7eb" title="0" />
                    </View>

                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.titleBottomContainer}>Lorem ipsum</Text>
                    <View>
                        <Chart data={data} />
                    </View>

                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        color: '#ffffff',
        paddingTop: 25
    },
    bottomContainer: {
        backgroundColor: '#ffffff',
        flex: 2.5,
        marginHorizontal: 15,
        borderTopEndRadius: 70,
        borderTopStartRadius: 70,
        paddingTop: 20,
        paddingLeft: 0
    },
    titleBottomContainer: {
        color: '#357fd3',
        textAlign: 'center',
        fontSize: 27,
        fontWeight: 'bold'
    },
    
    childContainerLeft: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'flex-end',

    },

    childContainerRight: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'flex-start',

    },

    middleWidget: {
        marginHorizontal: 10,
    },

    // Big number on middle
    middleWidgetChild: {
        padding: 13,
        fontSize: 100,
        color: '#357fd3',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 7 },
        textShadowRadius: 1,
        marginTop: 40

    },
    
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
    }

});

export default MainChartScreen;