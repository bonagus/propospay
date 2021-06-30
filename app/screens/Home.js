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
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PropayMenu2 = props => {
  return (
    <View style={{width: `${100/4}%`, alignItems: 'center'}}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={{height: 58, width: 58, borderWidth: 1, borderColor: 'lightgrey', borderRadius: 18, justifyContent:'center', alignItems: 'center'}}>
          <Image source={props.image}/>
        </View>
        <Text style={{fontSize: 11, fontWeight: 'bold', alignSelf: 'center', marginTop: 6}}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Selamat Datang!</Text>
        </View>          
        <View style={styles.footer}>
          <Text style={[styles.title, { color: colors.text }]}>Pencarian Cepat!</Text>
          <Text style={styles.text}>Pilih salah satu tipe approval dibawah.</Text>    
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 18}}>
            <PropayMenu2 name='Approval 0' image={require('../assets/icon/go-more.png')} onPress={() => {navigation.navigate('List-Proposal')}}/>
            <PropayMenu2 name='Approval 1' image={require('../assets/icon/go-deals.png')} onPress={() => {navigation.navigate('List-Proposal')}}/>
            <PropayMenu2 name='Approval 2' image={require('../assets/icon/promo.png')} onPress={() => {navigation.navigate('List-Proposal')}}/>
            <PropayMenu2 name='Approval 3' image={require('../assets/icon/go-send.png')} onPress={() => {navigation.navigate('List-Proposal')}}/>
          </View>
          <View style={{height: 5, marginTop: 50}}></View>
          <Text style={[styles.title, { color: colors.text }]}>Pencarian Detail!</Text>
          <Text style={styles.text}>Klik tombol untuk melakukan pencarian dengan filter.</Text>   
          <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
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
          </View>
        </View>
        
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
  }
});