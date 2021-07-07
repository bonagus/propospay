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
  FlatList,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class DetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Lorem ipsum dolor",                  time:"2018-08-01 12:15 pm", nominal:"5000000", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean  ligula..."},
        // {id:2, title: "Sit amet, consectetuer",             time:"2018-08-12 12:00 pm", nominal:"5000000", description:"Lorem  dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula..."} ,
        // {id:3, title: "Dipiscing elit. Aenean ",            time:"2017-08-05 12:21 pm", nominal:"5000000", description:"Lorem ipsum dolor sit , consectetuer  elit. Aenean commodo ligula..."}, 
        // {id:4, title: "Commodo ligula eget dolor.",         time:"2015-08-12 12:00 pm", nominal:"5000000", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula..."}, 
        // {id:5, title: "Aenean massa. Cum sociis",           time:"2013-06-12 12:11 pm", nominal:"5000000", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  commodo ligula..."}, 
        // {id:6, title: "Natoque penatibus et magnis",        time:"2018-08-12 12:56 pm", nominal:"5000000", description:"Lorem ipsum  sit amet, consectetuer adipiscing elit. Aenean commodo ligula..."}, 
        // {id:7, title: "Dis parturient montes, nascetur",    time:"2018-08-12 12:33 pm", nominal:"5000000", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula..."}, 
        // {id:8, title: "Ridiculus mus. Donec quam",          time:"2018-06-12 12:44 pm", nominal:"5000000", description:"Lorem ipsum  sit amet, consectetuer adipiscing elit.  commodo ligula..."},
        // {id:9, title: "Felis, ultricies nec, pellentesque", time:"2012-07-12 12:23 pm", nominal:"5000000", description:"Lorem ipsum dolor sit amet, consectetuer  elit. Aenean commodo ligula..."},
      ]
    };
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/search/androidL/100/000000'}}/>
            <TextInput style={styles.inputs}
                ref={'txtPassword'}
                placeholder="Search"
                underlineColorAndroid='transparent'
                onChangeText={(title) => this.setState({title})}/>
          </View>
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
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>Nama - Depart</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.timeContainer}>
                      <Text style={styles.time}>{item.time}</Text>
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
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:1,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      height:45,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    marginLeft:15,
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
  }
});

export default DetailsScreen;