import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';
import images from '../config/images';
import {Ionicons} from '@expo/vector-icons';
import Header from '../components/Header';
import Loading from '../components/Loading';
import EmptyPage from '../components/EmptyPage';
import theme from '../config/theme';
import settings from '../config/settings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderItem: {
    padding: 10,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#efefef',
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#efefef',
    paddingBottom: 5,
    flexDirection: 'row',
  },
  body: {
    borderBottomWidth: 1,
    borderColor: '#efefef',
    paddingVertical: 5,
  },
  headTxt: {
    fontSize: 16,
  },
  subTxt: {
    color: '#999',
  },
  footer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 2
  }
});

const OrderItem = (props) => {
  const {order} = props;
  const items = order.items.map((i) => i.name).join(', ');
  return (
    <View style={styles.orderItem}>
      <View style={styles.header}>
        <View style={{flexGrow:1}}>
          <Text style={styles.headTxt}>{order.hotel.name}</Text>
          <Text style={[styles.subTxt, {fontSize: 12}]}>{order.hotel.location}</Text>
        </View>
        <Text style={styles.headTxt}>{settings.currency}{order.total}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subTxt}>{order.time}</Text>
        <Text style={styles.subTxt} lineBreakMode="tail" numberOfLines={1}>{items}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={() => console.log('ok')}>
          <View style={styles.btn}>
            <Text style={{color:'#555'}}>View Details</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('ok')}>
          <View style={[styles.btn, {backgroundColor: theme.red}]}>
            <Text style={{color:'#fff'}}>Repeat Order</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

class Orders extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Orders',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons color={tintColor} name="ios-time-outline" size={28} />
    ),
  };

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  state = {
    loading: false,
    orders: [
      // {
      //   total: 500,
      //   hotel: {
      //     name: 'Pizza PLaza',
      //     location: 'Punnol'
      //   },
      //   time: '22 Dec. 1:30 PM',
      //   items: [
      //     {name: 'Rajput'},
      //     {name: 'Shehzade Kabab'},
      //     {name: 'Manipur Orotti'},
      //     {name: 'Doner Kabab'},
      //   ]
      // }
    ]
  }

  componentDidMount() {
    this.setState({loading:true});
    setTimeout(() => this.setState({loading:false}), 1000);
  }

  render() {
    const {loading,orders} = this.state;
    if(loading) {
      content = <Loading />;
    } else if(orders.length == 0) {
      content = <EmptyPage image={images.donut} text="You have no past orders" />;
    } else {
      content = (
        <View style={styles.content}>
          <ListView
            contentContainerStyle={{paddingTop:5}}
            dataSource={this.ds.cloneWithRows(orders)}
            renderRow={(rowItem, i) => {
              return <OrderItem order={rowItem} key={i} />
            }}
            renderSeparator={() => {
              return <View style={{height:5,color:'#ccc'}} />
            }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{marginTop:22}}>
          <Header title="Orders" />
        </View>
        {content}
      </View>
    );
  }
}

export default Orders;
