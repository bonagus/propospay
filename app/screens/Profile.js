import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  BackHandler,  
  FlatList,
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

  const { signOut } = React.useContext(AuthContext);
  // const { signOut, toggleTheme } = React.useContext(AuthContext);

  const confirmButton = () =>
    Alert.alert(
      'Logout',
      'Yakin ingin logout dari sesi ini?',
      [
        {
          text: 'Batal',
          onPress: () => {
            return null;
          },
          style: 'cancel'
        },
        { 
          text: 'Ya',
          onPress: () => {
            signOut();
          },
        },
      ]
    );

  const confirmButtoff = () =>
    Alert.alert(
      'Keluar',
      'Yakin ingin keluar dari Aplikasi ini?',
      [
        {
          text: 'Batal',
          onPress: () => {
            return null;
          },
          style: 'cancel'
        },
        { 
          text: 'Ya',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]
    );

  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Icon style={styles.avatar} name="ios-person" size={125} color={'#FFFFFF'}/>
        <View style={styles.subheader}>
          <Text style={styles.name}>Anda Login Sebagai : </Text> 
          <Text style={styles.name}>Nama 1</Text> 
          <Text style={styles.name}>Database 1</Text> 
        </View>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            {/* <TouchableOpacity style={styles.buttonContainers}>
              <Text 
                onPress={() => {toggleTheme()}}
                style={styles.info}
              >
                Ubah Tema
              </Text> 
            </TouchableOpacity>        */}
            <TouchableOpacity style={styles.buttonContainer}  onPress={confirmButton}>
              <Text style={styles.info}>Logout </Text>
              <Icon name="log-out" size={20} color={'#fff'}/> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}  onPress={confirmButtoff}>
              <Text style={styles.info}>Keluar </Text> 
              <Icon name="power" size={20} color={'#fff'}/> 
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#2196f3",
    height:150,
  },
  subheader:{
    backgroundColor: "#2196f3",
    height:90,
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
    marginTop:25
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
    fontSize:20,
    color: "#FFFFFF",
    alignSelf:'center',
    fontWeight: 'bold'
  },
  info:{
    fontSize:20,
    color: "#FFFFFF",
    fontWeight: 'bold'
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