import React, { Component } from 'react';
import { Font } from 'expo';
import store from './store';
import Root from './components/Root';

export default class App extends Component {
  constructor() {
    super();
    this.state = { isReady: false };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }

  render() {
    if (this.state.isReady) {
      return (
        <Root store={store} />
      );
    }

    return (
      <Expo.AppLoading />
    );
  }
};

