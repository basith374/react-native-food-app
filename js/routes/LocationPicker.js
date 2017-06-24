import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import theme from '../config/theme';
import _ from 'lodash';
import axios from 'axios';
import {NavigationActions} from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex:1
  },
  headerCont: {
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 10,
    justifyContent: 'center',
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
    paddingHorizontal: 10,
  },
  searchBtnTxt: {
  },
  pinContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    padding:10,
  },
  btn: {
    backgroundColor: theme.red,
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
  }
});

class LocationPicker extends React.Component {

  state = {
    address: '',
    pickable: false,
    coords: {}
  }

  cancel = () => console.log('foo');

  onRegionChange(e) {
    this.cancel();
    const coords = {
      lat: e.latitude,
      lng: e.longitude,
    };
    this.setState({coords});
    const url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords.lat + ',' + coords.lng;
    axios.get(url, {
      cancelToken: new axios.CancelToken((c) => {
        this.cancel = c;
      })
    })
      .then((rsp) => {
        console.log(rsp.data)
        if(rsp.data.status != 'OK') return;
        var results = rsp.data.results;
        const address = results[0].formatted_address;
        this.setState({address,pickable:true});
      });
  }

  pickLocation() {
    const {address,coords} = this.state;
    const action = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({
          routeName: 'account'
        }),
        NavigationActions.navigate({
          routeName: 'addresses'
        }),
        NavigationActions.navigate({
          routeName: 'addressForm',
          params: {
            location: address,
            coords,
          }
        })
      ]
    })
    this.props.navigation.dispatch(action);
  }

  render() {
    const {pickable} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerCont}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.searchBtn} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-back" size={28} style={{}} />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
              <Ionicons name="ios-search" size={16} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for places"
                value={this.state.address}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <MapView
            initialRegion={{
              latitude: 11.75316,
              longitude: 75.49795,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChangeComplete={this.onRegionChange.bind(this)}
            onRegionChange={() => this.setState({pickable:false})}
            provider={PROVIDER_GOOGLE}
            style={{flex:1}}
          />
          <View style={styles.pinContainer} pointerEvents="none">
            <Ionicons name="ios-pin" size={32} color={theme.red} style={{backgroundColor:'transparent'}} />
          </View>
          {pickable &&
          <View style={styles.btnContainer}>
            <TouchableWithoutFeedback onPress={this.pickLocation.bind(this)}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>PICK THIS LOCATION</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>}
        </View>
      </View>
    )
  }
}

export default LocationPicker;
