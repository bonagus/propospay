import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const STORAGE_KEY         = '@save_db';
const STORAGE_KEY_ID      = '@save_db_id';
const STORAGE_KEY_APPRVL  = '@save_db_apprvl';

export default class BookmarkScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      HeadTable: ['Keterangan', 'Nominal'],
      DataTable: [],
      isVisible: false,
      Spinner: true
    };
  }
  
  async componentDidMount() {
    try {
      const valDb = await AsyncStorage.getItem(STORAGE_KEY);
      if (valDb !== null){
        this.setState({
          valDb: valDb
        });
        // console.log(valDb);
      }
      const idUser = await AsyncStorage.getItem(STORAGE_KEY_ID);
      if (idUser !== null){
        this.setState({
          idUser: idUser
        });
        // console.log(idUser);
      }
      const stageApprvl = await AsyncStorage.getItem(STORAGE_KEY_APPRVL);
      if (stageApprvl !== null){
        this.setState({
          stageApprvl: stageApprvl
        });
        // console.log(stageApprvl);
      }
    } catch (error) {
      // Error retrieving data
    }

    await fetch('http://slcorp.or.id/api/prop/fetch_aproval.php', {  
        method: 'POST',   
        headers: {    
          Accept: 'application/json',    
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
          database: this.state.valDb,
          kodeuser: this.state.idUser,
          approval: this.state.stageApprvl
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Hide Loader
        console.log(this.state.idUser);
        console.log(responseJson);
            console.log(responseJson.result);
        // console.log(data.username);
        // If server response message same as Data Matched
        if (responseJson.result) {
            this.setState({ 
              data: responseJson.data,
              Spinner: false 
            });
            console.log(responseJson.data);

        } else {
            // setErrortext(responseJson.result);
            this.setState({ 
              Spinner: false 
            });
            alert('tidak ditemukan.');
            console.log('null obsku');
            // setSpinner(false);
            return;
        }
    })
    .catch((error) => {
        //Hide Loader
        this.setState({ 
          Spinner: false 
        });
        console.error('e');
        console.log(this.state.stageApprvl);
        console.error(error);
    });
    
  }

  approveHandle = (id_ap, rp_ap, limit, stage) => {
    // alert(id_ap+' '+rp_ap+' '+limit+' '+stage);
    this.setState({ 
      Spinner: true 
    });

    fetch('http://slcorp.or.id/api/prop/update_aproval.php', {  
        method: 'POST',
        headers: {
            'Accept'        : 'application/json',
            'Content-Type'  : 'application/json',
        },
        body: JSON.stringify({
            database: this.state.valDb,
            kodeuser: this.state.idUser,
            tahaprov: stage,
            kd_aprvl: id_ap,
            nominal : rp_ap,
            usrlimit: limit
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Hide Loader
        console.log(responseJson);
        // console.log(data.username);
        
        // If server response message same as Data Matched
        if (responseJson.result) {
            alert(responseJson.message);
            this.props.navigation.goBack();
            // signIn(responseJson.username);
        } else {
            alert(responseJson.message);
            this.props.navigation.goBack();
            return;
        }
    })
    .catch((error) => {
        //Hide Loader
        console.error(error);
    });
  }
  detailList(show, dokumen){

    fetch('http://slcorp.or.id/api/prop/fetch_detail.php', {  
        method: 'POST',
        headers: {
            'Accept'        : 'application/json',
            'Content-Type'  : 'application/json',
        },
        body: JSON.stringify({
            database: this.state.valDb,
            id_dok: dokumen
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Hide Loader
        console.log(responseJson);
        // console.log(data.username);
        
        // If server response message same as Data Matched
        if (responseJson.result) {
            this.setState({ 
              DataTable: responseJson.data,
              isVisible: show
            });
            console.log(responseJson.data);
            // this.setState({isVisible: show});

        } else {
            alert('tidak ditemukan.');
            console.log('null obsku');
            return;
        }
    })
    .catch((error) => {
        //Hide Loader
        console.error(error);
    });
  }

  render() {
    if( this.state.Spinner ) {
        return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#1f65ff" />
        </View>
        );
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType = {"slide"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert('Tekan tutup untuk menutup dialog.');
          }}>
          <ScrollView>
            <Table borderStyle={{borderWidth: 2, borderColor: '#000'}}>
              <Row data={this.state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
              <Rows data={this.state.DataTable} textStyle={styles.TableText}/>
            </Table>

            <Text 
              style={styles.closeText}
              onPress={() => {
                this.setState({ 
                  isVisible: false
                });
              }}>Tutup</Text>
          </ScrollView>
        </Modal>

        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
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
                    <Text style={styles.title}>{item.dokumen} | {item.nama}</Text>
                    <Text style={styles.description}>{item.nominal} | {item.status}</Text>
                    <Text style={styles.description}>{item.relasi} | {item.dept} | </Text>
                    <Text style={styles.description}>{item.detail}</Text>
                    <View style={styles.timeContainer}>
                      <Text style={styles.time}>{item.tanggal}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => this.approveHandle(item.id, item.debet_rp, item.xlimit, item.appke )}>
                        <Icon name="shield-checkmark" size={25} color={'#4caf50'}></Icon>
                        <Text style={styles.socialBarLabel}>Setujui</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => this.detailList(true, item.dokumen)}>
                        <Icon name="list-outline" size={25} color={'#191919'}></Icon>
                        <Text style={styles.socialBarLabel}>Detail</Text>
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
  },
  /********* modal *************/
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 50,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    marginTop: 50,
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#1abc9c'
  },
  TableText: { 
    margin: 10
  }
});