import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from 'src/screens/LoginScreen';
import MainChartScreen from 'src/screens/MainChartScreen';
import { Icon } from 'react-native-elements';
import RainHistoryScreen from 'src/screens/RainHistoryScreen';
import HistoryScreen from 'src/screens/HistoryScreen';
import MonthlyReportScreen from 'src/screens/MonthlyReportScreen';
import SplashScreen from 'src/screens/SplashScreen';
import { AuthService } from 'src/services/AuthService';
import UserContext from 'src/contexts/AuthContext';
import { TokenService } from 'src/services/TokenService';
import ProfileScreen from 'src/screens/ProfileScreen';
import FieldScreen from 'src/screens/FieldScreen';
import FieldDetailScreen from 'src/screens/FieldDetailScreen';
import PredictScreen from 'src/screens/PredictScreen';
import HomeScreen from 'src/screens/HomeScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tokenService: TokenService = new TokenService();

function MonitoringScreens() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName='Field'>
        <Stack.Screen name='Field' component={FieldScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Predict' component={PredictScreen} />
        <Stack.Screen name='History' component={HistoryScreen} />
        <Stack.Screen name='Monthly Report' component={MonthlyReportScreen} options={{headerShown: false}} />
        <Stack.Screen name='Predict Rain' component={PredictScreen} />
        <Stack.Screen name='Charts' component={MainChartScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Field Detail' component={FieldDetailScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    // </NavigationContainer>
  )
}

function LoggedTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Lahan' component={MonitoringScreens} options={{headerShown: false}}/>
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {

  const [user, setUser] = useState();
  const authService: AuthService = new AuthService();
  const [status, setStatus] = useState("loading");

  useEffect(() => {

    async function runEffect() {
      try {
        const token = await tokenService.getToken();
        const user = await authService.loadUser(token);
        setUser(user);
      } catch (error) {
        console.log(error)
      }

      setStatus("idle");
    }

    runEffect();
  }, []);

  if (status === "loading") {
    return <SplashScreen />
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name='Logged'
                component={LoggedTab}
                options={{ headerShown: false }}/>
            </>
          ) : (
            <>
              <Stack.Screen name='Login'
                            component={LoginScreen} />
            </>
          )}
        </Stack.Navigator>

      </NavigationContainer>
    </UserContext.Provider>
  )
}