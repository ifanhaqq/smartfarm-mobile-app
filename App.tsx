import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HumChartScreen from 'src/screens/HumChartScreen';
import LoginScreen from 'src/screens/LoginScreen';
import MainChartScreen from 'src/screens/MainChartScreen';
import { Icon } from 'react-native-elements';
import IsConnectedScreen from 'src/screens/IsConnectedScreen';
import RainHistoryScreen from 'src/screens/RainHistoryScreen';
import HistoryScreen from 'src/screens/HistoryScreen';

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
        <Tab.Screen name='Rain History' component={RainHistoryScreen} />
        <Tab.Screen name='Login Screen' component={LoginScreen} />
        <Tab.Screen name='History' component={HistoryScreen} options={{
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