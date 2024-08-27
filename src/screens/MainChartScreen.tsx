import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Chart from 'src/components/Chart';
import { LinearGradient } from 'expo-linear-gradient';
import '../../shim';
import SmallWidgetIcon from 'src/components/SmallWidgetIcon';
import CloudHeader from 'src/components/CloudHeader';
import { MQTTService } from 'src/services/MQTTService';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

const MAX_DATA_POINTS = 100;

const MainChartScreen: React.FC = () => {

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [chartData, setChartData] = useState<{ x: Date, y: number }[]>([]);
    const [staticData, setStaticData] = useState<{ temp: Float | null, cloud: Float | null, thermostat: Float | null, eye: Float | null, pressure: Float | null, wind: Float | null, noise: Float | null }>({ temp: 0, cloud: 0, thermostat: 0, eye: 0, pressure: 0, wind: 0, noise: 0 })
    const [paramsData, setParamsData] = useState<{ title: string, params: string }>({ title: "Temperature", params: "temperature" });

    const mqttService = new MQTTService();

    useEffect(() => {
        const broker = 'ws://mqtt.my.id:8083/mqtt';

        // Connect to the HiveMQ public broker using WebSocket

        const onConnect = () => {
            setIsConnected(true);
            mqttService.subscribe('test-polindra/json');
        }

        const onMessage = (topic: string, message: Buffer) => {
            if (isConnected === false) return;

            // Convert message from Buffer to string and parse it as a number
            const stringData = message.toString();
            const jsonData = JSON.parse(stringData);

            console.log(jsonData);

            const changeParams: any = () => {
                switch (paramsData.params) {
                    case "temperature":
                        return jsonData.temperature;
                    case "cloud":
                        return jsonData.cloud;
                    case "eye":
                        return jsonData.eye;
                    case "thermostat":
                        return jsonData.thermostat;
                    case "pressure":
                        return jsonData.pressure;
                    case "wind":
                        return jsonData.wind;
                    case "noise":
                        return jsonData.noise;
                    default:
                        return jsonData.temperature;
                }
            }

            const receivedData = parseFloat(changeParams());

            if (!isNaN(receivedData) && isFinite(receivedData)) {

                // Timestring
                const date = new Date();

                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');

                const timeString = `${hours}:${minutes}:${seconds}`;

                console.log(`Received message on topic ${topic}: ${receivedData} on ${timeString}`);
                try {
                    setChartData(prevData => {
                        const newData = [...prevData, { x: new Date(), y: receivedData }];
                        // Keep only the latest 100 data points to prevent excessive rendering
                        return newData.length > MAX_DATA_POINTS ? newData.slice(newData.length - MAX_DATA_POINTS) : newData;
                    });
                    setStaticData({ temp: jsonData.temperature, cloud: jsonData.cloud, thermostat: jsonData.thermostat, eye: jsonData.eye, pressure: jsonData.pressure, wind: jsonData.wind, noise: jsonData.noise })
                } catch (error) {
                    console.log("Client on stream", error)
                }
                console.log(staticData.temp);
            } else {
                console.log(`Received invalid data on topic ${topic}: ${message.toString()}`);
            }
        }

        mqttService.connect(broker, onConnect, onMessage);

        // Clean up the connection when the component unmounts
        return () => {
            mqttService.disconnect();
        };
    }, [isConnected]);

    return (
        <>
            <LinearGradient colors={['#bfd7eb', '#ffffff']} style={styles.background}>
                <CloudHeader />
                <View style={styles.container}>

                    <View style={styles.childContainerLeft}>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Cloud Chart", params: "cloud" }); setIsConnected(false) }}><SmallWidgetIcon name="cloud" color="#bfd7eb" title={staticData.cloud} /></Pressable>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Thermostat Chart", params: "thermostat" }); setIsConnected(false) }}><SmallWidgetIcon name="thermostat" color="#bfd7eb" title={staticData.thermostat} /></Pressable>
                        </View>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Cloud Chart", params: "cloud" }); setIsConnected(false) }}><SmallWidgetIcon name="cloud" color="#bfd7eb" title={staticData.cloud} /></Pressable>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Thermostat Chart", params: "thermostat" }); setIsConnected(false) }}><SmallWidgetIcon name="thermostat" color="#bfd7eb" title={staticData.thermostat} /></Pressable>
                        </View>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Cloud Chart", params: "cloud" }); setIsConnected(false) }}><SmallWidgetIcon name="cloud" color="#bfd7eb" title={staticData.cloud} /></Pressable>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Thermostat Chart", params: "thermostat" }); setIsConnected(false) }}><SmallWidgetIcon name="thermostat" color="#bfd7eb" title={staticData.thermostat} /></Pressable>
                        </View>
                    </View>
                    <View style={styles.middleWidget}>
                        <Text style={styles.middleWidgetChild}>{staticData.temp}°</Text>
                    </View>
                    <View style={styles.childContainerRight}>
                    <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Cloud Chart", params: "cloud" }); setIsConnected(false) }}><SmallWidgetIcon name="cloud" color="#bfd7eb" title={staticData.cloud} /></Pressable>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Thermostat Chart", params: "thermostat" }); setIsConnected(false) }}><SmallWidgetIcon name="thermostat" color="#bfd7eb" title={staticData.thermostat} /></Pressable>
                        </View>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Cloud Chart", params: "cloud" }); setIsConnected(false) }}><SmallWidgetIcon name="cloud" color="#bfd7eb" title={staticData.cloud} /></Pressable>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Thermostat Chart", params: "thermostat" }); setIsConnected(false) }}><SmallWidgetIcon name="thermostat" color="#bfd7eb" title={staticData.thermostat} /></Pressable>
                        </View>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Cloud Chart", params: "cloud" }); setIsConnected(false) }}><SmallWidgetIcon name="cloud" color="#bfd7eb" title={staticData.cloud} /></Pressable>
                            <Pressable onPress={() => { setChartData([]); setParamsData({ title: "Thermostat Chart", params: "thermostat" }); setIsConnected(false) }}><SmallWidgetIcon name="thermostat" color="#bfd7eb" title={staticData.thermostat} /></Pressable>
                        </View>
                    </View>

                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.titleBottomContainer}>{paramsData.title}</Text>
                    <View>
                        <Chart data={chartData} />
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
        paddingTop: 7,
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
    },

    childChildContainer: {
        flex: 0,
        flexDirection: 'row',
        // borderWidth: 1,
        
    }

});

export default MainChartScreen;