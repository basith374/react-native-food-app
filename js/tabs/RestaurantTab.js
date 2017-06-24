import React from 'react';
import {StackNavigator} from 'react-navigation';
import Restaurants from '../routes/Restaurants';
import Collections from '../routes/Collections';
import RestaurantView from '../routes/RestaurantView';
import {Ionicons} from '@expo/vector-icons';

class RestaurantTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Restaurants',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons color={tintColor} name="ios-cafe-outline" size={28} />
    ),
  };
  render() {
    const Tab = StackNavigator({
      restaurants: {
        screen: Restaurants
      },
      collections: {
        screen: Collections
      },
      restaurantView: {
        screen: RestaurantView
      },
    }, {
      headerMode: 'none',
    });
    return <Tab />;
  }
}

export default RestaurantTab;
