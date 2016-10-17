'use strict';

import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicator,
	Image
} from 'react-native';

var SearchResults = require('./SearchResults');

var styles = StyleSheet.create({
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
	},
	container: {
		padding: 30,
		marginTop: 65,
		alignItems: 'center'
	},
	flowRight:{
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	buttonText:{
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button:{
		height: 36,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	searchInput: {
		height: 36,
		padding: 4,
		marginRight: 5,
		flex: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: '#48BBEC'
	}
});

function urlForQueryAndPage(key, value) {
	var data = {
		plot: 'short',
		r: 'json',
	};
	data[key] = value;

	var querystring = Object.keys(data)
		.map(key => key + '=' + encodeURIComponent(data[key]))
		.join('&');

	return 'http://www.omdbapi.com/?t=' + querystring;
};

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: 'Happy Feet',
			isLoading: false,
			message: ''
		};
	}
	onSearchTextChanged(event) {
		console.log('onSearchTextChanged');
		this.setState({ searchString: event.nativeEvent.text });
		console.log(this.state.searchString);
	}
	_executeQuery(query) {
		console.log(query);
		this.setState({ isLoading: true });
	}
	onSearchPressed() {
		var query = urlForQueryAndPage(this.state.searchString);
		this._executeQuery(query);
		fetch(query)
			.then(response => response.json())
			.then(json => this._handleResponse(json.response))
			.catch(error =>
				this.setState({
					isLoading: false,
					message: 'Something bad happened ' + error
				}));
	}
	_handleResponse(response) {
		this.setState({ isLoading: false , message: ''});
		if (response.application_response_code.substr(0,1) === '1') {
			this.props.navigator.push({
				title: 'Results',
				component: SearchResults,
				passProps: {listings: response.listings}
			});
		} else {
			this.setState({ message: 'Movie not recognized; please try again.'});
		}
	}
	render() {
		var spinner = this.state.isLoading ?
			( <ActivityIndicator
				size='large'/>) :
			(<View/>);
		console.log('SearchPage.render');
		return(
			<View style={styles.container}>
				<Text style={styles.description}>
					Search for a Movie!
				</Text>
				<View style={styles.flowRight}>
					<TextInput
						style={styles.searchInput}
						value={this.state.searchString}
						onChange={this.onSearchTextChanged.bind(this)}
						placeholder='Search via Movie Title'/>
					<TouchableHighlight style={styles.button}
						underlayColor='#99d9f4'
						onPress={this.onSearchPressed.bind(this)}>
						<Text style={styles.buttonText}>Go</Text>
					</TouchableHighlight>
				</View>
				{spinner}
				<Text style={styles.description}>{this.state.message}</Text>
			</View>
		);
	}
}

module.exports = SearchPage;