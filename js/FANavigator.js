import React from 'react';
import {connect} from 'react-redux';
import {View,StatusBar} from 'react-native';
import {TabNavigator} from 'react-navigation';
import RestaurantTab from './tabs/RestaurantTab';
import Orders from './routes/Orders';
import Cart from './routes/Cart';
import Account from './routes/Account';

class FANavigator extends React.Component {

  render() {
    const TabNav = TabNavigator({
      restaurants: {
        screen: RestaurantTab
      },
      cart: {
        screen: Cart
      },
      orders: {
        screen: Orders
      },
      account: {
        screen: Account
      },
    }, {
      tabBarOptions: {
        activeTintColor: '#f44336',
        // inactiveTintColor: '#555',
        // pressColor: '#f44336',
        // indicatorStyle: {
        //   display: 'none'
        // },
        // style: {
        //   borderColor: '#ccc',
        //   borderTopWidth: 1,
        //   backgroundColor: '#fff',
        //   height: 50,
        // },
        labelStyle: {
          fontSize: 12,
        //   marginTop: 0
        },
        // iconStyle: {
        // },
        // showIcon: true,
        // upperCaseLabel: false,
      },
      // swipeEnabled: false,
      // animationEnabled: false,
      // tabBarPosition: 'bottom',
    });
    return <TabNav />;
  }
}

export default connect()(FANavigator);
