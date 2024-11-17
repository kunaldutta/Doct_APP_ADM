import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './App/LoginScreen'; // Confirm path to LoginScreen
import BottomTabbar from './App/TabBar/BottomTabbar';
import DoctorFormComponent from './App/TabBar/DoctorFormComponent';
import DoctorInfo from './App/TabBar/DoctorInfo';
import UpdateDoctorInfo from './App/TabBar/UpdateDoctorInfo';
import ClinicDetails from './App/TabBar/ClinicDetails';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
              name="MainApp"
              component={BottomTabbar}
              options={{headerShown: false}}
          />
        <Stack.Screen
              name="DoctorForm"
              component={DoctorFormComponent}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="DoctorInfo"
              component={DoctorInfo}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="UpdateDoctorInfo"
              component={UpdateDoctorInfo}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="ClinicDetails"
              component={ClinicDetails}
              options={{headerShown: false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
