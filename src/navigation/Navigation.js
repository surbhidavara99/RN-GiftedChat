import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import SignupScreen from '../screens/home/SignupScreen';
import DashboardScreen from '../screens/dashboard/DahsboardScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;