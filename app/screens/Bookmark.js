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
  ScrollView,
  TextInput,
  Button,
  Dimensions
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
      data        : [],
      HeadTable   : ['Keterangan', 'Nominal'],
      DataTables  : [],
      tableData   : [],
      DataTable   : [],
      isVisible   : false,
      isUnApprv   : false,
      Spinner     : true,
      catatan     : '', 
      itemid      : '', 
      itemdebet_rp: '', 
      itemxlimit  : '', 
      itemappke   : ''
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
    
    this.refreshapp( this.state.valDb, this.state.idUser, this.state.stageApprvl );
    
  }

  refreshapp = ( valDb, idUser, stageApprvl ) => {

    fetch('http://slcorp.or.id/api/prop/fetch_aproval.php', {  
        method: 'POST',   
        headers: {    
          Accept: 'application/json',    
          'Content-Type': 'application/json'  
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
        // console.log(this.state.idUser);
        // console.log(responseJson);
            // console.log(responseJson.result);
        // console.log(data.username);
        // If server response message same as Data Matched
        if (responseJson.result) {
            this.setState({ 
              data: responseJson.data,
              Spinner: false 
            });
            console.log(responseJson.data);
            console.log(valDb);

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
        // console.error('e');
        // console.log(this.state.stageApprvl);
        console.error(error);
    });

  }

  confrim_app(id_ap, rp_ap, limit, stage){
    return Alert.alert(
      "Approve Proposal?",
      "Apakah Anda Yakin ingin mengapprove proposal ini?",
      [
        // The "Yes" button
        {
          text: "Ya",
          onPress: () => {
            this.approveHandle(id_ap, rp_ap, limit, stage);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Batal",
        },
      ]
    );
    
  }

  confrim_unapp(catatan){
    if ( !catatan || catatan.length < 1 ) {
        alert('Catatan tidak boleh Kosong!');
        return;
    }
    return Alert.alert(
      "UnApprove Proposal?",
      "Semua Approve pada dokumen proposal ini akan direset?",
      [
        // The "Yes" button
        {
          text: "Ya",
          onPress: () => {
            this.unapprove(this.state.itemid, catatan);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Batal",
        },
      ]
    );
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
            this.setState({ 
              isVisible: false
            });
            this.refreshapp( this.state.valDb, this.state.idUser, this.state.stageApprvl );
            // this.props.navigation.goBack();
            // signIn(responseJson.username);
        } else {
            alert(responseJson.message);
            this.setState({ 
              isVisible: false
            });
            this.refreshapp( this.state.valDb, this.state.idUser, this.state.stageApprvl );
            // this.props.navigation.goBack();
            return;
        }
    })
    .catch((error) => {
        //Hide Loader
        console.error(error);
    });
  }

  unapprove = (itemid, catatan) => {
    // alert(itemid+' '+itemdebet_rp+' '+itemxlimit+' '+itemappke+' '+catatan);
    this.setState({
      Spinner: true
    });

    fetch('http://slcorp.or.id/api/prop/un_approv.php', {
        method: 'POST',
        headers: {
            'Accept'        : 'application/json',
            'Content-Type'  : 'application/json',
        },
        body: JSON.stringify({
            database: this.state.valDb,
            kodeuser: this.state.idUser,
            // tahaprov: itemappke,
            kd_aprvl: itemid,
            // nominal : itemdebet_rp,
            // usrlimit: itemxlimit,
            catatan : catatan
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
            this.setState({ 
              isVisible: false,
              isUnApprv: false
            });
            this.refreshapp( this.state.valDb, this.state.idUser, this.state.stageApprvl );
            // this.props.navigation.goBack();
            // signIn(responseJson.username);
        } else {
            alert(responseJson.message);
            this.setState({ 
              isVisible: false,
              isUnApprv: false
            });
            this.refreshapp( this.state.valDb, this.state.idUser, this.state.stageApprvl );
            // this.props.navigation.goBack();
            return;
        }
    })
    .catch((error) => {
        //Hide Loader
        console.error(error);
    });
  }
  
  detailList(show, dokumen, itemid, itemdebet_rp, itemxlimit, itemappke){

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
            console.log(this.state.DataTable.length%2);
            const tableData = [];
            for (let x = 0; x < 1; x += 1) {
              tableData.push(`${x}`);
            }
            this.setState({ 
              tableData: tableData,
              itemid      : itemid, 
              itemdebet_rp: itemdebet_rp, 
              itemxlimit  : itemxlimit, 
              itemappke   : itemappke
            });
            // console.log(tableData);
            // console.log(this.state.tableData);
            // this.setState({isVisible: show});

        } else {
            alert('tidak ditemukan.');
            console.log('null obsku');
            return;
        }
    })
    .catch((error) => {
        //Hide Loader
        // console.log(dokumen+' '+this.state.valDb);
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
        {/* Modal Detail */}
        <Modal
          animationType = {"slide"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert('Tekan tutup untuk menutup dialog.');
          }}>
          <ScrollView>
          <View style={styles.separator}/>
            <View style={styles.card}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#e6e6e6'}}>
              <Row 
                data={this.state.HeadTable} 
                style={styles.HeadStyle} 
                textStyle={styles.TableTexts}/>
                {
                  this.state.tableData.map((i) => (
                    <Rows 
                      key={i} 
                      data={this.state.DataTable} 
                      // widthArr={this.state.HeadTable}
                      style={[styles.row, i%2 && {backgroundColor: '#DFF5F2'}]} 
                      textStyle={styles.TableText}/>
                  )) 
                }
                {/* <Rows                     
                // key={index}
                data={this.state.DataTable}                       
                style={[styles.row, this.state.DataTable.length%2 && {backgroundColor: '#DFF5F2'}]}
                textStyle={styles.TableText}/> */}
            </Table>
            {/* <Text 
              style={styles.closeText}
              onPress={() => {
                this.setState({
                  isVisible: false
                });
              }}>Tutup</Text> */}
              </View>
              <View style={styles.separator}/>
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity 
                        style={styles.socialBarButton} 
                        onPress={() => 
                          this.confrim_app(
                            this.state.itemid,
                            this.state.itemdebet_rp,
                            this.state.itemxlimit,
                            this.state.itemappke
                          )}>
                        <Icon name="shield-checkmark" size={25} color={'#4caf50'}></Icon>
                        <Text style={styles.socialBarLabel}>Approve</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity 
                        style={styles.socialBarButton} 
                        onPress={() => {
                            this.setState({ 
                              isVisible: false
                            });
                          }
                        }>
                        <Icon name="close-circle" size={25} color={'#191919'}></Icon>
                        <Text style={styles.socialBarLabel}>Tutup</Text>
                      </TouchableOpacity>
                    </View>
                    { this.state.stageApprvl == 1 ? null : 
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity 
                        style={styles.socialBarButton} 
                        onPress={() => {
                            this.setState({ 
                              isUnApprv: true
                            });
                          }
                        }>
                        <Icon name="backspace" size={25} color={'#bd1c2c'}></Icon>
                        <Text style={styles.socialBarLabel}>UnApprove</Text>
                      </TouchableOpacity>
                    </View>
                    }
                  </View>
                </View>
          </ScrollView>
        </Modal>
        {/* Modal Catatan */}
        <Modal  animationType="slide" 
                transparent visible={this.state.isUnApprv} 
                presentationStyle="overFullScreen" 
                onDismiss={() => {
                  Alert.alert('Tekan tutup untuk menutup dialog.');
                }}>
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
            <TextInput 
                style={styles.textInput} 
                placeholder="Alasan Ketidaksetujuan."
                // onSubmitEditing={()=> this.password.focus()}
                onChangeText={catatan => this.setState({catatan})}
                />

              {/** This button is responsible to close the modal */}
              <View style={styles.unaprv}>
                <Button 
                  title="Simpan" 
                  onPress={() =>  this.confrim_unapp(this.state.catatan) } /> 
                <Button 
                  title="Batal" 
                  onPress={() => {
                      this.setState({ 
                        isUnApprv: false
                      });
                    }
                  } />
              </View>
            </View>
          </View>
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
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => this.confrim_app(item.id, item.debet_rp, item.xlimit, item.appke )}>
                        <Icon name="shield-checkmark" size={25} color={'#4caf50'}></Icon>
                        <Text style={styles.socialBarLabel}>Approve</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => this.detailList(true, item.dokumen, item.id, item.debet_rp, item.xlimit, item.appke )}>
                        <Icon name="list-outline" size={25} color={'#191919'}></Icon>
                        <Text style={styles.socialBarLabel}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                    { this.state.stageApprvl == 1 ? null : 
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity
                        style={styles.socialBarButton} 
                        onPress={() => {
                            this.setState({ 
                              isUnApprv   : true,
                              itemid      : item.id
                            });
                          }
                        }>
                        <Icon name="backspace" size={25} color={'#bd1c2c'}></Icon>
                        <Text style={styles.socialBarLabel}>UnApprove</Text>
                      </TouchableOpacity>
                    </View>
                    }
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>
    );
  }
}

const { width } = Dimensions.get("window");

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
    marginLeft: 10,
    alignSelf: 'flex-end',
    // justifyContent: 'center',
    fontWeight: 'bold'
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
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
    backgroundColor: '#fff'
  },
  TableTexts: { 
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  TableText: { 
    textAlign: 'center',
    margin: 10
  },
  row:{
    backgroundColor: '#fff'
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
  textInput: {
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginBottom: 8,
  },
  unaprv:{
    flexDirection: 'row', 
    width: '60%', 
    justifyContent: 'space-between',
  }
});