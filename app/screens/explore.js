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
  TouchableOpacity
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
// import ApprovalForm from '../components/ApprovalForm';
// import { Header } from '../components/common';

// const ExploreScreen = () => {
export default class ExploreScreen extends Component {
  // const { colors } = useTheme();
  
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, day:'10', month: 'Sep', year: '2021'}, 
        {id:2, day:'02', month: 'Jan', year: '2021'}, 
        {id:3, day:'22', month: 'Aug', year: '2021'}, 
        {id:4, day:'14', month: 'Dec', year: '2021'}, 
        {id:5, day:'05', month: 'Jul', year: '2021'}, 
        {id:6, day:'26', month: 'Oct', year: '2021'}, 
        {id:7, day:'17', month: 'Sep', year: '2021'},
        {id:8, day:'08', month: 'Jan', year: '2021'},
        {id:9, day:'29', month: 'May', year: '2021'},
      ],
    };
  }

  eventClickListener = (viewId) => {
    Alert.alert("alert", "event clicked");
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View style={ styles.container }>
              {/* <Header headerText="Time Approval" />
              <ApprovalForm /> */}
               <FlatList 
                  enableEmptySections={true}
                  style={styles.eventList}
                  data={this.state.data}
                  keyExtractor= {(item) => {
                    return item.id;
                  }}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity onPress={() => this.eventClickListener("row")}>
                        <View style={styles.eventBox}>
                          <View style={styles.eventDate}>
                            <Text  style={styles.eventDay}>{item.day}</Text>
                            <Text  style={styles.eventMonth}>{item.month} - {item.year}</Text>
                          </View>
                          <View style={styles.eventContent}>
                            <Text  style={styles.eventTime}>Status (Y/N) - Nominal</Text>
                            <Text  style={styles.userName}>Nama - Depart</Text>
                            <Text  style={styles.description}>Judul Pengajuan</Text>
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
