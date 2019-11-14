import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ErrorBoundary from 'react-native-error-boundary'

import HomeScreen from './screens/HomeScreen';
import TrackScreen from './screens/TrackScreen';
import TrackDetailScreen from './screens/TrackDetailScreen'

const RootStack = createStackNavigator(
	{
		Home: HomeScreen,
		Track: TrackScreen,
		TrackDetail: TrackDetailScreen,
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none',
	}
);

const AppContainer = createAppContainer(RootStack);

class App extends Component {
	render() {
	  	return (
			<ErrorBoundary>
				<AppContainer/>
			</ErrorBoundary>
		)
	}
}

export default App;