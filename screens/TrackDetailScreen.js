import React, { Component } from 'react';
import	{ 
			Image,
			StyleSheet,
			View,
			Text, FlatList,
			TouchableOpacity
		} from 'react-native';

import LoaderView from '../component/LoaderView'
import TrackItem from '../component/TrackItem'
import GLOBAL from '../component/global'

class TrackDetailScreen extends Component {
	
	constructor(props) {
		super(props);
		this.state ={ 	isLoading: true, 
						trackData: {
							name: '',

						}
					};
		this._onChooseTrack = this._onChooseTrack.bind(this);
	}

	componentDidMount(){
		var trackID = this.props.navigation.getParam('trackID', '');
		fetch('https://api.spotify.com/v1/tracks/' + trackID, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + GLOBAL.apiKey
			},
		})
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
				isLoading: false,
				trackData: responseJson
            }, function(){
			});
        })
        .catch((error) =>{
            console.error(error);
        });
	}

	_onChooseTrack() {
		this.props.navigation.navigate('SolventChoose');
	}
	
	render() {
		if(this.state.isLoading){
            return(
                <LoaderView />
            )
		}
		
		return (
			<View style={styles.container}>
				<TrackItem text="Name" value={this.state.trackData.name}/>
				<TrackItem text="Artist" value={this.state.trackData.artists[0].name}/>
				<TrackItem text="Album" value={this.state.trackData.album.name}/>
				<TrackItem text="Duration" value={this.state.trackData.duration_ms.toString() + ' ms'}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		padding: 20,
	},	
});

export default TrackDetailScreen;