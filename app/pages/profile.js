import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class Profile extends Component {
  render() {
    const { signOut } = React.useContext(AuthContext);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
            profile pages
            <Button title="Sign out" onPress={signOut} />
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});