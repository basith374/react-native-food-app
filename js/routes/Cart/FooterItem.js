import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ccc',
  },
});

const FooterItem = (props) => {
  let leadingStyle, endingStyle;
  let {leading,ending,color,noBorder} = props;
  if(color) {
    leadingStyle = endingStyle = {color};
  }
  if(typeof leading == 'object') {
    leadingStyle = leading.color;
    leading = leading.text;
  }
  if(typeof end == 'object') {
    endingStyle = ending.color;
    ending = ending.text;
  }
  return (
    <View style={[styles.container, {borderBottomWidth: noBorder ? 0 : 1}]}>
      <Text style={[leadingStyle, {flexGrow: 1}]}>{leading}</Text>
      <Text style={endingStyle}>{ending}</Text>
    </View>
  )
}

export default FooterItem;
