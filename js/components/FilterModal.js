import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Switch,
  ListView,
} from 'react-native';
import theme from '../config/theme';
import {Ionicons} from '@expo/vector-icons';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flex: 1,
    backgroundColor: '#efefef',
  },
  content: {
    flexGrow: 1,
  },
  btn: {
    padding: 10,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff'
  },
  box: {

  },
  boxTitle: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  boxTitleTxt: {
    color: '#555',
    fontSize: 10,
  },
  boxContent: {
    backgroundColor: '#fff',
  },
  boxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  boxTxt: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  boxItemTxt: {
  },
  boxItemSubTxt: {
    marginTop: 5,
    color: '#999'
  }
});

class CuisineItem extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({selected:!this.state.selected})}>
        <View style={styles.boxItem}>
          <View style={styles.boxTxt}>
            <Text style={styles.boxItemTxt}>{this.props.cuisine}</Text>
          </View>
          <Ionicons name={this.state.selected ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'} size={24} color={'#f44336'} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class FilterModal extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      offers: false,
      veg: false,
      cuisines: ds.cloneWithRows([
        'North Indian',
        'South Indian',
        'Arabian',
        'Chinese',
        'Italian',
        'French',
        'Turkish',
      ]),
      ratings: false,
      dirty: false,
    }
  }

  applyFilters() {

  }

  resetFilters() {
    this.setState({
      veg: false,
    })
  }

  isDirty() {
    return true;
  }

  render() {

    const {cuisines} = this.state;

    const dirty = this.isDirty();

    return (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}
          onRequestClose={() => console.log('filter modal closed.')}
        >
            <View style={styles.container}>
                <Header
                  title="Filters"
                  leftItem={{
                    text: 'Close',
                    onPress: () => this.props.setModalVisible(false)
                  }}
                  rightItem={{
                    text: 'Reset',
                    onPress: this.resetFilters.bind(this)
                  }}
                />
                <View style={styles.content}>
                  <ScrollView style={{flex:1}}>
                    <View style={styles.box}>
                      <View style={styles.boxTitle}>
                        <Text style={styles.boxTitleTxt}>SORT BY</Text>
                      </View>
                      <View style={styles.boxContent}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ratings:!this.state.ratings})}>
                          <View style={[styles.boxItem, {borderColor: '#ccc',borderBottomWidth: 1}]}>
                            <Ionicons
                              color={'#f44336'}
                              name={this.state.ratings ? 'ios-star' : 'ios-star-outline'}
                              size={24}
                              style={{marginRight:10,alignSelf:'flex-start'}}
                            />
                            <View style={styles.boxTxt}>
                              <Text style={styles.boxItemTxt}>Ratings</Text>
                              <Text style={styles.boxItemSubTxt}>High - Low</Text>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                    <View style={styles.box}>
                      <View style={styles.boxTitle}>
                        <Text style={styles.boxTitleTxt}>RESTAURANTS WITH</Text>
                      </View>
                      <View style={styles.boxContent}>
                        <TouchableWithoutFeedback onPress={() => console.log(this.refs)}>
                          <View style={[styles.boxItem, {borderColor: '#ccc',borderBottomWidth: 1}]}>
                            <View style={styles.boxTxt}>
                              <Text style={styles.boxItemTxt}>Offers</Text>
                            </View>
                            <Switch value={this.state.offers} ref="offers" onValueChange={() => this.setState({offers: !this.state.offers})} />
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => console.log(this.refs)}>
                          <View style={[styles.boxItem, {borderColor: '#ccc',borderBottomWidth: 1}]}>
                            <View style={styles.boxTxt}>
                              <Text style={styles.boxItemTxt}>Veg Only</Text>
                            </View>
                            <Switch value={this.state.veg} onValueChange={() => this.setState({veg: !this.state.veg})} />
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                    <View style={styles.box}>
                      <View style={styles.boxTitle}>
                        <Text style={styles.boxTitleTxt}>CUISINES</Text>
                      </View>
                      <View style={styles.boxContent}>
                        <ListView
                          dataSource={cuisines}
                          renderSeparator={() => <View style={{backgroundColor:'#ccc',height:1}} />}
                          renderRow={(c, i) => {
                            return <CuisineItem cuisine={c} key={i} />;
                          }}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>
                <TouchableWithoutFeedback onPress={this.applyFilters}>
                  <View style={[styles.btn, {backgroundColor: dirty ? theme.red : '#ccc'}]}>
                      <Text style={styles.btnTxt}>APPLY FILTERS</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
        </Modal>
    )
  }
}

export default FilterModal;
