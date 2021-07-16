import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';
// import ApprovalForm from '../components/ApprovalForm';
// import { Header } from '../components/common';

// const ExploreScreen = () => {
const STORAGE_KEY         = '@save_db';
const STORAGE_KEY_ID      = '@save_db_id';
export default class ExploreScreen extends Component {
  // const { colors } = useTheme();
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Spinner: false,
      refreshing: true
    };
  }

  eventClickListener = (viewId) => {
    Alert.alert("alert", "event clicked");
  }
  
  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.wait();
  }

  wait = () => {
    fetch('http://slcorp.or.id/api/prop/fetch_history.php', {  
        method: 'POST',   
        headers: {    
          Accept: 'application/json',    
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          database: this.state.valDb,
          kodeuser: this.state.idUser
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
              refreshing: false 
            });
            console.log(responseJson.data);

        } else {
            // setErrortext(responseJson.result);
            this.setState({ 
              refreshing: false 
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
          refreshing: false 
        });
        console.error('e');
        console.log(this.state.stageApprvl);
        console.error(error);
    });
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

    await fetch('http://slcorp.or.id/api/prop/fetch_history.php', {  
        method: 'POST',   
        headers: {    
          Accept: 'application/json',    
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          database: this.state.valDb,
          kodeuser: this.state.idUser
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
              refreshing: false 
            });
            console.log(responseJson.data);

        } else {
            // setErrortext(responseJson.result);
            this.setState({ 
              refreshing: false 
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
          refreshing: false 
        });
        console.error('e');
        console.log(this.state.stageApprvl);
        console.error(error);
    });
    
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View 
            style={ styles.container }
          >
              {/* <Header headerText="Time Approval" />
              <ApprovalForm /> */}
               <FlatList 
                  enableEmptySections={true}
                  style={styles.eventList}
                  data={this.state.data}
                  keyExtractor= {(item) => {
                    return item.id;
                  }}
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity 
                        //onPress={() => this.eventClickListener("row")}
                      >
                        <View style={styles.eventBox}>
                          <View style={styles.eventDate}>
                            <Text  style={styles.eventDay}>{item.tanggal}</Text>
                            <Text  style={styles.eventMonth}>{item.blnthn}</Text>
                          </View>
                          <View style={styles.eventContent}>
                            <Text  style={styles.eventTime}>{item.status} - {item.nominal}</Text>
                            <Text  style={styles.userName}>{item.nama}</Text>
                            <Text  style={styles.description}>{item.detail}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                />
          </View>
      </Provider>
    );
  };
};

// export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // alignItems: 'center', 
    // justifyContent: 'center'
    backgroundColor: "#DCDCDC"
  },
  eventList:{
    marginTop:20,
  },
  eventBox: {
    padding:10,
    marginTop:5,
    marginBottom:5,
    flexDirection: 'row',
  },
  eventDate:{
    flexDirection: 'column',
  },
  eventDay:{
    fontSize:50,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventMonth:{
    fontSize:16,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventYear:{
    fontSize:14,
    color: "#000",
    fontWeight: "600",
  },
  eventContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
    backgroundColor: '#FFFFFF',
    padding:10,
    borderRadius:10
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  eventTime:{
    fontSize:18,
    color:"#151515",
  },
  userName:{
    fontSize:16,
    color:"#151515",
  },
});
