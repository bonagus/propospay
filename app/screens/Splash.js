import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

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

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

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
            <Text style={styles.text}>Silahkan pilih salah satu departemen dibawah</Text>
            <View style={{marginTop: 25}}>
                <View style={{flexDirection: 'row', backgroundColor: '#1976d2', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                    <PropayMenu name='DC' icon="cart-outline" nav={()=>navigation.navigate('SignInScreen')}/>
                    <PropayMenu name='HO' icon="business-outline" nav={()=>navigation.navigate('SignInScreen')}/>
                    <PropayMenu name='IC' icon="construct-outline" nav={()=>navigation.navigate('SignInScreen')}/>
                    <PropayMenu name='PIZZA' icon="pizza-outline" nav={()=>navigation.navigate('SignInScreen')}/>
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