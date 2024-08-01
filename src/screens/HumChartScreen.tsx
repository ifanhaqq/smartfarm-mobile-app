import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chart from 'src/components/Chart';
import { MQTTService } from 'src/services/MQTTService';
import '../../shim';

const MAX_DATA_POINTS = 100;

const HumChartScreen: React.FC = () => {

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [data, setData] = useState<{ x: Date, y: number }[]>([]);
  const mqttService = new MQTTService();


  useEffect(() => {
    const broker = 'ws://mqtt.my.id:8083/mqtt';

    // Connect to the HiveMQ public broker using WebSocket

    const onConnect = () => {
      setIsConnected(true);
      mqttService.subscribe('test/json');
    }
    
    const onMessage = (topic: string, message: Buffer) => {
      if (isConnected === false) return;

      // Convert message from Buffer to string and parse it as a number
      const stringData = message.toString();
      const jsonData = JSON.parse(stringData);
      const receivedData = parseFloat(jsonData.hum);
      
      console.log("Message:", jsonData.hum);
      if (!isNaN(receivedData) && isFinite(receivedData)) {

        // Timestring
        const date = new Date();

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const timeString = `${hours}:${minutes}:${seconds}`;

        console.log(`Received message on topic ${topic}: ${receivedData} on ${timeString}`);
        try {
          setData(prevData => {
            const newData = [...prevData, { x: new Date(), y: receivedData }];
            // Keep only the latest 100 data points to prevent excessive rendering
            return newData.length > MAX_DATA_POINTS ? newData.slice(newData.length - MAX_DATA_POINTS) : newData;
          });
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
  }, [isConnected, mqttService]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Humidity Sensor</Text>
      <Chart data={data}></Chart>
      <Text style={styles.data}>{data.length > 0 ? `Latest value: ${data[data.length - 1].y}` : 'No data received yet'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  data: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default HumChartScreen;

