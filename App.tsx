import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "src/screens/LoginScreen";
import MainChartScreen from "src/screens/MainChartScreen";
import { Icon } from "react-native-elements";
import RainHistoryScreen from "src/screens/RainHistoryScreen";
import HistoryScreen from "src/screens/HistoryScreen";
import MonthlyReportScreen from "src/screens/MonthlyReportScreen";
import SplashScreen from "src/screens/SplashScreen";
import { AuthService } from "src/services/AuthService";
import UserContext from "src/contexts/AuthContext";
import FieldContext from "src/contexts/FieldContext";
import { TokenService } from "src/services/TokenService";
import ProfileScreen from "src/screens/ProfileScreen";
import FieldScreen from "src/screens/FieldScreen";
import FieldDetailScreen from "src/screens/FieldDetailScreen";
import PredictScreen from "src/screens/PredictScreen";
import HomeScreen from "src/screens/HomeScreen";
import Loading from "src/components/Loading";
import EditProfileScreen from "src/screens/EditProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tokenService: TokenService = new TokenService();

function MonitoringScreens() {
  const [field, setField] = useState();
  return (
    <FieldContext.Provider value={{ field, setField }}>
      <Stack.Navigator initialRouteName="Field">
        <Stack.Screen
          name="Field"
          component={FieldScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Predict" component={PredictScreen} options={{ headerShown: true,  headerTintColor: '#2255B8' ,headerStyle: { backgroundColor: '#DFEDF9' },}} />
        <Stack.Screen name="History" component={HistoryScreen}  options={{ headerShown: true,  headerTintColor: '#2255B8',headerStyle: { backgroundColor: '#DFEDF9' }, }}/>
        <Stack.Screen
          name="Monthly Report"
          component={MonthlyReportScreen}
          options={{ headerShown: true,  headerTintColor: '#2255B8',headerStyle: { backgroundColor: '#DFEDF9' }, }}
        />
        <Stack.Screen name="Predict Rain" component={PredictScreen} options={{ headerShown: true,  headerTintColor: '#2255B8',headerStyle: { backgroundColor: '#DFEDF9' }, }} />
        <Stack.Screen
          name="Charts"
          component={MainChartScreen}
          options={{ headerShown: true,  headerTintColor: '#2255B8',headerStyle: { backgroundColor: '#DFEDF9' }, }}
        />
        <Stack.Screen
          name="Field Detail"
          component={FieldDetailScreen}
          options={{ headerShown: true,  headerTintColor: '#2255B8',headerStyle: { backgroundColor: '#DFEDF9' }, }}
        />
      </Stack.Navigator>
    </FieldContext.Provider>
  );
}

function ProfileScreens() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Edit" component={EditProfileScreen} options={{ headerShown: true,  headerTintColor: '#2255B8',headerStyle: { backgroundColor: '#DFEDF9' }, }}/>
    </Stack.Navigator>
  );
}

function LoggedTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, tabBarIcon: ({ focused }) => (
          <Image style={{ width: 23, height: 25 }} source={
            focused ? require('./src/assets/tab-home-icon-focused.png') : 
            require('./src/assets/tab-home-icon.png')} />
        ) }}
      />
      <Tab.Screen
        name="Lahan"
        component={MonitoringScreens}
        options={{ headerShown: false, tabBarIcon: ({ focused }) => (
          <Image style={{ width: 23, height: 25 }} source={
            focused ? require('./src/assets/tab-field-icon-focused.png') : 
            require('./src/assets/tab-field-icon.png')} />
        ) }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreens}
        options={{ headerShown: false, tabBarIcon: ({ focused }) => (
          <Image style={{ width: 23, height: 25 }} source={
            focused ? require('./src/assets/tab-profile-icon-focused.png') : 
            require('./src/assets/tab-profile-icon.png')} />
        ) }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState();
  const [field, setField] = useState();
  const authService: AuthService = new AuthService();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function runEffect() {
      try {
        const token = await tokenService.getToken();
        const user = await authService.loadUser(token);
        setUser(user);
      } catch (error) {
        console.log(error);
      }

      setStatus("idle");
    }

    runEffect();
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <FieldContext.Provider value={{ field, setField }}>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <>
                <Stack.Screen
                  name="Logged"
                  component={LoggedTab}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </FieldContext.Provider>
    </UserContext.Provider>
  );
}
