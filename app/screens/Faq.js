import React, { Component } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import { Colors } from '../components/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Faq extends Component { 
  
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
      <ScrollView style={styles.container}>
        <TouchableOpacity ref={this.faq} style={styles.row} onPress={()=>this.toggleExpand()}>
            <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
            <MaterialIcons 
                name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                color="#191919"
                size={30}
            />
        </TouchableOpacity>
        <View style={styles.parentHr}/>
        {
            this.state.expanded &&
            <View style={styles.child}>
                <Text>{this.props.data}</Text>    
            </View>
        }
      </ScrollView>
    );
  }
  
  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#d9d9d9',
  },
  title:{
      fontSize: 14,
      fontWeight:'bold',
      color: Colors.DARKGRAY,
  },
  row:{
      flexDirection: 'row',
      justifyContent:'space-between',
      height:56,
      paddingLeft:25,
      paddingRight:18,
      alignItems:'center',
      backgroundColor: Colors.CGRAY,
  },
  parentHr:{
      height:1,
      color: Colors.WHITE,
      width:'100%'
  },
  child:{
      backgroundColor: Colors.PLAT,
      padding:16,
  }
});