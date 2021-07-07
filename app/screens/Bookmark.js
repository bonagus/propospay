import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY         = '@save_db';
const STORAGE_KEYID       = '@save_db_id';
const STORAGE_KEY_APPRVL  = '@save_db_apprvl';

export default class BookmarkScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    
    const [valDb, setValDb] = useState(''); 
    const [idUser, setValUser] = useState(''); 
    const [stageApprvl, setValApprvl] = useState(''); 

    useEffect(() => {
        readData()
    }, [])
      
    const readData = async () => {
          try {
              const valDb = await AsyncStorage.getItem(STORAGE_KEY)
              const idUser = await AsyncStorage.getItem(STORAGE_KEYID)
              const stageApprvl = await AsyncStorage.getItem(STORAGE_KEY_APPRVL)
              if(valDb !== null) {
                  setValDb(valDb)
              }
              if(idUser !== null) {
                  setValUser(idUser)
              }
              if(stageApprvl !== null) {
                  setValApprvl(stageApprvl)
              }
          } catch(e) {
              navigation.navigate('Home')
          }
      }
  }

  componentDidMount() {
    fetch('http://slcorp.or.id/api/prop/fetch_aproval.php', {  
        method: 'POST',
        headers: {
            'Accept'        : 'application/json',
            'Content-Type'  : 'application/json',
        },
        body: JSON.stringify({
        
            database: valDb, 
            kodeuser: idUser, 
            approval: stageApprvl
        
        })
    })

    .then((response) => response.json())
    .then((responseJson) => {
        //Hide Loader
        console.log(responseJson);
        // console.log(data.username);
        
        // If server response message same as Data Matched
        if (responseJson.result) {
            this.setState({ data: responseJson.data })
        } else {
            setErrortext(responseJson.result);
            Alert.alert('null.', [
                {text: 'Okay'}
            ]);
            console.log('Username or password is incorrect');
            setSpinner(false);
            return;
        }
    })
    .catch((error) => {
        //Hide Loader
        setSpinner(false);
        console.error(error);
    });
    
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.kode_dokumen;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                {/* <Image style={styles.cardImage} source={{uri:item.image}}/> */}
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.kepada}</Text>
                    <Text style={styles.description}>{item.debet_rp}</Text>
                    <Text style={styles.description}>{item.catatan}</Text>
                    <View style={styles.timeContainer}>
                      <Text style={styles.time}>{item.tgl_dokumen}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => alert('di Setujui!')}>
                        <Icon name="shield-checkmark" size={25} color={'#4caf50'}></Icon>
                        <Text style={styles.socialBarLabel}>Setujui</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => alert('di Tolak!')}>
                        <Icon name="close-circle" size={25} color={'#ff5252'}></Icon>
                        <Text style={styles.socialBarLabel}>Tolak</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor:"#EEEEEE",
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  }, 
  description:{
    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  timeContainer:{
    flexDirection:'row'
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});