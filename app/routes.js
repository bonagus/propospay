import React, { Component } from 'react';
import { Dimensions, Platform, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './pages/home';
import Updates from './pages/updates';
import Signin from './pages/signin';
import Splash from './pages/splash';
import Profile from './pages/profile'

// let screen = Dimensions.get('window');
    const AuthContext = React.createContext();

    const Tab = createMaterialBottomTabNavigator();

    function Root() {
      return (
            <Tab.Navigator
                initialRouteName="HomeStackScreen"
                activeColor="#FFFFFF"
                barStyle={{ backgroundColor: "#2196f3" }}
                >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="Updates"
                    component={Updates}
                    options={{
                    tabBarLabel: 'Updates',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={26} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                    }}
                />
            </Tab.Navigator>
      );
    }

    const HomeStack = createStackNavigator();

    function App() {
        return (        
            <NavigationContainer>
                <HomeStack.Navigator>
                    {state.isLoading ? (
                        // We haven't finished checking for the token yet
                        <HomeStack.Screen name="Splash" component={Splash} />
                    ) : state.userToken == null ? (               
                        <HomeStack.Screen 
                            name="Signin" 
                            component={Signin} 
                            options={{
                                title: 'Sign in',
                                // When logging out, a pop animation feels intuitive
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />     
                    ) : (    
                        <HomeStack.Screen name="Root" component={Root} />
                    )}
                </HomeStack.Navigator>        
            </NavigationContainer>
        );
    }

    function createRootNavigator({ navigation }) {
        const [state, dispatch] = React.useReducer(
            (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
                case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    userToken: action.token,
                };
                case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    userToken: null,
                };
            }
            },
            {
            isLoading: true,
            isSignout: false,
            userToken: null,
            }
        );

        React.useEffect(() => {
            // Fetch the token from storage then navigate to our appropriate place
            const bootstrapAsync = async () => {
            let userToken;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                // userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            };

            bootstrapAsync();
        }, []);

        const authContext = React.useMemo(
            () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            }),
            []
        );

        return (
            <AuthContext.Provider value={authContext}>
                <App />
            </AuthContext.Provider>
        );
    }
 
    export default createRootNavigator();