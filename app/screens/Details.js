import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const STORAGE_KEY         = '@save_db';
const STORAGE_KEY_ID      = '@save_db_id';
const moment              = require('moment');

class DetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vals          : new Date(),
      showDatePicker: false,
      search        : '',
      data          : [],
      Spinner       : false 
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
    } catch (error) {
      // Error retrieving data
    } 
  }

  cariNoDok = (kode_dokumen) => {
    // Alert.alert("Alert", "Button pressed "+this.state.idUser);
    // return; 
    // let check = kode_dokumen.length;
    // alert(kode_dokumen); return;

    if ( !kode_dokumen || kode_dokumen.length < 5 ) {
        Alert.alert('Data Kurang Valid!', 'Minimal Masukan 5 Digit Terahir Dokumen Approval.', [
            {text: 'Okay'}
        ]);
        return;
    }
    this.setState({ 
      Spinner: true 
    });

    fetch('http://slcorp.or.id/api/prop/search_aproval.php', {  
        method: 'POST',
        headers: {
            'Accept'        : 'application/json',
            'Content-Type'  : 'application/json',
        },
        body: JSON.stringify({
            database: this.state.valDb,
            kodeuser: this.state.idUser,
            kodedoku: kode_dokumen
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
              data: responseJson.data,
              Spinner: false 
            });
            console.log(responseJson.data);
          
        } else {
            this.setState({ 
              Spinner: false 
            });
            alert(responseJson.message);
            return;
        }
    })
    .catch((error) => {
        //Hide Loader
        console.error(error);
    });
  }

  componentWillUnmount () {
    this.setState({ 
      data: '',
      search: '' 
    });
  }

  
  cariProp = async () => {
    /*
    this.setState({spinner:true})
    const url = 'http://slcorp.or.id/hrdapp/1.php?kode_kry='+kode_kry+'&bulan='+this.state.facilityId+'&tahun='+this.state.selectedyear_id;
    console.log(url)
    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data: responseJson,
                isLoading: false,
                spinner :false
            });
        })
        .catch((error) => {
            console.error(error);
        });
    */
  };

  approveHandle = (id_ap, rp_ap, limit, stage, status, can_apr, otoritas, crosappr, dokumen) => {
    // alert(id_ap+' '+rp_ap+' '+limit+' '+stage+' '+status+' '+can_apr+' '+otoritas+' '+crosappr);
    // return;
    this.setState({
      Spinner: true
    });

    fetch('http://slcorp.or.id/api/prop/advanced_update.php', {  
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
            usrlimit: limit,
            status  : status,
            can_apr : can_apr,
            otoritas: otoritas,
            crosappr: crosappr
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
            // this.props.navigation.goBack();
            this.cariNoDok(dokumen);
            // signIn(responseJson.username);
        } else {
            this.setState({
              Spinner: false
            });
            alert(responseJson.message);
            // this.props.navigation.goBack();
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
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.Spinner}
          onRequestClose={() => {console.log('close modal')}}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={this.state.Spinner} size="large" color="#1f65ff" />
            </View>
          </View>
        </Modal>
        );
    }
    
    // const { vals, } = this.state;
    const showDatePicker = this.state.showDatePicker ?
          <DateTimePicker
            testID  = "dateTimePicker"
            value   = {this.state.vals}
            mode    = "date"
            // is24Hour={true}
            display="default"
            // onChange={(event, value) => {
            //     this.setState({
            //       vals: value,
            //     });
            onChange={(vals)=>this.setState({vals})}
          /> : <View />
          console.log(this.state.vals);
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
            {/* <Picker
                selectedValue={this.state.facilityId}
                style={{ width: '40%' }}
                onValueChange={(itemValue) =>this.setState({ facilityId: itemValue, facilityPicked: true })}
                >
                {this.options.map((facility, i) => {
                    return <Picker.Item key={i} value={facility.value} label={facility.label} />
                })}
            </Picker>
            <Picker
                selectedValue={this.state.selectedyear_id}
                style={{ width: '40%' }}
                onValueChange={(itemValue) => this.setState({ selectedyear_id: itemValue, selectedyear_Picked: true })}
            >
                {arryear.map((tahun,i) => {
                    return <Picker.Item key={i} value={tahun.value} label={tahun.label.toString()} />

                })}
                
            </Picker>
            
          <TouchableOpacity 
            style={{height: 40, width: 300, padding: 4, borderColor: 'gray', borderWidth: 1}} 
            onPress={() => this.setState({showDatePicker: !this.state.showDatePicker})}>
            <Text>{moment(this.state.vals).format('DD/MM/YYYY')}</Text>
          </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={this.cariProp}
            >
              <Icon name='search' style={{ color:'black' }}/>
            </TouchableOpacity> */}
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                ref={'txtPassword'}
                placeholder="Tanggal Awal"
                value={moment(this.state.vals).format('DD/MM/YYYY')}
            />
          </View>
          <View style={styles.inputContainer}>
            <Button onPress={() => this.setState({showDatePicker: !this.state.showDatePicker})} title="Show date picker!" />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={() => this.cariNoDok(this.state.search)}>
            <Image 
              style={[styles.icon, styles.iconBtnSearch]} 
              source={require('../assets/search--v3.png')}
            />
          </TouchableOpacity>
          {showDatePicker}
        </View>  
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
                    <Text style={styles.title}>{item.dokumen} | {item.status}</Text>
                    <Text style={styles.description}>{item.nominal}</Text>
                    <Text style={styles.description}>{item.nama} | {item.dept} | {item.relasi}</Text>
                    <Text style={styles.description}>{item.detail}</Text>
                    <View style={styles.timeContainer}>
                      <Text style={styles.time}>{item.tanggal}</Text>
                    </View>
                  </View>
                </View>
                { item.status == "Approval Selesai" ? null : 
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => this.approveHandle(item.id, item.debet_rp, item.xlimit, item.approvalke, item.status, item.aprovenya, item.otoritas, item.crosaprove, item.dokumen )}>
                        <Icon name="shield-checkmark" size={25} color={'#4caf50'}></Icon>
                        <Text style={styles.socialBarLabel}>Setujui</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                }
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
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:10,
      borderBottomWidth: 1,
      height:45,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      margin:5
  },
  icon:{
    width:30,
    height:30,
  },
  saveButton: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    margin:5,
    width:35,
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius:10,
  },
  saveButtonText: {
    color: 'white',
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
      height:45,
      marginLeft:15,
      alignSelf:'center',
      borderBottomColor: '#FFFFFF',
      flex:1,
      color: '#000000',
      textDecorationColor: '#000000'
  },
  inputIcon:{
    justifyContent: 'center'
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
  modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
  }
});

export default DetailsScreen;