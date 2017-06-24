import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    flex: 1,
  },
  icon: {
    marginBottom: 10,
  },
  textContainer: {
  },
  text: {

  },
});

const EmptyPage = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.icon} />
      <Text>{props.text}</Text>
    </View>
  )
}

EmptyPage.propTypes = {
  image: React.PropTypes.number,
  text: React.PropTypes.string,
}

export default EmptyPage;
