import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Home';
import DetailsScreen from './Details';
import ExploreScreen from './Explore';
import ProfileScreen from './Profile';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'History',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-menu" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="settings-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Proposal Approval'
        }} />
</HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Search" component={DetailsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="home-sharp" size={25} backgroundColor="#1976d2" onPress={() => navigation.navigate("Home")}></Icon.Button>
        )
        }} />
</DetailsStack.Navigator>
);

const ExploreStackScreen = ({navigation}) => (
<ExploreStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <ExploreStack.Screen name="History" component={ExploreScreen} options={{
        headerLeft: () => (
            <Icon.Button name="home-sharp" size={25} backgroundColor="#1976d2" onPress={() => navigation.navigate("Home")}></Icon.Button>
        )
        }} />
</ExploreStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
<ProfileStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name="Setting" component={ProfileScreen} options={{
        headerLeft: () => (
            <Icon.Button name="home-sharp" size={25} backgroundColor="#1976d2" onPress={() => navigation.navigate("Home")}></Icon.Button>
        )
        }} />
</ProfileStack.Navigator>
);