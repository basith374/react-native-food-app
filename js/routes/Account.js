import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import images from '../config/images';
import {Ionicons} from '@expo/vector-icons';
import Header from '../components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  card: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  cardItem: {
    borderColor: '#ccc',
    borderBottomWidth: .6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  cardTextLeading: {
    flexGrow: 1,
  },
  icon: {
    color: '#999'
  },
  headTxt: {

  },
  subTxt: {
    color: '#999',
    fontSize: 12,
  },
  btn: {
    padding: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 2,
  },
  btnTxt: {

  }
});

class Account extends React.Component {

  _openAddresses() {
    this.props.navigation.navigate('addresses');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingTop:22}}>
          <Header title="Account" />
        </View>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={[styles.cardItem, {borderBottomWidth: 0,paddingVertical: 20}]}>
              <View style={{flexGrow:1,flexDirection:'row',alignItems:'center'}}>
                <Ionicons name="ios-person-outline" size={32} style={[styles.icon,{marginRight:10}]} />
                <View style={{flexGrow: 1}}>
                  <Text style={styles.headTxt}>John Doe</Text>
                  <Text style={styles.subTxt}>johndoe@gmail.com</Text>
                  <Text style={styles.subTxt}>9993545454</Text>
                </View>
                <Ionicons name="ios-create-outline" size={32} style={[styles.icon,{marginRight:10}]} />
              </View>
            </View>
          </View>
            <View style={{backgroundColor:'#efefef',height:5}} />
            <ScrollView>
              <View style={styles.card}>
                <View style={{marginBottom: 10}}>
                  <TouchableWithoutFeedback onPress={this._openAddresses.bind(this)}>
                    <View style={[styles.cardItem]}>
                      <Text style={styles.cardTextLeading}>Addresses</Text>
                      <Ionicons name="ios-arrow-forward" size={28} style={styles.icon} />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View style={[styles.cardItem]}>
                      <Text style={styles.cardTextLeading}>Coupons</Text>
                      <Ionicons name="ios-arrow-forward" size={28} style={styles.icon} />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View style={[styles.cardItem]}>
                      <Text style={styles.cardTextLeading}>Offers</Text>
                      <Ionicons name="ios-arrow-forward" size={28} style={styles.icon} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback>
                  <View style={styles.btn}>
                    <Text style={styles.btnTxt}>LOGOUT</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={{alignItems:'center'}}>
                  <Text style={{color:'#999'}}>v0.9</Text>
                </View>
              </View>
            </ScrollView>
        </View>
      </View>
    );
  }
}

export default Account;
