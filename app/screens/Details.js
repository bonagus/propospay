import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const DetailsScreen = ({navigation}) => {
  const { colors } = useTheme();
    return (
      
      // <WebView source={{ uri: "http://slcorp.or.id/dcmitra" }} />
      <View style={styles.container}>
        <Text style={{color: colors.text}}>Halaman Pencarian</Text>
        {/* <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("Explore")}
        /> */}
        <Button
            title="Cari"
            onPress={() => {navigation.navigate('List-Proposal')}}
        />
        <Button
            title="Kembali"
            onPress={() => navigation.goBack()}
        />
      </View>
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
