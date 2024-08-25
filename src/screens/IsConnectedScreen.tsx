import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const IsConnectedScreen: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Unsubscribe to avoid memory leaks
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      {isConnected ? (
        <Text>You are connected to the internet</Text>
      ) : (
        <Text>You are offline</Text>
      )}
    </View>
  );
};

export default IsConnectedScreen;
