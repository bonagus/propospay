import React, { Fragment } from 'react';
import { 
          View, 
          Text, 
          Button, 
          StyleSheet, 
          StatusBar,
          ScrollView,
          Image,
          TextInput,
          TouchableOpacity
        } from 'react-native';
import { useTheme } from '@react-navigation/native';


const PropayMenu = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 14}}>
      <Image source={props.image}/>
      <Text style={{fontSize: 13, fontWeight: 'bold', color: 'white', marginTop: 15}}>{props.name}</Text>
    </View>
  );
};

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
