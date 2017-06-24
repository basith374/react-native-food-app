import React from 'react';
import {StackNavigator} from 'react-navigation';
import Addresses from '../routes/Addresses';
import Account from '../routes/Account';
import LocationPicker from '../routes/LocationPicker';
import AddressForm from '../routes/AddressForm';
import {Ionicons} from '@expo/vector-icons';

class AccountTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Account',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons color={tintColor} name="ios-person-outline" size={28} />
    ),
  };

  render() {
    const Tab = StackNavigator({
      account: {
        screen: Account
      },
      addresses: {
        screen: Addresses,
      },
      addressForm: {
        screen: AddressForm
      },
      locationPicker: {
        screen: LocationPicker,
      }
    }, {
      headerMode: 'none',
    });
    return <Tab />;
  }
}

export default AccountTab;
