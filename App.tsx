/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Message: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: focused ? '#3498db' : '#bdc3c7' }}>
              {route.name}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24, color: focused ? '#3498db' : '#bdc3c7' }}>{getTabIcon(route.name)}</Text>
          ),
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
        <Tab.Screen name='Message' component={MessageScreen} />
        <Tab.Screen name='Settings' component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true, // Add this property
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as keyof RootStackParamList);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={onPress}
          >
            <Text style={{ color: isFocused ? '#3498db' : '#bdc3c7' }}>{getTabIcon(route.name as keyof RootStackParamList)}</Text>
            <Text style={{ color: isFocused ? '#3498db' : '#bdc3c7' }}>{route.name}</Text>
            {isFocused && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


const HomeScreen: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#3498db' }]}>
      <Text style={styles.text}>Home!</Text>
    </View>
  );
};

const ProfileScreen: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#2ecc71' }]}>
      <Text style={styles.text}>Profile!</Text>
    </View>
  );
};

const MessageScreen: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#f39c12' }]}>
      <Text style={styles.text}>Message!</Text>
    </View>
  );
};


const SettingsScreen: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#e74c3c' }]}>
      <Text style={styles.text}>Settings!</Text>
    </View>
  );
};

const getTabIcon = (routeName: keyof RootStackParamList) => {
  switch (routeName) {
    case 'Home':
      return '🏠';
    case 'Profile':
      return '👤';
    case 'Message':
      return '📬'; 
    case 'Settings':
      return '⚙️';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Use relative positioning
  },
  tabIndicator: {
    height: 4,
    width: '100%', // Adjust the width as needed
    backgroundColor: '#3498db',
    position: 'absolute',
    top: 0,
  },
});

export default App;



