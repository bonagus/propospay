import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ExploreScreen = () => {

  const { colors } = useTheme();

    return (
      <View style={styles.container}>
        <Text style={{color: colors.text}}>Explore Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
