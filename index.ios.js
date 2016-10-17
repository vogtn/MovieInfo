'use strict';

var React = require('react');
var ReactNative = require('react-native');

var SearchPage = require('./SearchPage');

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex:1
  }
});

class HelloWorld extends React.Component {
  render() {
    return <ReactNative.Text style = {styles.text}> Hello World </ReactNative.Text>;
  }
}

class MovieInfo extends React.Component {
  render() {
    return (
        <ReactNative.NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'MovieInfo',
            component: SearchPage,
          }}/>
      );
  }
}

ReactNative.AppRegistry.registerComponent('MovieInfo', function() { return MovieInfo });