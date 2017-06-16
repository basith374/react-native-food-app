import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import {Ionicons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 40,
  },
  headerBtn: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
  },
})

class Header extends React.Component {
  render() {
    let {leftItem,rightItem,title} = this.props;
    if(leftItem) {
      leftItem = (
        <TouchableOpacity style={[styles.headerBtn, {alignItems:'flex-start'}]} onPress={leftItem.onPress}>
          {
            leftItem.text
            ? <Text>{leftItem.text}</Text>
            : <Ionicons name={leftItem.icon} size={28} />
          }
        </TouchableOpacity>
      )
    }

    if(rightItem) {
      rightItem = (
        <TouchableOpacity style={[styles.headerBtn, {alignItems:'flex-end'}]} onPress={rightItem.onPress}>
        {
          rightItem.text
          ? <Text>{rightItem.text}</Text>
          : <Ionicons name={rightItem.icon} size={28} />
        }
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.header}>
        <View style={{flex:1}}>
          {leftItem}
        </View>
        <View style={{flex:2,alignItems:'center'}}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{flex:1}}>
          {rightItem}
        </View>
      </View>
    )
  }
}

export default Header;
