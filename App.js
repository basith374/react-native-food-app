import React from 'react';
import FAApp from './js/FAApp';
import {Provider} from 'react-redux';
import configureStore from './js/store/configureStore';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    }
  }


  render() {
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
  }

  render() {
    return <Root />;
  }
}
