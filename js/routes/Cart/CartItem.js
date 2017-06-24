import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import theme from '../../config/theme';
import settings from '../../config/settings';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 10,
    borderColor: '#ccc',
  },
  head: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  txtBox: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14
  },
  qtyLbl: {
    color: theme.red,
  },
  subTxt: {
    fontSize: 12,
    color: '#555',
  },
  idleTxt: {
    color: '#999',
    fontSize: 12,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foot: {
  },
  btn: {
    color: theme.red,
    fontSize: 12,
  }
});

const CartItem = (props) => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <View style={[styles.content, {borderBottomWidth: props.underLine ? 1 : 0}]}>
        <View style={styles.head}>
          <View style={styles.txtBox}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTxt}>{settings.currency}{item.price}</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={() => console.log('')}>
              <EvilIcons name="minus" size={40} color="#555" />
            </TouchableWithoutFeedback>
            <Text style={styles.qtyLbl}>{item.qty}</Text>
            <TouchableWithoutFeedback onPress={() => console.log('')}>
              <EvilIcons name="plus" size={40} color="#555" />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.foot}>
          <Text lineBreakMode="tail" numberOfLines={1} style={styles.idleTxt}>{item.addons.map(a => a.name).join(', ')}</Text>
          <TouchableOpacity>
            <Text style={styles.btn}>Customise</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CartItem;
