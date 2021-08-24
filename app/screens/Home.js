import React, { useState } from 'react';
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
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY_APPRVL = '@save_db_apprvl';

const PropayMenu2 = props => {
  return (
    <View style={{width: `${100/3}%`, alignItems: 'center'}}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={{height: 58, width: 58, borderWidth: 5, borderColor: '#000b33', borderRadius: 18, justifyContent:'center', alignItems: 'center'}}>
          <Image source={props.image} style={styles.image}/>
        </View>
        <Text style={{fontSize: 11, fontWeight: 'bold', justifyContent:'center', alignSelf: 'center', marginTop: 6}}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({navigation}) => {

  const [stageApprvl, setValstageApprvl] = useState(''); 

  const { colors } = useTheme();

  const theme = useTheme();

  // save data
  const saveData = async (stageApprvl) => {
      try {
          await AsyncStorage.setItem(STORAGE_KEY_APPRVL, stageApprvl)
          setValstageApprvl(stageApprvl);
        //   alert(stageApprvl)
          navigation.navigate('List-Proposal')
      } catch (e) {
          alert('Failed to save the data to the storager')
          return
      }
  }

  const onSelectApprvl = (stageApprvl) => {
      if (!stageApprvl) return
      console.log(stageApprvl)
      saveData(stageApprvl)
      setValstageApprvl(stageApprvl)
  }
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Selamat Datang!</Text>
            <Text style={styles.text_desc}>Periksa dan Hati-hati sebelum melakukan konfirmasi</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>Pencarian Cepat!</Text>
          <Text style={styles.text}>Pilih salah satu tipe approval dibawah.</Text>    
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 18, paddingTop: 25}}>
            {/* <PropayMenu2 name='Belum Approval' image={require('../assets/icon/go-more.png')} onPress={() => onSelectApprvl('0')}/> */}
            <PropayMenu2 name='Approval 1' image={require('../assets/number/num_1.png')} onPress={() => onSelectApprvl('1')}/>
            <PropayMenu2 name='Approval 2' image={require('../assets/number/num_2.png')} onPress={() => onSelectApprvl('2')}/>
            <PropayMenu2 name='Approval 3' image={require('../assets/number/num_3.png')} onPress={() => onSelectApprvl('3')}/>
          </View>
          <View style={{height: 5, marginTop: 50}}></View>
          <Text style={[styles.title, { color: colors.text }]}>Pencarian Dengan Nomor Dokumen!</Text>
          <Text style={styles.text}>Klik tombol untuk melakukan pencarian dengan filter.</Text>   
          <View style={styles.button}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Search')}}>
                <LinearGradient
                    colors={['#1976d2', '#2196f3']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Pencarian</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Notify')}}>
                <LinearGradient
                    colors={['#1976d2', '#2196f3']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Not</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
          </View>   
        </Animatable.View>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#2196f3'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50,
      alignItems: 'center'
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_desc: {
      color: '#fff',
      fontWeight: 'bold',
      marginBottom:5,
      marginTop:5
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  title: {
      color: '#05375a',
      fontSize: 20,
      marginLeft:15,
      fontWeight: 'bold'
  },
  text: {
      color: '#757575',
      marginLeft:15,
      marginBottom:5,
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  image: {
      height: 40, 
      width: 40,
  }
});