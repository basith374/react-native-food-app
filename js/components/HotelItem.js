import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff'
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowRadius: 3,
    // shadowOpacity: .3,
    // shadowColor: 'rgba(0,0,0,.5)',
  },
  imageContainer: {
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 80,
  },
  content: {
    flexGrow: 1,
  },
  textContainer: {
    borderColor: '#efefef',
    borderBottomWidth: .5,
    flexGrow: 1
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  subTitle: {
    color: '#999',
    marginBottom: 5,
  },
  footer: {
    paddingTop: 5,
  }
});

class HotelItem extends React.Component {

  render() {
    const edge = this.props.hotel;
    const hotel = edge.node;
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={require('../images/banner.png')} style={styles.image} />
          </View>
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{hotel.name}</Text>
              <Text style={styles.subTitle}>{hotel.cuisine.name}</Text>
            </View>
            <View style={styles.footer}>
              <Text>30 mins.</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default HotelItem;
