import React from 'react';
import {
  Modal,
  View,
  TouchableHighlight,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Header from './Header';
import theme from '../config/theme';
import {selectAddress} from '../actions/user';
import images from '../config/images';

const styles = StyleSheet.create({

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    // backgroundColor: '#999',
  },
  itemTxtCont: {
    flexGrow: 1,
    marginRight: 10,
    // backgroundColor: '#555'
  },
  txt: {
    color: '#555',
    fontSize: 13,
  },
});

const AddressItem = (props) => {
  const {address,index,selectedAddress} = props;
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress(index)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemTxtCont}>
          <Text style={[styles.txt, {color: '#000',fontSize:14}]}>{address.type}</Text>
          <Text style={styles.txt}>{address.address}</Text>
          <Text style={styles.txt}>{address.landmark}</Text>
          <Text style={styles.txt}>{address.house}</Text>
        </View>
        <Text style={{color:selectedAddress==index?theme.red:'#555'}}>
          {selectedAddress==index?'Selected':'Select'}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

class AddressModal extends React.Component {

  state = {
    // modalVisible: false
  }

  show() {
  //   this.setState({
  //     modalVisible: true
  //   })
  }

  selectAddress(address) {
    this.props.dispatch(selectAddress(address));
    this.props.showModal(false);
    // this.setState({
    //   modalVisible: false
    // });
  }

  render() {
    const content = this.props.addresses.length ?
    <ScrollView>
      <FlatList
        contentContainerStyle={{
          padding:10,
          // backgroundColor:'#ccc'
        }}
        data={this.props.addresses}
        renderItem={({item,index}) => {
          return (
            <AddressItem
              address={item}
              onPress={this.selectAddress.bind(this)}
              index={index}
              selectedAddress={this.props.selectedAddress}
            />
          )
        }}
        ItemSeparatorComponent={() => {
          return <View style={{height:1,backgroundColor:'#ccc'}} />
        }}
      />
    </ScrollView> :
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image source={images.desert} style={{marginBottom:10}} />
      <Text>Your address book is empty</Text>
    </View>;

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.modalVisible} >
        <View style={{height:20}} />
        <Header title="Select an address" leftItem={{
          text: 'Close',
          onPress: () => this.props.showModal(false)
        }} />
        {content}
      </Modal>
    )
  }

}

const select = (store) => ({
  addresses: store.user.addresses,
  selectedAddress: store.user.selectedAddress
})

export default connect(select)(AddressModal);
