import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import HotelItem from '../components/HotelItem';
import Header from '../components/Header';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    backgroundColor: '#efefef',
  }
});

class Collections extends React.Component {
  constructor() {
    super();
    this.state = {
      collection: [
        {name:'Paris',desc:'Multi Cuisine'},
        {name:'Rotana',desc:'Cafe'},
        {name:'Plaza',desc:'Restaurant'},
        {name:'Jubilee',desc:'Multi Cuisine'},
      ],
      refreshing: false,
    }
  }
  _onRefresh() {
    this.setState({refreshing:true});
    setTimeout(() => this.setState({refreshing:false}), 1000);
  }
  componentDidMount() {
    this.setState({refreshing:true});
    setTimeout(() => {
      this.setState({refreshing:false});
    }, 1000);
  }
  render() {
    const {collection,refreshing} = this.state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(refreshing) {
      content = <Loading />;
    } else {
      content = (
        <ListView
          style={styles.list}
          contentContainerStyle={{paddingTop:5}}
          dataSource={ds.cloneWithRows(collection)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          renderSeparator={() => <View style={{height:5,backgroundColor:'#efefef'}} />}
          renderRow={(rowData) => {
            return <HotelItem hotel={rowData} onPress={() => console.log('foo')} />;
          }}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={{marginTop:22}}>
          <Header title="Collection"
            leftItem={{
              icon: 'ios-arrow-back',
              onPress: () => this.props.navigation.goBack()
            }}
          />
        </View>
        {content}
      </View>
    )
  }
}

export default Collections;
