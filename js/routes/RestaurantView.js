import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ListView,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import FoodItem from '../components/FoodItem';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Loading from '../components/Loading';
import theme from '../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#efefef',
    flexGrow: 1,
  },
  listContainer: {
    paddingTop: 5,
    flexGrow: 1
  },
  list: {
  }
});

const Tab = (props) => (
  <View style={styles.listContainer}>
    <ListView
      style={styles.list}
      dataSource={props.ds}
      renderSeparator={() => <View style={{backgroundColor: '#efefef',height:5}} />}
      renderRow={(rowData) => {
        return (
          <FoodItem
            food={rowData}
            recommended={props.recommended}
          />
        )
      }}
    />
  </View>
)

class CategoryTabs extends React.PureComponent {
  state = {
    index: 0
  }
  _handleChangeTab = index => this.setState({index});

  _renderHeader = props => (
    <TabBar
      style={{
        backgroundColor: '#fff',
      }}
      labelStyle={{
        color: '#555',
      }}
      tabStyle={{
        paddingVertical: 5,
      }}
      indicatorStyle={{
        backgroundColor: theme.red,
      }}
      scrollEnabled={true}
      getLabelText={({route}) => route.title ? route.title : null}
      {...props}
    />
  )

  _renderScene = ({route}) => {
    const {items} = this.props;
    const selectedItems = route.recommended
      ? items.filter(i => i.recommended)
      : items.filter(i => i.category == route.category);
    return <Tab ds={this.props.ds.cloneWithRows(selectedItems)} recommended={route.recommended} />
  };

  render() {
    const {index} = this.state;
    const {routes} = this.props;
    const navigationState = {
      routes,
      index
    }
    return (
      <TabViewAnimated
        navigationState={navigationState}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    )
  }
}

class RestaurantView extends React.Component {

  state = {
    foods: [
      {name: 'Biriyani',desc: 'Foozie',category:1,recommended: true},
      {name: 'Biriyani',desc: 'Foozie',category:2,recommended: true},
      {name: 'Biriyani',desc: 'Foozie',category:3,recommended: true},
      {name: 'Biriyani',desc: 'Foozie',category:4,recommended: true},
      {name: 'Biriyani',desc: 'Foozie',category:5,recommended: true},
      {name: 'Biriyani',desc: 'Foozie',category:6,},
      {name: 'Biriyani',desc: 'Foozie',category:7,},
      {name: 'Biriyani',desc: 'Foozie',category:8,},
      {name: 'Biriyani',desc: 'Foozie',category:9,},
      {name: 'Biriyani',desc: 'Foozie',category:9,},
      {name: 'Biriyani',desc: 'Foozie',category:1,},
      {name: 'Biriyani',desc: 'Foozie',category:1,},
      {name: 'Biriyani',desc: 'Foozie',category:1,},
      {name: 'Biriyani',desc: 'Foozie',category:2,},
      {name: 'Biriyani',desc: 'Foozie',category:3,},
      {name: 'Biriyani',desc: 'Foozie',category:3,},
      {name: 'Biriyani',desc: 'Foozie',category:3,},
      {name: 'Biriyani',desc: 'Foozie',category:3,},
      {name: 'Biriyani',desc: 'Foozie',category:4,},
      {name: 'Biriyani',desc: 'Foozie',category:6,},
      {name: 'Biriyani',desc: 'Foozie',category:8,},
    ],
    loading: false,
    ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentDidMount() {
    this.setState({loading:true});
    setTimeout(() => this.setState({loading:false}), 1000);
  }

  render() {
    const {foods,loading} = this.state;
    if(loading) {
      content = <Loading style={{backgroundColor:'#fff'}} />;
    } else {
      content = (
        <View style={styles.container}>
          <View style={{paddingTop: 22}}>
            <Header title="Restaurant" leftItem={{
              icon: 'ios-arrow-back',
              onPress: () => this.props.navigation.goBack(),
            }} />
          </View>
          <View style={styles.content}>
            <CategoryTabs
              routes={[
                {key:'1',title:'Recommended',recommended:true},
                {key:'2',title:'Burgers',category:1},
                {key:'3',title:'Grilled Hot Dogs',category:2},
                {key:'4',title:'French Fries',category:3},
                {key:'5',title:'Sandwiches',category:4},
                {key:'6',title:'Subs',category:5},
                {key:'7',title:'Tasty Platters',category:6},
                {key:'8',title:'Combos',category:7},
                {key:'9',title:'Beverages',category:8},
              ]}
              items={this.state.foods}
              ds={this.state.ds} />
          </View>
        </View>
      )
    }
    return content;
  }
}

export default RestaurantView;
