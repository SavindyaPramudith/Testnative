import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginScreen = require('./screens/LoginScreen').default;
const SignUpScreen = require('./screens/SignUpScreen').default;
const { BottomTabNavigator } = require('./navigation/BottomTabNavigator');

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isSignedIn ? (
            <Stack.Group
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="Auth"
                options={{ headerShown: false }}
              >
                {(props: any) => (
                  <LoginScreen
                    {...props}
                    onSignIn={() => setIsSignedIn(true)}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
              />
            </Stack.Group>
          ) : (
            <Stack.Screen 
              name="Home" 
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
