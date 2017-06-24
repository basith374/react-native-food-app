import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

class Loading extends React.Component {
  render() {
    return (
      <View style={[{flexGrow:1,justifyContent:'center',alignItems:'center'}, this.props.style]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default Loading;
