import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const AuthContext = React.createContext();
export default class SignIn extends Component {
  render() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    return (
      <View>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Sign in" onPress={() => signIn({ username, password })} />
      </View>
    );
  }
}