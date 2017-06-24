import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    // padding: 10,
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
    // width: 100,
    height: 180,
  },
  content: {
    flexGrow: 1,
    padding: 10,
  },
  textContainer: {
    borderColor: '#efefef',
    borderBottomWidth: 1,
    flexGrow: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerTxt: {
    flexGrow: 1,
  },
  buttons: {
    flexDirection: 'row',
  }
});

class FoodItem extends React.Component {
  render() {
    const {food,recommended} = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          {recommended &&
          <View style={styles.imageContainer}>
            <Image source={require('../images/banner.png')} style={styles.image} />
          </View>}
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{food.name}</Text>
              <Text style={styles.subTitle}>{food.desc}</Text>
            </View>
            <View style={styles.footer}>
              <View style={styles.footerTxt}>
                <Text>30 mins.</Text>
              </View>
              <View style={styles.buttons}>
                <TouchableWithoutFeedback onPress={() => console.log('')}>
                  <EvilIcons name="minus" size={40} color="#555" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => console.log('')}>
                  <EvilIcons name="plus" size={40} color="#555" />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default FoodItem;
