import React, {PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ListView,
  RefreshControl,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import images from '../config/images';
import {Ionicons} from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import HotelItem from '../components/HotelItem';
import FilterModal from '../components/FilterModal';
import Loading from '../components/Loading';
import Relay from 'react-relay/classic';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  headerCont: {
    paddingTop: 22,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    flexGrow: 1,
    height: 28,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    marginHorizontal: 5,
    color: '#555'
  },
  searchInput: {
    flexGrow: 1,
    color: '#555',
    fontSize: 14,
  },
  searchBtn: {
    height: 28,
    justifyContent: 'center',
  },
  searchBtnTxt: {
  },
  content: {

  },
  bannerContainer: {
  },
  swiper: {

  },
  banner: {
    flex: 1,
  },
  bannerImg: {

  },
  slideContainer: {
    // marginBottom: 5,
    paddingVertical: 5,
    backgroundColor: '#efefef',
  },
  slide: {
    width: 160,
    height: 100,
  },
  hotelList: {
    backgroundColor: '#efefef',
  },
  loadingText: {
    marginRight: 5
  },
  loadingFooter: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
})

class Restaurant extends React.Component {

  static navigationOptions = {
  };

  static propTypes = {
    viewer: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const img = require('../images/banner.png');
    const hotels = [
      {name:'Paris',desc:'Multi Cuisine'},
      {name:'Rotana',desc:'Cafe'},
      {name:'Plaza',desc:'Restaurant'},
      {name:'Jubilee',desc:'Multi Cuisine'},
    ]
    this.state = {
      slides: ds.cloneWithRows([img, img, img, img]),
      hotels: ds.cloneWithRows(hotels),
      refreshing: false,
      modalVisible: false,
      // modalVisible: true,
    }
  }

  _onRefresh() {
    this.setState({refreshing:true});
    setTimeout(() => this.setState({refreshing:false}), 1000);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {refreshing} = this.state;
    let content;
    if(refreshing) {
      content = <Loading />;
    } else {
      content = <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }>
        <Swiper style={styles.bannerContainer}
          height={150}
          paginationStyle={{bottom:10}}
          activeDotColor="rgba(255,255,255,.9)"
          dotColor="rgba(255,255,255,.5)"
          autoplay={true}>
          <TouchableWithoutFeedback style={styles.banner} onPress={() => this.props.navigation.navigate('collections')}>
            <Image
              source={require('../images/banner.png')}
              style={styles.bannerImg}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.banner} onPress={() => this.props.navigation.navigate('collections')}>
            <Image
              source={require('../images/banner.png')}
              style={styles.bannerImg}
            />
          </TouchableWithoutFeedback>
        </Swiper>
        <ListView
          style={styles.slideContainer}
          dataSource={this.state.slides}
          horizontal={true}
          contentContainerStyle={{paddingLeft:5}}
          renderRow={(rowData, i) => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('collections')}>
              <View style={{borderRadius:2,overflow:'hidden'}}>
                <Image source={rowData} style={styles.slide} />
              </View>
            </TouchableWithoutFeedback>
          )}
          renderSeparator={() => (
            <View style={{width:5}} />
          )}
        />
        <ListView
          style={styles.hotelList}
          dataSource={this.state.hotels}
          renderSeparator={() => <View style={{height:5,backgroundColor:'#efefef'}} />}
          renderRow={(rowData) => <HotelItem hotel={rowData} onPress={() => this.props.navigation.navigate('restaurantView')} />}
        />
        <View style={styles.loadingFooter}>
          <Text style={styles.loadingText}>Loading</Text>
          <ActivityIndicator type="small" />
        </View>
      </ScrollView>
    }
    return (
      <View style={styles.container}>
        <FilterModal visible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)} />
        <View style={styles.headerCont}>
          <View style={styles.header}>
            <View style={styles.searchContainer}>
              <Ionicons name="ios-search" size={16} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for restaurants, food"
                underlineColorAndroid="transparent"
              />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={() => this.setModalVisible(true)}>
              <Text style={styles.searchBtnTxt}>FILTER</Text>
            </TouchableOpacity>
          </View>
        </View>
        {content}
      </View>
    );
  }
}

// export default Restaurant;
const RestaurantContainer = Relay.createContainer(Restaurant, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        restaurants {
          name
        }
      }
    `
  }
});

class RestaurantsRoute extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
  static routeName = 'RestaurantsRoute';
}

export default () => {
  return (
    <Relay.Renderer
      Container={RestaurantContainer}
      environment={Relay.Store}
      queryConfig={new RestaurantsRoute()}
    />
  )
}
