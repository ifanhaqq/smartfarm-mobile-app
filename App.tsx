// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import mqtt from 'mqtt';
// import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native'
// import './shim';



// const App: React.FC = () => {
//   // const [data, setData] = useState<string | null>(null);
//   const [data, setData] = useState<{ x: number, y: number }[]>([]);
//   const [index, setIndex] = useState<number>(0);

//   useEffect(() => {
//     // Connect to the MQTT broker
//     const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

//     client.on('connect', () => {
//       console.log('Connected to MQTT broker');
//       // Subscribe to the topic
//       client.subscribe('sensor/temperature', (err) => {
//         if (!err) {
//           console.log('Subscribed to topic');
//         }
//       });
//     });

//     client.on('message', (topic, message) => {
//       // Convert message from Buffer to string
//       const receivedData = parseFloat(message.toString());
//       if (!isNaN(receivedData) && isFinite(receivedData)) {
//         console.log(`Received message: ${receivedData}`);
//         setData(prevData => {
//           const newData = [...prevData, { x:index, y:receivedData}];

//           return newData.length > 100 ? newData.slice(newData.length - 100) : newData;
//         });
//         setIndex(prevIndex => prevIndex + 1);
//       } else {
//         console.error(`Received invalid data on topic ${topic}: ${message.toString()}`);
//       }

//     });

//     client.on('error', (error) => {
//       console.error(`Connection error: ${error}`);
//     });

//     client.on('close', () => {
//       console.log('Connection closed');
//     });

//     // Clean up the connection when the component unmounts
//     return () => {
//       client.end();
//     };
//   }, [index]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>MQTT Data</Text>
//       {/* <Text style={styles.data}>{data || 'No data received yet'}</Text> */}
//       <VictoryChart width={350} theme={VictoryTheme.material}>
//         <VictoryLine animate={{ duration: 2000, onLoad: { duration: 1000 } }} data={data} x="quarter" y="earnings" />
//       </VictoryChart>
//       <Text style={styles.data}>{data.length > 0 ? `Latest value: ${data[data.length - 1].y}` : 'No data received yet'}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   data: {
//     fontSize: 18,
//     marginTop: 20,
//   },
//   chart: {
//     marginTop: 20
//   }
// });

// export default App;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import mqtt from 'mqtt';
// import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
// import './shim';

// const App: React.FC = () => {
//   const [data, setData] = useState<{ x: number, y: number }[]>([]);
//   const [index, setIndex] = useState<number>(0);

//   useEffect(() => {
//     // Connect to the HiveMQ public broker using WebSocket
//     const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

//     client.on('connect', () => {
//       console.log('Connected to MQTT broker');
//       // Subscribe to the weather/temperature topic
//       client.subscribe('sensor/humidity', (err) => {
//         if (!err) {
//           console.log('Subscribed to topic');
//         }
//       });
//     });

//     client.on('message', (topic, message) => {
//       try {
//         const receivedData = parseFloat(message.toString());
//         if (!isNaN(receivedData) && isFinite(receivedData)) {
//           console.log(`Received message on topic ${topic}: ${receivedData}`);
//           setData(prevData => {
//             const newData = [...prevData, { x: index, y: receivedData }];
//             // Keep only the latest 100 data points to prevent excessive rendering
//             return newData.length > 100 ? newData.slice(newData.length - 100) : newData;
//           });
//           setIndex(prevIndex => prevIndex + 1);
//         } else {
//           console.error(`Received invalid data on topic ${topic}: ${message.toString()}`);
//         }
//       } catch (error) {
//         console.error(`Error processing message: ${error}`);
//       }
//     });

//     client.on('error', (error) => {
//       console.error(`Connection error: ${error}`);
//     });

//     client.on('close', () => {
//       console.log('Connection closed');
//     });

//     // Clean up the connection when the component unmounts
//     return () => {
//       if (client.connected) {
//         client.end();
//       }
//     };
//   }, [index]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>MQTT Data</Text>
//       <VictoryChart theme={VictoryTheme.material}>
//         <VictoryLine
//           animate={{ duration: 2000, onLoad: { duration: 1000 } }}
//           data={data}
//         />
//       </VictoryChart>
//       <Text style={styles.data}>{data.length > 0 ? `Latest value: ${data[data.length - 1].y}` : 'No data received yet'}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   data: {
//     fontSize: 18,
//     marginTop: 20,
//   },
// });

// export default App;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import mqtt from 'mqtt';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import './shim';

const App: React.FC = () => {
  const [data, setData] = useState<{ x: number, y: number }[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);

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
      if (!isConnected) return;

      // Convert message from Buffer to string and parse it as a number
      const receivedData = parseFloat(message.toString());
      if (!isNaN(receivedData) && isFinite(receivedData)) {
        console.log(`Received message on topic ${topic}: ${receivedData}`);
        setData(prevData => {
          const newData = [...prevData, { x: index, y: receivedData }];
          // Keep only the latest 100 data points to prevent excessive rendering
          return newData.length > 100 ? newData.slice(newData.length - 100) : newData;
        });
        setIndex(prevIndex => prevIndex + 1);
      } else {
        console.error(`Received invalid data on topic ${topic}: ${message.toString()}`);
      }
    });

    client.on('error', (error) => {
      console.error(`Connection error: ${error}`);
      setIsConnected(false);
    });

    client.on('close', () => {
      console.log('Connection closed');
      setIsConnected(false);
    });

    // Clean up the connection when the component unmounts
    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, [index]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MQTT Data</Text>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          animate={{ duration: 2000, onLoad: { duration: 1000 } }}
          data={data}
        />
      </VictoryChart>
      <Text style={styles.data}>{data.length > 0 ? `Latest value: ${data[data.length - 1].y}, Latest index: ${data[data.length - 1].x}` : 'No data received yet'}</Text>
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
    marginTop: 20,
  },
});

export default App;

