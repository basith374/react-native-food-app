import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import {saveAddress,editAddress} from '../actions/user';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 20,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  txt: {
    marginBottom: 5,
  },
  txtInput: {
    marginBottom: 10,
    height: 34,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#efefef',
    borderRadius: 2,
  },
});

class AddressForm extends React.Component {
  static defaultProps = {
    title: 'Add new address',
  }

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    const {title} = props;
    const state = {title};
    let address = landmark = house = coords = '';
    if(params && params.address) {
      const _address = this.props.addresses[params.address];
      ({address,landmark,house} = _address);
    }
    if(params && params.location) {
      address = params.location;
      coords = params.coords
    }
    this.state = {
      title: 'Add new address',
      address,
      landmark,
      house,
      coords
    }
  }

  saveAddress() {
    const {address,landmark,house} = this.state;
    const {params} = this.props.navigation.state;
    if(params && params.address) {
      this.props.dispatch(editAddress(params.address, {
        address,
        landmark,
        house
      }));
    } else {
      this.props.dispatch(saveAddress(address,landmark,house,coords));
    }
    this.props.navigation.goBack();
  }

  render() {
    const {title,address,landmark,house} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header title={title} leftItem={{
            icon: 'ios-arrow-back',
            onPress: () => this.props.navigation.goBack()
          }}
          rightItem={{
            text: 'Save',
            onPress: this.saveAddress.bind(this)
          }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.txt}>Address</Text>
          <TextInput style={styles.txtInput} value={address} onChangeText={(address) => this.setState({address})} />
          <Text style={styles.txt}>Landmark</Text>
          <TextInput style={styles.txtInput} value={landmark} onChangeText={(landmark) => this.setState({landmark})} />
          <Text style={styles.txt}>House name / Apt no</Text>
          <TextInput style={styles.txtInput} value={house} onChangeText={(house) => this.setState({house})} />
        </View>
      </View>
    )
  }
}

const select = (props) => {
  return {
    addresses: props.user.addresses
  }
}

export default connect(select)(AddressForm);
