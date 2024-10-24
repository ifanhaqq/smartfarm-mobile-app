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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tokenService: TokenService = new TokenService();

function LoggedTab() {
  return (
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
      <Tab.Screen name='Profile' component={ProfileScreen} />
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
      <Tab.Screen name='Monthly Report' component={MonthlyReportScreen} />
      <Tab.Screen name='Field' component={FieldScreen} />
      <Tab.Screen name='FieldDetail' component={FieldDetailScreen} />
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