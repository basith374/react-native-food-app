import React from 'react';
import {
  View,
  StyleSheet,
  AppState,
  StatusBar
} from 'react-native';
import FANavigator from './FANavigator';
import {connect} from 'react-redux';

class FAApp extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange(appState) {
    if(appState === 'active') {
      // do stuff
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FANavigator />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const select = (store) => {
  return {

  }
}

export default connect(select)(FAApp);
