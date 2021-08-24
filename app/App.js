import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import MainTabScreen from './screens/MainTab.js';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStack';

import BookmarkScreen from './screens/Bookmark';
import DetailsScreen from './screens/Details';
import TrialScreen from './screens/Lists';
import NotifyScreen from './screens/Notify';
import SearchScreen from './screens/Search';

import AsyncStorage from '@react-native-community/async-storage';

const ScreenStack = createStackNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
        loginState.isLoading = true;
        console.log(loginState.isLoading);
      // setIsLoading(false);
      // setUserToken('fgkj');
      const userToken = String(foundUser);
      const userName = foundUser;
      // alert(loginState.isLoading)
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
      // isLoading(true);
    },
    signOut: async() => {
        loginState.isLoading = true;
        console.log(loginState.isLoading);
      // setIsLoading(false);
      // setUserToken(null);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#1f65ff" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { loginState.userToken !== null ? 
      (
        <ScreenStack.Navigator
          screenOptions={{    
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}
        >
          <ScreenStack.Screen options={{headerShown: false}} name="Home" component={MainTabScreen} />
          <ScreenStack.Screen name="List-Proposal" component={BookmarkScreen} />
          <ScreenStack.Screen name="Search" component={SearchScreen} />
          <ScreenStack.Screen name="Trial" component={TrialScreen} options={{ title:'Kembali' }}  />
          <ScreenStack.Screen name="Notify" component={NotifyScreen} options={{ title:'Kembali' }}  />
        </ScreenStack.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;