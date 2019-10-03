'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';

import ListView from 'deprecated-react-native-listview';

class Users extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows([]),
      showProgress: true,
      serverError: false,
      resultsCount: 0,
      recordsCount: 15,
      positionY: 0,
      searchQuery: '',
      refreshing: false,
    };

    this.getItems();
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.refreshComponent();
      },
    );
  }

  refreshComponent() {
    if (appConfig.users.refresh) {
      appConfig.users.refresh = false;

      this.setState({
        showProgress: true,
      });

      setTimeout(() => {
        this.getItems();
      }, 500);
    }
  }

  getItems() {
    this.setState({
      serverError: false,
      resultsCount: 0,
      recordsCount: 15,
      positionY: 0,
      searchQuery: '',
    });

    //fetch(appConfig.url + 'api/users/get', {
    fetch('http://dummy.restapiexample.com/api/v1/employees', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': appConfig.access_token,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.slice(0, 15)),
          resultsCount: responseData.length,
          responseData: responseData,
          filteredItems: responseData,
          refreshing: false,
        });
      })
      .catch((error) => {
        this.setState({
          serverError: true,
        });
      })
      .finally(() => {
        this.setState({
          showProgress: false,
        });
      });
  }

  sort(a, b) {
    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  showDetails(rowData) {
    appConfig.item = rowData;
    this.props.navigation.navigate('UserDetails');
  }

  addItem() {
    this.props.navigation.navigate('UserAdd');
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.showDetails(rowData)}
        underlayColor='#ddd'>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {rowData.id} - {rowData.employee_name} - {rowData.employee_age} - {rowData.employee_salary}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  refreshData(event) {
    if (this.state.showProgress === true) {
      return;
    }

    if (this.state.filteredItems === undefined) {
      return;
    }

    let items, positionY, recordsCount;
    recordsCount = this.state.recordsCount;
    positionY = this.state.positionY;
    items = this.state.filteredItems.slice(0, recordsCount);

    if (event.nativeEvent.contentOffset.y >= positionY - 10) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        recordsCount: recordsCount + 10,
        positionY: positionY + 500,
      });
    }
  }

  onChangeText(text) {
    if (this.state.dataSource === undefined) {
      return;
    }

    let arr = [].concat(this.state.responseData);
    let items = arr.filter((el) => el.employee_name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
      resultsCount: items.length,
      filteredItems: items,
      searchQuery: text,
    });
  }

  refreshDataAndroid() {
    this.setState({
      showProgress: true,
      resultsCount: 0,
    });

    this.getItems();
  }

  clearSearchQuery() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 15)),
      resultsCount: this.state.responseData.length,
      filteredItems: this.state.responseData,
      positionY: 0,
      recordsCount: 15,
      searchQuery: '',
    });
  }

  onMenu() {
    //appConfig.drawer.openDrawer();
  }

  render() {
    let errorCtrl, loader, image;

    if (this.state.serverError) {
      errorCtrl = <Text style={styles.error}>
        Something went wrong.
      </Text>;
    }

    if (this.state.showProgress) {
      loader = <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="darkblue"
          animating={true}
        />
      </View>;
    }

    if (this.state.searchQuery.length > 0) {
      image = <Image
        source={require('../../../img/cancel.png')}
        style={{
          height: 20,
          width: 20,
          marginTop: 10,
        }}
      />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <TouchableWithoutFeedback onPress={this.onMenu.bind(this)}>
              <View>
                <Image
                  style={styles.menu}
                  source={require('../../../img/menu.png')}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TouchableWithoutFeedback>
              <View>
                <Text style={styles.textLarge}>
                  Dummy.restapiexample
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TouchableHighlight
              onPress={() => this.addItem()}
              underlayColor='darkblue'>
              <View>
                <Text style={styles.textSmall}>
                  New
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.iconForm}>
          <View>
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              onChangeText={this.onChangeText.bind(this)}
              style={styles.searchLarge}
              value={this.state.searchQuery}
              placeholder="Search here">
            </TextInput>
          </View>
          <View style={styles.searchSmall}>
            <TouchableWithoutFeedback
              onPress={() => this.clearSearchQuery()}>
              <View>
                {image}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {errorCtrl}

        {loader}

        <ScrollView
          onScroll={this.refreshData.bind(this)}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={this.state.refreshing}
              onRefresh={this.refreshDataAndroid.bind(this)}
            />
          }>
          <ListView
            style={styles.scroll}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </ScrollView>

        <View>
          <TouchableWithoutFeedback
            onPress={() => this.clearSearchQuery()}>
            <View>
              <Text style={styles.countFooter}>
                Records: {this.state.resultsCount}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconForm: {
    flexDirection: 'row',
    borderColor: 'darkblue',
    borderWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'darkblue',
    borderTopWidth: 1,
    borderColor: 'white',
  },
  searchLarge: {
    height: 45,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 0,
    width: Dimensions.get('window').width * .90,
  },
  searchSmall: {
    height: 45,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'white',
    marginLeft: -5,
    paddingLeft: 5,
    width: Dimensions.get('window').width * .10,
  },
  textSmall: {
    fontSize: 16,
    textAlign: 'center',
    margin: 14,
    marginLeft: 0,
    fontWeight: 'bold',
    color: 'white',
  },
  textLarge: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 12,
    paddingLeft: 0,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    height: 45,
    marginTop: 0,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'lightgray',
    borderRadius: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  rowText: {
    backgroundColor: '#fff',
    color: 'black',
    fontWeight: 'bold',
  },
  countFooter: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    borderColor: '#D7D7D7',
    backgroundColor: 'darkblue',
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    justifyContent: 'center',
    height: 100,
  },
  error: {
    color: 'red',
    paddingTop: 10,
    textAlign: 'center',
  },
  menu: {
    alignItems: 'center',
    margin: 14,
    marginTop: 16,
  },
});

export default Users;
