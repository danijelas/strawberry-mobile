import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    props.fetchProfile();
  }

//   componentWillMount() {
//     if (this.props.isAuthenticated) {
//       this.goToHome();
//     }
//   }
  componentWillReceiveProps(nextProps) {
    // console.log('AuthLoadingScreen', nextProps);
    if ((nextProps.isAuthenticated !== this.props.isAuthenticated) && nextProps.isAuthenticated) {
      // console.log('Route to App');
      this.props.navigation.navigate('AppStack');
    } else if (!this.props.isFetchProfileInProgress){
      // console.log('Route to Auth');
      this.props.navigation.navigate('AuthStack');
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.error,
  // isLoading: state.auth.loading,
  isFetchProfileInProgress: state.auth.isFetchProfileInProgress
});

export default connect(mapStateToProps, { fetchProfile })(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});