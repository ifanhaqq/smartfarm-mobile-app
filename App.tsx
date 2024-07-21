import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import mqtt from 'mqtt';
import './shim';

const App: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    // Connect to the MQTT broker
    const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      // Subscribe to the topic
      client.subscribe('sensor/temperature', (err) => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    client.on('message', (topic, message) => {
      // Convert message from Buffer to string
      const receivedData = message.toString();
      console.log(`Received message: ${receivedData}`);
      setData(receivedData);
    });

    client.on('error', (error) => {
      console.error(`Connection error: ${error}`);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });

    // Clean up the connection when the component unmounts
    return () => {
      client.end();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MQTT Data</Text>
      <Text style={styles.data}>{data || 'No data received yet'}</Text>
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
    marginBottom: 20,
  },
  data: {
    fontSize: 18,
  },
});

export default App;
