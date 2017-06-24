import React from 'react';
import FAApp from './js/FAApp';
import {Provider} from 'react-redux';
import configureStore from './js/store/configureStore';
import Relay  from 'react-relay/classic';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    }
  }


  render() {
    if(this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <FAApp />
      </Provider>
    )
  }
}

export default class App extends React.Component {

  constructor() {
    super();
    console.disableYellowBox = true;
    Relay.injectNetworkLayer(
      new Relay.DefaultNetworkLayer(`https://api.graph.cool/relay/v1/cj2x36tmkdnqa01948n11a3cb`, {
        fetchTimeout: 30000,
        retryDelays: [5000, 10000],
      })
    );
  }

  render() {
    return <Root />;
  }
}
