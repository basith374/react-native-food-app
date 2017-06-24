import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ListView,
  FlatList,
  ScrollView,
  Alert
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import theme from '../config/theme';
import Header from '../components/Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {deleteAddress} from '../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex:1
  },
  btn: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
  },
  btnTxt: {
    // color: '#555',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  itemTxtCont: {
    flexGrow: 1,
  },
  txt: {
    color: '#555',
    fontSize: 13,
  },
});

const AddressItem = (props) => {
  const {address,deleting} = props;
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.itemTxtCont}>
          <Text style={[styles.txt, {color: '#000',fontSize:14}]}>{address.type}</Text>
          <Text style={styles.txt}>{address.address}</Text>
          <Text style={styles.txt}>{address.landmark}</Text>
          <Text style={styles.txt}>{address.house}</Text>
        </View>
        <Ionicons
          name={deleting ? 'ios-trash-outline' : 'ios-create-outline'}
          size={32}
          style={{color: deleting ? theme.red : '#999'}}
        />
      </View>
    </TouchableWithoutFeedback>
  )
};

class Addresses extends React.Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state = {
    deleting: false
  }

  openLocationPicker() {
    this.props.navigation.navigate('locationPicker');
  }

  itemAction(index) {
    if(this.state.deleting) {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to remove this address?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => this.props.dispatch(deleteAddress(index))},
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('addressForm', {address:index});
    }
  }

  render() {
    const {addresses,deleting} = this.state;
    return (
      <View style={styles.container}>
        <View style={{paddingTop:22}}>
          <Header title="Manage Addresses"
            leftItem={{
              icon: 'ios-arrow-back',
              onPress: () => this.props.navigation.goBack()
            }}
            rightItem={{
              text: deleting ? 'Done' : 'Delete',
              onPress: () => this.setState({deleting: !deleting})
            }}
          />
        </View>
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={{padding: 10}}
          >
            <FlatList
              style={{marginBottom: 10}}
              removeClippedSubviews={false}
              data={this.props.addresses}
              renderItem={({item, index}) => {
                return <AddressItem
                  address={item}
                  onPress={() => this.itemAction(index)}
                  deleting={deleting} />
              }}
              ItemSeparatorComponent={() => {
                return <View style={{height:1,backgroundColor:'#ccc'}} />
              }}
            />
            <TouchableWithoutFeedback onPress={this.openLocationPicker.bind(this)}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>ADD AN ADDRESS</Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const select = (store) => {
  const {addresses} = store.user;
  return {
    addresses
  }
}

export default connect(select)(Addresses);
