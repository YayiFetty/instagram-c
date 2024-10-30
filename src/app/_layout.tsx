import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import AuthProvider, { useAuth } from '../providers/AuthProvider'
export default function RootLayout() {
  
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name ="(auth)" options={{}}/>
      <Stack.Screen name ="(tabs)" options={{}}/>
    </Stack>
    </AuthProvider>
  )
}