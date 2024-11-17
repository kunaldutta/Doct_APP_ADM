import React from 'react';
import Icon from 'react-native-vector-icons/Feather'; // Assuming you're using Feather icons
import MainScreen from './MainScreen';
import Medicine from './Medicine';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';

const Tab = AnimatedTabBarNavigator();

const BottomTabbar = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          activeBackgroundColor: 'black',
        }}
        appearance={{ tabBarBackground: 'yellow', activeColors: 'black' }}>
        <Tab.Screen
          name="Home"
          component={MainScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="home" // Existing icon name
                size={size ? size : 24}
                color={focused ? color : 'black'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Medicine"
          component={Medicine}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="plus-circle" // Use an existing icon name (or replace it with one that fits)
                size={size ? size : 24}
                color={focused ? color : 'black'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
};

export default BottomTabbar;
