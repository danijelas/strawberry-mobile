import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
// import { Constants } from 'expo';
import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import Login from '../screens/authentication/Login';
import Register from '../screens/authentication/Register';
import Home from '../screens/HomeScreen';
import AuthLoading from '../screens/authentication/AuthLoadingScreen';
// import ListItems from '../screens/ListItemsScreen';
// import Profile from '../screens/ProfileScreen';
// import EditProfile from '../screens/EditProfileScreen';
// import EmailChange from '../screens/EmailChangeScreen';
// import PasswordChange from '../screens/PasswordChangeScreen';
// import NewList from '../screens/NewList';
// import EditList from '../screens/EditListScreen';
// import NewItem from '../screens/NewItemScreen';
// import EditItem from '../screens/EditItemScreen';
// import Item from '../screens/ItemScreen';





const Root = (props) => {

  const AppStack = createStackNavigator({ Home: Home },
    {
      navigationOptions: {
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#000",
        },
        headerTintColor: "#f16c92"
      }
    }
  );
  const AuthStack = createStackNavigator({ Login: Login, Register: Register }, 
    {
      navigationOptions: {
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#000",
        },
      headerTintColor: "#f16c92"
    }
    }
  );
  //     initialRouteName: "Login",

  const Navigator = createSwitchNavigator({
      AuthLoading: AuthLoading,
      AppStack: AppStack,
      AuthStack: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  );
  // const Navigator = createMaterialTopTabNavigator({
  //   login: { screen: Login, path: '/login' },
  //   // register: { screen: Register, path: '/register' },
  //   home: {
  //     path: '/',
  //     screen: createStackNavigator({
  //       root: {
  //         screen: Home,
  //         path: '/',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       list: {
  //         screen: ListItems,
  //         path: '/list',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       newList: {
  //         screen: NewList,
  //         path: '/newList',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       editList: {
  //         screen: EditList,
  //         path: '/editList',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       newItem: {
  //         screen: NewItem,
  //         path: '/newItem',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       editItem: {
  //         screen: EditItem,
  //         path: '/editItem',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       item: {
  //         screen: Item,
  //         path: '/item',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //     }),
  //   },
  //   profile: {
  //     path: '/profile',
  //     screen: StackNavigator({
  //       userProfile: {
  //         screen: Profile,
  //         path: '/profile',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       editProfile: {
  //         screen: EditProfile,
  //         path: '/editProfile',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       emailChange: {
  //         screen: EmailChange,
  //         path: '/emailChange',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //       passwordChange: {
  //         screen: PasswordChange,
  //         path: '/passwordChange',
  //         navigationOptions: {
  //           header: null
  //         },
  //       },
  //     }),
  //   },
  // },
  //   {
  //     tabBarOptions: {
  //       labelStyle: {
  //         fontSize: 12,
  //         color: '#0e936d',
  //         fontWeight: 'bold',
  //         paddingTop: 10
  //         // textAlign: 'center'
  //       },
  //       // tabStyle: {
  //       //   width: 100,
          
  //       // },
  //       style: {
  //         backgroundColor: '#f16c92',
          
  //       },
  //     },
  //     lazy: true
  //   }
  // );

  return (
    <Provider store={props.store}>
      <StyleProvider style={getTheme(platform)}>
        <Navigator />
      </StyleProvider>
    </Provider>
  );
};

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(mapStateToProps)(Root);
export default Root;

// const styles = {
//   navigator: {
//     marginTop: Constants.statusBarHeight
//   }
// };
