import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import{ AuthContext } from '../components/context';

const ProfileScreen = () => {

  const paperTheme = useTheme();

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Icon style={styles.avatar} name="ios-person" size={125} color={'#696969'}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableOpacity style={styles.buttonContainers}>
              <Text 
                onPress={() => {toggleTheme()}}
                style={styles.info}
              >
                Ubah Tema
              </Text> 
            </TouchableOpacity>       
            <TouchableOpacity style={styles.buttonContainer}>
              <Text 
                onPress={() => {signOut()}}
                style={styles.info}
              >
                Keluar
              </Text> 
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#1976d2",
    height:225,
  },
  avatar: {
    width: 125,
    height: 125,
    // borderRadius: 125,
    // borderWidth: 5,
    color: "#FFFFFF",
    marginBottom:0,
    alignSelf:'center',
    position: 'absolute',
    marginTop:75
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:0,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:20,
    color: "#FFFFFF"
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#ff5252",
  },
  buttonContainers: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#757575",
  },
});