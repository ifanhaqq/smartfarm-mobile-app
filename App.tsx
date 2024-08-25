import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HumChartScreen from 'src/screens/HumChartScreen';
import HomeScreen from 'src/screens/HomeScreen';
import MainChartScreen from 'src/screens/MainChartScreen';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Charts" component={MainChartScreen} options={{
          'headerStyle': {
            backgroundColor: "#eff7fc",
            height: 50
          },
          'tabBarIcon': () => {
            return <Icon name="show-chart"
              color="grey"
              size={30}></Icon>
          }
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}