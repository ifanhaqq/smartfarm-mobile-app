import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Chart from 'src/components/Chart';
import { LinearGradient } from 'expo-linear-gradient';
import '../../shim';
import SmallWidgetIcon from 'src/components/SmallWidgetIcon';
import CloudHeader from 'src/components/CloudHeader';
import { MQTTService } from 'src/services/MQTTService';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import UserContext from 'src/contexts/AuthContext';

const MAX_DATA_POINTS = 100;

const MainChartScreen: React.FC = () => {

    const {user, setUser} = useContext(UserContext);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [chartData, setChartData] = useState<{ x: Date, y: number }[]>([]);
    const [staticData, setStaticData] = useState<{ w1_temp: Float | null, 
                                                   w1_hum: Float | null, 
                                                   w1_noise: Float | null, 
                                                   w1_pm25: Float | null, 
                                                   w1_pm10: Float | null, 
                                                   w1_press: Float | null, 
                                                   w1_luxh: Float | null, 
                                                   w1_luxl: Float | null, 
                                                   w2_wd: Float | null,
                                                   w2_ws_avg: Float | null, 
                                                   w2_rain_d: Float | null,
                                                   w2_rain_h: Float | null,
                                                   w2_ws_max: Float | null}>({ w1_temp: 0, 
                                                                            w1_hum: 0, 
                                                                            w1_noise: 0, 
                                                                            w1_pm25: 0, 
                                                                            w1_pm10: 0,
                                                                            w1_press: 0, 
                                                                            w1_luxh: 0, 
                                                                            w1_luxl: 0, 
                                                                            w2_wd: 0,
                                                                            w2_ws_avg: 0,
                                                                            w2_rain_d: 0,
                                                                            w2_rain_h: 0,
                                                                            w2_ws_max: 0 })
    const [paramsData, setParamsData] = useState<{ title: string, params: string }>({ title: "Temperature", params: "temperature" });
    const [domain, setDomain] = useState<{y_min: number, y_max: number}>({y_min: 10, y_max: 50});

    const mqttService = new MQTTService();

    useEffect(() => {
        const broker = 'ws://mqtt.my.id:8083/mqtt';

        // Connect to the HiveMQ public broker using WebSocket

        const onConnect = () => {
            setIsConnected(true);
            mqttService.subscribe('my-topic/polindra');
        }

        const onMessage = (topic: string, message: Buffer) => {
            if (isConnected === false) return;

            // Convert message from Buffer to string and parse it as a number
            const stringData = message.toString();
            const jsonData = JSON.parse(stringData);

            const changeParams: any = () => {
                switch (paramsData.params) {
                    case "w1_hum":
                        return jsonData.w1_hum;
                    case "w1_noise":
                        return jsonData.w1_noise;
                    case "w1_pm25":
                        return jsonData.w1_pm25;
                    case "w1_pm10":
                        return jsonData.w1_pm10;
                    case "w1_press":
                        return jsonData.w1_press;
                    case "w1_luxh":
                        return jsonData.w1_luxh;
                    case "w1_luxl":
                        return jsonData.w1_luxl;
                    case "w2_wd":
                        return jsonData.w2_wd;
                    case "w2_ws_avg":
                        return jsonData.w2_ws_avg;
                    case "w2_rain_d":
                        return jsonData.w2_rain_d;
                    case "w2_rain_h":
                        return jsonData.w2_rain_h;
                    case "w2_ws_max":
                        return jsonData.w2_ws_max;
                        case "w1_temp":
                        return jsonData.w1_temp;
                    default:
                        return jsonData.w1_temp;
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

                
                try {
                    setChartData(prevData => {
                        const newData = [...prevData, { x: new Date(), y: receivedData }];
                        // Keep only the latest 100 data points to prevent excessive rendering
                        return newData.length > MAX_DATA_POINTS ? newData.slice(newData.length - MAX_DATA_POINTS) : newData;
                    });
                    setStaticData({ w1_temp: jsonData.w1_temp, 
                                    w1_hum: jsonData.w1_hum, 
                                    w1_noise: jsonData.w1_noise, 
                                    w1_pm25: jsonData.w1_pm25, 
                                    w1_pm10: jsonData.w1_pm10, 
                                    w1_press: jsonData.w1_press, 
                                    w1_luxh: jsonData.w1_luxh, 
                                    w1_luxl: jsonData.w1_luxl, 
                                    w2_wd: jsonData.w2_wd, 
                                    w2_ws_avg: jsonData.w2_ws_avg, 
                                    w2_rain_d: jsonData.w2_rain_d, 
                                    w2_rain_h: jsonData.w2_rain_h,
                                    w2_ws_max: jsonData.w2_ws_max
                                    })
                } catch (error) {
                    console.log("Client on stream", error)
                }
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
                <View style={styles.container}>

                    <View style={styles.childContainerLeft}>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Humidity Chart", 
                                                                        params: "w1_hum" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 100})
                                                        }}>
                                                            <SmallWidgetIcon name="sunny" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w1_hum} 
                                                                             title="HUM" />
                            </Pressable>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Noise Chart", 
                                                                        params: "w1_noise" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 30, y_max: 100})
                                                        }}>
                                                            <SmallWidgetIcon name="hearing" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w1_noise} 
                                                                             title="Noise" />
                                </Pressable>
                        </View>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "PM 2.5", 
                                                                        params: "w1_pm25" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 10})
                                                        }}>
                                                            <SmallWidgetIcon name="cloud" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w1_pm25} 
                                                                             title="PM2.5" />
                            </Pressable>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "PM 1.0", 
                                                                        params: "w1_pm10" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 10});
                                                        }}>
                                                            <SmallWidgetIcon name="thermostat" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w1_pm10} 
                                                                             title="PM1.0" />
                            </Pressable>
                        </View>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Pressure Chart", 
                                                                        params: "w1_press" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 30, y_max: 110});
                                                        }}>
                                                            <SmallWidgetIcon name="cloud" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w1_press} 
                                                                             title="Pressure" />
                            </Pressable>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Luminosity H", 
                                                                        params: "w1_luxh" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 100});
                                                        }}>
                                                            <SmallWidgetIcon name="thermostat" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w1_luxh} 
                                                                             title="LUXH" />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.middleWidget}>
                    <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Temperature chart", 
                                                                        params: "w1_temp" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 10, y_max: 50});
                                                        }}>
                                                            <Text style={styles.middleWidgetChild}>{staticData.w1_temp}°</Text>
                    </Pressable>
                    </View>
                    <View style={styles.childContainerRight}>
                    <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Luminosity L", 
                                                                        params: "w1_luxl" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 1000});
                                                        }}>
                                                            <SmallWidgetIcon name="cloud" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w1_luxl} 
                                                                             title="LUXL" />
                            </Pressable>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Wind Direction", 
                                                                        params: "w2_wd" }); 
                                                        setIsConnected(false) }}>
                                                            <SmallWidgetIcon name="wind-power" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w2_wd} 
                                                                             title="WD" />
                            </Pressable>
                        </View>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Average Windspeed", 
                                                                        params: "w2_ws_avg" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 10});
                                                        }}>
                                                            <SmallWidgetIcon name="wind-power" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w2_ws_avg} 
                                                                             title="AVG WS" />
                            </Pressable>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Rain per Day", 
                                                                        params: "w2_rain_d" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 10});
                                                        }}>
                                                            <SmallWidgetIcon name="cloud" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w2_rain_d} 
                                                                             title="Rain/D" />
                            </Pressable>
                        </View>
                        <View style={styles.childChildContainer}>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Rain per Hour", 
                                                                        params: "w2_rain_h" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 10});
                                                        }}>
                                                            <SmallWidgetIcon name="cloud" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w2_rain_h} 
                                                                             title="Rain/H" />
                            </Pressable>
                            <Pressable onPress={() => { setChartData([]); 
                                                        setParamsData({ title: "Maximum Windspeed", 
                                                                        params: "w2_ws_max" }); 
                                                        setIsConnected(false);
                                                        setDomain({y_min: 0, y_max: 10});
                                                        }}>
                                                            <SmallWidgetIcon name="wind-power" 
                                                                             color="#bfd7eb" 
                                                                             value={staticData.w2_ws_max} 
                                                                             title="MAX WS" />
                            </Pressable>
                        </View>
                    </View>

                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.titleBottomContainer}>{paramsData.title}</Text>
                    <View>
                        <Chart data={chartData} y_min={domain.y_min} y_max={domain.y_max}/>
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
        paddingLeft: 0,
        marginBottom: '35%',
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
        fontSize: 40,
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