import _ from 'lodash';
import React, { Component } from 'react';
import { AppLoading } from 'expo';
import {
  Container,
  Content,
  Text,
  Button
} from 'native-base';
// import { Alert, ListView } from 'react-native';
// import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
// import { logout, getLists, getItems, selectList, deleteList, deleteListSuccess } from '../actions';
import { logout } from '../actions';
class Home extends Component {

  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = { errorMessage: null };
    // this.onProfile = this.onProfile.bind(this);
    // this.viewList = this.viewList.bind(this);
    // this.onNewList = this.onNewList.bind(this);
    // this.deleteListAlert = this.deleteListAlert.bind(this);
    // this.onDeleteListSubmit = this.onDeleteListSubmit.bind(this);
    // this.onEditList = this.onEditList.bind(this);
    // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(){
    this.props.logout();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isAuthenticated) {
      this.props.navigation.navigate('AuthStack');
    }
  }
  // componentWillMount() {
  //   if (!this.props.isAuthenticated) {
  //     this.props.navigation.navigate('login');
  //   }
  //   // this.props.getLists();
  // }

  // onProfile() {
  //   this.props.navigation.navigate('profile');
  // }

  // viewList(list) {
  //   this.props.selectList(list);
  //   this.props.getItems(list.id);
  //   this.props.navigation.navigate('list');
  // }

  // onNewList() {
  //   this.props.navigation.navigate('newList');
  // }

  // onEditList(list, secId, rowId, rowMap) {
  //   this.props.selectList(list);
  //   rowMap[`${secId}${rowId}`].props.closeRow();
  //   this.props.navigation.navigate('editList');
  // }

  // deleteListAlert(list, secId, rowId, rowMap) {
  //   Alert.alert(
  //     'Delete',
  //     `Do you realy want to delete list '${list.name}?'`,
  //     [
  //       {text: 'Cancel', onPress: () => { rowMap[`${secId}${rowId}`].props.closeRow(); }, style: 'cancel'},
  //       {text: 'OK', onPress: () => {this.onDeleteListSubmit(list, secId, rowId, rowMap)}},
  //     ],
  //     { cancelable: false }
  //   )
  // }

  // async onDeleteListSubmit(list, secId, rowId, rowMap) {
  //   rowMap[`${secId}${rowId}`].props.closeRow();
  //   try {
  //     const response = await deleteList(list);
  //     this.props.deleteListSuccess(list.id);
  //   } catch (error) {
  //     if (error.response) {
  //       const data = error.response.data;
  //       this.setState({ errorMessage: data.error });
  //     } else {
  //       this.setState({ errorMessage: 'Server error' });
  //     }
  //   }
  // }

  // renderLists() {
  //   const { lists } = this.props;
  //   if (_.isEmpty(lists)) {
  //     return <Text style={styles.textStyle}>There is no item</Text>;
  //   }
  //   return (
  //     <List
  //       dataSource={this.ds.cloneWithRows(lists)}
  //       renderRow={data =>
  //         <ListItem>
  //           <Button
  //             style={styles.listField}
  //             transparent
  //             full
  //             onPress={() => {this.viewList(data)}}
  //           >
  //             <Text style={styles.textStyle}>{data.name}</Text>
  //             <Icon style={styles.iconStyle} name='arrow-forward' />
  //           </Button>
  //         </ListItem>}
  //       renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
  //         <Button
  //           full
  //           onPress={() => this.onEditList(data, secId, rowId, rowMap)}
  //           style={styles.editButtonStyle}
  //         >
  //           <Icon active name="md-create" />
  //         </Button>}
  //       renderRightHiddenRow={(data, secId, rowId, rowMap) =>
  //         <Button
  //           full
  //           danger
  //           onPress={() => this.deleteListAlert(data, secId, rowId, rowMap)}
  //           style={styles.deleteButtonStyle}
  //         >
  //           <Icon active name="trash" />
  //         </Button>}
  //       leftOpenValue={75}
  //       rightOpenValue={-75}
  //     />
  //   );
  // }

  // renderAddButton() {
  //   return (
  //     <Button
  //       style={styles.addButtonStyle}
  //       primary
  //       onPress={() => {this.onNewList()}}
  //     >
  //       <Icon name='add' />
  //     </Button>
  //   );
  // }

  renderLogoutButton() {
    return (
      <Button
        style={styles.addButtonStyle}
        primary
        onPress={() => {this.onLogout()}}
      >
        <Text>Logout</Text>
      </Button>
    );
  }
  render() {
    // if (this.props.isFetchInProgress) {
    //   return (
    //     <AppLoading />
    //   );
    // }
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Text style={styles.errorTextStyle}>
            {this.state.errorMessage}
          </Text>
          <Text>Home boy!</Text>
          {this.renderLogoutButton()}
       </Content>
      </Container>
    );
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  // lists: state.listsData.lists,
  // isFetchInProgress: state.listsData.isFetchInProgress
});

// export default connect(mapStateToProps, { getLists, getItems, selectList, deleteListSuccess })(Home);
export default connect(mapStateToProps, { logout })(Home);
const styles = {
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  // btnList: {
  //   flexDirection: 'row',
  //   justifyContent: 'center'
  // },
  addButtonStyle:{
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  editButtonStyle: {
    backgroundColor: "#228B22",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  deleteButtonStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listField: {
    flexDirection: 'row',
    // alignItems: 'stretch',
    // flex: 1
  },
  // listFieldName: {
  //
  // },
  textStyle: {
    // alignItems: 'flex-start',
    color: '#000000'
  },
  iconStyle: {
    // alignItems: 'flex-end',
    color: '#000000'
  },
  // listFieldView: {
  //   flexDirection: 'row',
  //   alignItems: 'stretch'
  // }
};
