import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import mqtt from 'mqtt';
import Chart from 'src/components/Chart';
import { MQTTService } from 'src/services/MQTTService';
import '../../shim';

const HumChartScreen: React.FC = () => {

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [data, setData] = useState<{ x: Date, y: number }[]>([]);
  const mqttService = new MQTTService();
  
  
  useEffect(() => {
    const broker = 'ws://mqtt.my.id:8083/mqtt';

    // Connect to the HiveMQ public broker using WebSocket
    const client = mqtt.connect(broker);

    const onConnect = () => {
      setIsConnected(true);
      mqttService.subscribe('test/json');
    }

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      
      // Subscribe to the weather/temperature topic
      client.subscribe('test/json', (err) => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    client.on('message', (topic, message) => {
      if (isConnected === false) return;

      // Convert message from Buffer to string and parse it as a number
      // const receivedData = parseFloat(message.toString());
      const stringData = message.toString();
      const jsonData = JSON.parse(stringData);

      // const jsonstringify = JSON.parse
      console.log("Message:", jsonData.hum);
      // if (!isNaN(receivedData) && isFinite(receivedData)) {

      //   // Timestring
      //   const date = new Date();

        
      //   const hours = date.getHours().toString().padStart(2, '0');
      //   const minutes = date.getMinutes().toString().padStart(2, '0');
      //   const seconds = date.getSeconds().toString().padStart(2, '0');
      //   const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
        
      //   const timeString = `${hours}:${minutes}:${seconds}.${milliseconds}`;

      //   console.log(`Received message on topic ${topic}: ${receivedData} on ${timeString}`);
      //   try {
      //     setData(prevData => {
      //       const newData = [...prevData, { x: new Date(), y: receivedData }];
      //       // Keep only the latest 100 data points to prevent excessive rendering
      //       return newData.length > MAX_DATA_POINTS ? newData.slice(newData.length - MAX_DATA_POINTS) : newData;
      //     });
      //   } catch (error) {
      //     console.log("Client on stream", error)
      //   }

      // } else {
      //   console.log(`Received invalid data on topic ${topic}: ${message.toString()}`);
      // }
    });

    client.on('error', (error) => {
      console.log(`Client on error: ${error}`);
      setIsConnected(false);
    });

    client.on('close', () => {
      console.log('Connection closed');
      setIsConnected(false);
    });

    // Clean up the connection when the component unmounts
    return () => {
      
      if (client.connected) {
        try {
          client.end();
        } catch (error) {
          console.log("Client on end", error)
        }

      }
    };
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Humidity Sensor</Text>
      {/* <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
        <VictoryAxis tickFormat={(t) => `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`} />
        <VictoryAxis dependentAxis tickFormat={(t) => `${t}`} domain={[Y_AXIS_MIN, Y_AXIS_MAX]} />
        <VictoryLine
          animate={{ duration: 1000, onLoad: { duration: 1000 } }}
          data={data}
        />
      </VictoryChart> */}
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

