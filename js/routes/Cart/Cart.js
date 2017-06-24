import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ListView,
  ScrollView,
} from 'react-native';
import images from '../../config/images';
import {Ionicons} from '@expo/vector-icons';
import Header from '../../components/Header';
import CartItem from './CartItem';
import theme from '../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import FooterItem from './FooterItem';
import settings from '../../config/settings';
import Loading from '../../components/Loading';
import AddressModal from '../../components/AddressModal';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#efefef',
    flex: 1,
  },
  headContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  head: {
    flexDirection: 'row',
    padding: 10,
  },
  headTxt: {

  },
  addressIcon: {
    marginRight: 10,
  },
  addressTitle: {
    fontSize: 14,
  },
  addressTxt: {
    fontSize: 12,
    color: '#999',
  },
  foot: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  btnContainer: {
    padding: 10,
    borderWidth: 0,
    bottom: 0,
    position: 'absolute',
    // backgroundColor: 'rgba(255,255,255,.4)',
    right: 0,
    left: 0,
  },
  btn: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignItems: 'center',
  },
  btnTxt: {
    color: '#999',
  },
});

class Cart extends React.Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  static navigationOptions = {
    tabBarLabel: 'Cart',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons color={tintColor} name="ios-filing-outline" size={28} />
    ),
  };

  state = {
    loading: false,
    items: [
      {
        name: 'Tuna Sub"(15 cm)',
        price: 180,
        qty: 1,
        veg: false,
        addons: [
          {name: 'Honey Oat Bread'},
        ]
      },
    ],
    modalVisible: false,
  }

  componentDidMount() {
    this.setState({loading:true});
    setTimeout(() => this.setState({loading:false}), 1000);
  }

  getIcon(type) {
    switch(type) {
      case 'Work':
        return 'ios-briefcase-outline';
      case 'Home':
        return 'ios-home-outline';
      default:
        return 'ios-pin-outline';
    }
  }

  showModal(modalVisible) {
    this.setState({modalVisible});
  }

  renderSelectedAddress(address) {
    const content = address ?
      <View style={styles.headTxt}>
        <Text style={styles.addressTitle}>{address.type}</Text>
        <Text lineBreakMode="tail" numberOfLines={1} style={styles.addressTxt}>{address.house + ', ' + address.address}</Text>
      </View> :
      <Text>Select an address</Text>;
    return (
      <View style={styles.head}>
        <Ionicons
          name={this.getIcon(address ? address.type : null)}
          color={theme.red}
          size={24}
          style={styles.addressIcon}
        />
        {content}
      </View>
    );
  }

  render() {
    const {items,loading} = this.state;
    const {selectedAddress,addresses} = this.props;
    let content;
    if(loading) {
      content = <Loading />;
    } else {
      const address = addresses[selectedAddress];
      content = (
        <View style={styles.content}>
          <View style={styles.headContainer}>
            <TouchableWithoutFeedback onPress={() => this.showModal(true)}>
              {this.renderSelectedAddress(address)}
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            contentContainerStyle={{paddingTop:10,paddingBottom: 10}}>
            <ListView
              style={{marginBottom: 10}}
              removeClippedSubviews={false}
              dataSource={this.ds.cloneWithRows(items)}
              renderRow={(rowData, s, i) => {
                return <CartItem item={rowData} underLine={i!=items.length-1} />
              }}
            />
            <View style={styles.foot}>
              <FooterItem color="#999" leading="Delivery Charges" ending={settings.currency + 0} />
              <FooterItem leading="Grand Total" ending={settings.currency + 315} noBorder />
            </View>
          </ScrollView>
          <View style={{height:57,backgroundColor:'#fff'}} />
          <View style={styles.btnContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>PROCEED TO PAY</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{paddingTop:22}}>
          <Header title="Cart" />
        </View>
        {content}
        <AddressModal
          showModal={this.showModal.bind(this)}
          modalVisible={this.state.modalVisible}
          selectedAddress={this.state.selectedAddress}
        />
      </View>
    );
  }
}

const select = (store) => ({
  addresses: store.user.addresses,
  selectedAddress: store.user.selectedAddress,
})
export default connect(select)(Cart);
