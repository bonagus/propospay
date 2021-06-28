import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const DetailsScreen = ({navigation}) => {
  const { colors } = useTheme();
    return (
      
      <WebView source={{ uri: "http://slcorp.or.id/dcmitra" }} />
      // <View style={styles.container}>
      //   <Text style={{color: colors.text}}>Details Screen</Text>
      //   <Button
      //       title="Go to details screen...again"
      //       onPress={() => navigation.push("Details")}
      //   />
      //   <Button
      //       title="Go to home"
      //       onPress={() => navigation.navigate("Home")}
      //   />
      //   <Button
      //       title="Go back"
      //       onPress={() => navigation.goBack()}
      //   />
      // </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
