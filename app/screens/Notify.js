import React, {Component} from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import Notifitem from './Notifitem';
import { Colors } from '../components/Colors';

export default class Notify extends Component { 
    
  constructor(props) {
    super(props);
    this.state = {
      menu :[
        {id:1, title: "Lorem ipsum dolor",                  time:"1 days a go",    image:"https://via.placeholder.com/400x200/FFB6C1/000000"},
        {id:2, title: "Sit amet, consectetuer",             time:"2 minutes a go", image:"https://via.placeholder.com/400x200/48D1CC/000000"} ,
        {id:3, title: "Dipiscing elit. Aenean ",            time:"3 hour a go",    image:"https://via.placeholder.com/400x200/AFEEEE/000000"}, 
        {id:4, title: "Commodo ligula eget dolor.",         time:"4 months a go",  image:"https://via.placeholder.com/400x200/FFEFD5/000000"}, 
        {id:5, title: "Aenean massa. Cum sociis",           time:"5 weeks a go",   image:"https://via.placeholder.com/400x200/FFC0CB/000000"}, 
        {id:6, title: "Natoque penatibus et magnis",        time:"6 year a go",    image:"https://via.placeholder.com/400x200/DDA0DD/000000"}, 
        {id:7, title: "Dis parturient montes, nascetur",    time:"7 minutes a go", image:"https://via.placeholder.com/400x200/B0E0E6/000000"}, 
        {id:8, title: "Ridiculus mus. Donec quam",          time:"8 days a go",    image:"https://via.placeholder.com/400x200/87CEEB/000000"},
        {id:9, title: "Felis, ultricies nec, pellentesque", time:"9 minutes a go", image:"https://via.placeholder.com/400x200/4682B4/000000"},
      ]
     }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.head}>
            <Text style={styles.textSign}>NOTIFIKASI</Text>
        </View> 
        <View style={styles.list}>
          { this.renderCards() }
        </View>
      </ScrollView>
    );
  }

  renderCards=()=> {
      const items = [];
      for (var item of this.state.menu) {
          items.push(
              <Notifitem 
                  id    = {item.id}
                  time  = {item.time}
                  title = {item.title}
                  image = {item.image}
              />
          );
      }
      return items;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#d9d9d9',
    // paddingTop:10,
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  head: {
      alignItems: 'center',
      marginTop: 10,
  },
  signIn: {
      width: 375,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row'
  },
  textSign: {
      fontSize: 25,
      color: '#bd1c2c',
      fontWeight: 'bold'
  },
});