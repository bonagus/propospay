import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import ApprovalForm from '../components/ApprovalForm';
import { Header } from '../components/common';

const ExploreScreen = () => {

  const { colors } = useTheme();

    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View style={ {flex : 1} }>
              {/* <Header headerText="Time Approval" />
              <ApprovalForm /> */}
          </View>

      </Provider>
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
