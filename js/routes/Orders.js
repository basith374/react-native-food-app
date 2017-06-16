import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import images from '../config/images';
import {Ionicons} from '@expo/vector-icons';
import Header from '../components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

class Orders extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Orders',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons color={tintColor} name="ios-clock-outline" size={28} />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingTop:22}}>
          <Header title="Orders" />
        </View>
        <View>

        </View>
      </View>
    );
  }
}

export default Orders;
