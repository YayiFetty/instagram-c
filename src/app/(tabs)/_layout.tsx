import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@/src/providers/AuthProvider';
export default function TabsLayout() {
  const {isAuthenticated} = useAuth();
  if(!isAuthenticated){
      return <Redirect href="/(auth)"/>
  }
  return (
  <Tabs screenOptions={{tabBarActiveTintColor:"black", }}>
    <Tabs.Screen name="index" options={{
      headerTitle: "For You",
      headerTitleAlign:"center",
      tabBarIcon:({color, size}) => <FontAwesome size={size} name="home" color={color} />
    }}/>
    <Tabs.Screen name="new" options={{
      headerTitle: "Create post",
      tabBarIcon:({color, size}) => <FontAwesome size={size} name="plus-square-o" color={color} />
    }}/>
    <Tabs.Screen name="profile" options={{
      headerTitle: "Profile",
      tabBarIcon:({color, size}) => <FontAwesome size={size} name="user" color={color} />
    }}/>
  </Tabs>
  )
} 