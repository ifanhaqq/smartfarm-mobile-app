import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import mqtt from 'mqtt';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import './shim';

const MAX_DATA_POINTS = 100;

const App: React.FC = () => {

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [data, setData] = useState<{ x: Date, y: number }[]>([]);

  useEffect(() => {

    // Connect to the HiveMQ public broker using WebSocket
    const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      setIsConnected(true);
      // Subscribe to the weather/temperature topic
      client.subscribe('sensor/humidity', (err) => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    client.on('message', (topic, message) => {
      if (isConnected === false) return;

      // Convert message from Buffer to string and parse it as a number
      const receivedData = parseFloat(message.toString());
      if (!isNaN(receivedData) && isFinite(receivedData)) {

        // Timestring
        const date = new Date();

        
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
        
        const timeString = `${hours}:${minutes}:${seconds}.${milliseconds}`;

        console.log(`Received message on topic ${topic}: ${receivedData} on ${timeString}`);
        try {
          setData(prevData => {
            const newData = [...prevData, { x: new Date(), y: receivedData }];
            // Keep only the latest 100 data points to prevent excessive rendering
            return newData.length > MAX_DATA_POINTS ? newData.slice(newData.length - MAX_DATA_POINTS) : newData;
          });
        } catch (error) {
          console.log(error)
        }

      } else {
        console.log(`Received invalid data on topic ${topic}: ${message.toString()}`);
      }
    });

    client.on('error', (error) => {
      console.log(`Connection error: ${error}`);
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
          console.log(error)
        }

      }
    };
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Humidity Sensorr</Text>
      <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
        <VictoryAxis tickFormat={(t) => `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`} />
        <VictoryAxis dependentAxis tickFormat={(t) => `${t}`} />
        <VictoryLine
          animate={{ duration: 1000, onLoad: { duration: 1000 } }}
          data={data}
        />
      </VictoryChart>
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

export default App;

