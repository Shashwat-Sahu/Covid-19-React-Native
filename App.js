import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/navbar'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Home from './components/home'
import {Container} from 'native-base'
import { createStackNavigator } from '@react-navigation/stack';
import Global from './components/global'
import Footer from './components/footer'
import State from './components/state'

const Stack = createStackNavigator();
export default function App() {
  return (
    <Container>

      <Navbar/>
      <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="Global" component={Global} options={{title: "Global Values"}}/>
        <Stack.Screen name="State" component = {State} options = {{title:"State and UT Values"}}/>
      </Stack.Navigator> 
    </NavigationContainer>
    <Footer/>
    </Container>
  );
}


