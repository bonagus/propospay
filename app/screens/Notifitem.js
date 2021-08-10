import React, { Component } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import { Colors } from '../components/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Notifitem extends Component { 
  
    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <View style={styles.separator}>
            <TouchableOpacity>
              <View style={styles.card}>
                <View style={styles.cardImage} /*source={{uri:this.props.image}}*/></View>
                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.title}>{this.props.title}</Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>      
        </View>
        <View>
          <Text style={styles.titles}><MaterialIcons name="notifications" color="#bd1c2c" size={22} /> {this.props.title}</Text>
          <Text style={styles.time}>{this.props.time}</Text>
        </View>
      </View>
    );
  }
  
  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    borderRadius: 25,
    backgroundColor:"#bd1c2c",
  },
  separator: {
    marginTop: 1,
  },
  /******** card **************/
  card:{
    margin: 0,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    // backgroundColor: "#DCDCDC",
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
    //overlay efect
    flex: 1,
    height: 200,
    width: null,
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 0,
    paddingVertical: 7.5,
    paddingHorizontal: 0
  },
  cardImage:{
    flex: 1,
    borderRadius: 25,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:22,
    color: "#ffffff",
    marginTop: 10,
    fontWeight:'bold'
  },
  titles:{
    fontSize:20,
    color: "#000",
    marginTop: 10,
    marginLeft: 5,
    fontWeight:'bold'
  },
  time:{
    fontSize:13,
    color: "#000",
    marginTop: 5,
    marginLeft: 10,
    fontWeight:'bold'
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    color: "#ffffff",
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});