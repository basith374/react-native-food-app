import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import images from '../config/images';
import {Ionicons} from '@expo/vector-icons';
import Header from '../components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

class Account extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Account',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons color={tintColor} name="ios-person-outline" size={28} />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingTop:22}}>
          <Header title="Account" />
        </View>
        <View>

        </View>
      </View>
    );
  }
}

export default Account;
