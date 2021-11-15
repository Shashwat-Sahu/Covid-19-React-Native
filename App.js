import { StatusBar } from 'expo-status-bar';
import React, { useEffect, Component } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import Navbar from './components/navbar'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Home from './components/home'
import { Container } from 'native-base'
import { createStackNavigator } from '@react-navigation/stack';
import Global from './components/global'
import Footer from './components/footer'
import State from './components/state'
import * as Font from 'expo-font';
import { AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();
export default function App() {


  return (
    <NavigationContainer>
      <Navbar />
      <Tab.Navigator>

        <Tab.Screen name="Home" component={Home} options={
          {
            tabBarIcon: ({ color, size }) =>
              <AntDesign name="home" color={color} size={size} />
          }
        } />
        <Tab.Screen name="Global Stats" component={Global}
          options={
            {
              tabBarIcon: ({ color, size }) =>
                <Feather name="globe" color={color} size={size} />
            }
          }
        />
        <Tab.Screen name="State Wise Stats" component={State}
          options={
            {
              tabBarIcon: ({ color, size }) =>
                <AntDesign name="infocirlceo" color={color} size={size} />
            }
          }
        />

      </Tab.Navigator>
      <Footer />
    </NavigationContainer>
  )

}



