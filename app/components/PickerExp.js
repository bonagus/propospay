import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
class PickerExp extends Component {
   state = {user: ''}
   updateUser = (user) => {
      this.setState({ user: user })
   }
   render() {
      return (
         <View>
            <Picker
               selectedValue={this.state.user}
               style={{ height: 50, width: 250 }}
               onValueChange={value => {
                  if (value != "0")
                     this.updateUser(value)
                  // so it won't care if header is selected...
               }}>
               <Picker.Item label="Pilih Entitas" value="0" />
               <Picker.Item label="Head Office" value="HO" />
               <Picker.Item label="Industrial Center" value="IC" />
               <Picker.Item label="Mini Plan Palembang" value="MP" />
            </Picker>
            <Text style = {styles.text}>{this.state.user}</Text>
         </View>
      )
   }
}
export default PickerExp

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
   }
})