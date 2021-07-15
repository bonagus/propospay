import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

const PropayMenu = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 14}}>
      <TouchableOpacity onPress={props.nav}>
        {/* <Image source={props.image}/> */}
        <Icon name={props.icon} size={45} color={'#fff'}></Icon>
        <Text style={{fontSize: 13, fontWeight: 'bold', color: 'white', marginTop: 15, textAlign: 'center',}}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
}; 

const STORAGE_KEY = '@save_db';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [valDb, setValDb] = useState(''); 

    useEffect(() => {
       readData()
    }, [])
    
    // read data
    const readData = async () => {
        try {
            const valDb = await AsyncStorage.getItem(STORAGE_KEY)

            if (valDb !== null) {
                setValDb(valDb);
            }
            alert('Pilih Entitas!');
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    // save data
    const saveData = async (valDb) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, valDb)
            setValDb(valDb);
            navigation.navigate('SignInScreen')
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear()
            alert('Storage successfully cleared!')
        } catch (e) {
            alert('Failed to clear the async storage.')
        }
    }

    const onChangeText = valDb => setValDb(valDb)

    const onSubmitEditing = (valDb) => {
        if (!valDb) return
        console.log(valDb)
        saveData(valDb)
        setValDb(valDb)
    }
    
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#000000' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={require('../assets/Logo.png')}
                style={styles.logo}
                resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Proposal Approval!</Text>
            <Text style={styles.text}>Silahkan pilih salah satu entitas dibawah</Text>
            <View style={{marginTop: 25}}>
                <View style={{flexDirection: 'row', backgroundColor: '#1976d2', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                    {/* <PropayMenu name='DC' icon="pizza-outline" nav={() => onSubmitEditing('DC')}/> */}
                    <PropayMenu name='HO' icon="business-outline" nav={() => onSubmitEditing('HO')}/>
                    <PropayMenu name='IC/DC' icon="construct-outline" nav={() => onSubmitEditing('IC')}/>
                    <PropayMenu name='Mini Plan' icon="cart-outline" nav={() => onSubmitEditing('MP')}/>
                </View>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000000'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
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
  }
});