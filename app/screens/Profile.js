import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  BackHandler,  
  FlatList, 
  Modal,
  Button,
  TouchableOpacity,
  Dimensions
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
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Picker from '@react-native-picker/picker';

const STORAGE_KEY       = '@save_db';
const STORAGE_KEYLOG    = '@save_db_login';
// const STORAGE_KEYID     = '@save_db_id';

import{ AuthContext } from '../components/context'; 

const ProfileScreen = () => {

  const [uname, setuname]   = React.useState(''); 
  const [dbname, setdbname] = React.useState(''); 
  const [mdlent, setmdlent] = React.useState(false);
  const [spin, setspin]     = React.useState(false);
  const [ent, setent]       = React.useState('');

  React.useEffect(() => {
      readData()
  }, [])
  
  // read data
  const readData = async () => {
      try {
          const dbname  = await AsyncStorage.getItem(STORAGE_KEY);
          const uname   = await AsyncStorage.getItem(STORAGE_KEYLOG);

          if (dbname !== null) {
              setdbname(dbname);
              setuname(uname);
          }
      } catch (e) {
          alert('Failed to fetch the data from storage')
      }
  }

  // save data
  const setData = async (entyty) => {
      try {
          AsyncStorage.setItem(STORAGE_KEY, entyty);
          console.log(STORAGE_KEY);
      } catch (e) {
          alert('Failed to fetch the data from storage')
      }
  }
  
  const clearStorage = async () => {
      try {
          await AsyncStorage.clear()
          signOut()
      } catch (e) {
          alert('Failed to clear the async storage.')
      }
  }

  const confrim_ent = (entyty) => {
    if ( !entyty || entyty == '0' ) {
        return;
    }
    return Alert.alert(
      "Rubah Entitas?",
      "Apakah Anda Yakin ingin mengubah entitas?",
      [
        // The "Yes" button
        {
          text: "Ya",
          onPress: () => {
            setData(entyty);
            readData();
            setmdlent(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Batal",
          onPress: () => {
            setmdlent(false);
          },
        },
      ]
    );
    // if (!valDb) return
    // console.log(valDb)
    // saveData(valDb)
    // setValDb(valDb)
  }

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
            clearStorage();
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
        <Modal
          animationType = "slide"
          presentationStyle = "overFullScreen" 
          transparent visible = {mdlent}
          onRequestClose={() => {setmdlent(false)}}>
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <View>
                  <Picker
                    selectedValue={ent}
                    style={{ height: 50, width: 250 }}
                    onValueChange={value => {
                        if (value != "0")
                          setent(value)
                        // so it won't care if header is selected...
                    }}>
                    <Picker.Item label="Pilih Entitas" value="0" />
                    <Picker.Item label="Head Office" value="HO" />
                    <Picker.Item label="Industrial Center" value="IC" />
                    <Picker.Item label="Mini Plan Palembang" value="MP" />
                  </Picker>
                  {/* <Text style = {styles.text}>{ent}</Text> */}
              </View>
              {/** This button is responsible to close the modal */}
              <View style={styles.unaprv}>
                <Button 
                  title="Simpan"
                  onPress={() => {confrim_ent(ent)}} />
                <Button 
                  title="Batal" 
                  onPress={() => {setmdlent(false)}} />
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.header}></View>
        <MaterialIcons style={styles.avatar} 
            name="account-circle"
            color="#FFFFFF"
            size={125}
        />
        {/* <Icon style={styles.avatar} name="ios-person" size={125} color={'#FFFFFF'}/> */}
        <View style={styles.subheader}>
          <Text style={styles.name}>Informasi Login:</Text> 
          {/* <Text style={styles.name}>Nama : {uname}</Text>  */}
          {/* <Text style={styles.name}>Entitas : {dbname}</Text>  */}
        </View>
        <View style={styles.profileDetail}>
          <View style={styles.detailContent}>
            <Text style={styles.title}>Userid</Text>
            <Text style={styles.count}>{uname}</Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.title}>Entitas</Text>
            <Text style={styles.count}>{dbname}</Text>
          </View>
        </View>
        
        <View style={styles.body}>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => {setmdlent(true)}}>
                <LinearGradient
                    colors={['#134E5E', '#71B280']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Ganti Entitas </Text>
                    <MaterialIcons 
                        name="double-arrow"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={confirmButton}>
                <LinearGradient
                    colors={['#FF8008', '#FFC837']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Logouts </Text>
                    <MaterialIcons 
                        name="exit-to-app"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={confirmButtoff}>
                <LinearGradient
                    colors={['#EB3349', '#F45C43']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Keluar </Text>
                    <MaterialIcons 
                        name="settings-power"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContent}>
            {/* <TouchableOpacity style={styles.buttonContainers}>
              <Text 
                onPress={() => {toggleTheme()}}
                style={styles.info}
              >
                Ubah Tema
              </Text> 
            </TouchableOpacity>        */}
{/* 
            {/* <TouchableOpacity style={styles.buttonContainer}  onPress={}>
              <Text style={styles.info}> </Text>
              <Icon name="log-out" size={20} color={'#fff'}/> 
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={styles.buttonContainer}  onPress={}>
              <Text style={styles.info}>Keluar </Text> 
              <Icon name="power" size={20} color={'#fff'}/> 
            </TouchableOpacity> */}
          </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

const { width } = Dimensions.get("window");

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
  profileDetail:{
    alignSelf: 'center',
    marginTop:185,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#FFFFFF"
  },
  detailContent:{
    margin:15,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "#219ebc",
    fontWeight: 'bold'
  },
  count:{
    marginTop:5,
    fontSize:20,
    color: "#616b6b",
    fontWeight: 'bold'
  },
  body:{
    marginTop:20,
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
  button: {
      alignItems: 'flex-end',
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  signIn: {
      marginTop:10,
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  viewWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.4) }, 
                  { translateY: -90 }],
      height: 180,
      width: width * 0.8,
      backgroundColor: "#fff",
      borderRadius: 7,
  },
  unaprv:{
    flexDirection: 'row', 
    width: '60%', 
    justifyContent: 'space-between',
  },
  containers: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});