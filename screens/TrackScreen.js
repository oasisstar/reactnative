import React, { Component } from 'react';
import	{ 
			Image,
			StyleSheet,
			View,
			Text, FlatList,
			TouchableOpacity
		} from 'react-native';

import LoaderView from '../component/LoaderView'
import GLOBAL from '../component/global'

class TrackScreen extends Component {
	
	constructor(props) {
		super(props);
		this.state ={ isLoading: true, trackListData: null};
		this._onChooseTrack = this._onChooseTrack.bind(this);
	}

	componentDidMount(){
		var playListID = this.props.navigation.getParam('playListID', '');
		fetch('https://api.spotify.com/v1/playlists/' + playListID + '/tracks', {
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
				trackListData: responseJson.items
            }, function(){
			});
        })
        .catch((error) =>{
            console.error(error);
        });
	}

	_onChooseTrack(id) {
		this.props.navigation.navigate('TrackDetail',  {trackID: id});
	}
	
	render() {
		if(this.state.isLoading){
            return(
                <LoaderView />
            )
		}
		
		return (
			<View style={styles.container}>
				<FlatList 
				style = {styles.tableView}
				data = {this.state.trackListData}
				renderItem={
					({item, index }) => 
					<TouchableOpacity activeOpacity={0.5} onPress={() => this._onChooseTrack(item.track.id)}>
						<View style = {styles.item}>
							<View style = {styles.itemRow}>
								<View style = {styles.itemTitle}>
									<Text style = {styles.itemText}>{item.track.name}</Text>
								</View>
								<Image source={{uri: item.track.album.images[0].url}} style={styles.playImg}/>
							</View>
							
							<View style = {styles.itemRow}>
								<View style = {styles.itemTitle}>
									<Text style = {styles.itemText}>{item.track.artists[0].name}</Text>
								</View>
								<View style = {styles.itemTrack}>
									<Text style = {{...styles.itemText, ...{textAlign: "right"}}}>{item.track.popularity}</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				}
				keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},

	tableView: {
        flex: 1,
        alignSelf: 'stretch',
	},

	playImg: {
		width: 40,
		height: 40
	},
	
	item: {
		marginTop: 10,
		padding: 10,
		borderRadius: 15,
        borderWidth: 2,
		borderColor: '#5D81A3',
		height: 100,
		justifyContent: 'center'
	},

	itemRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	
	itemTitle: {
		flex: 1,
		marginLeft: 10,
		overflow: "hidden"
	},

	itemText: {
		fontSize: 18,
	},
	
	itemTrack: {
		width: 40,
		marginLeft: 10,
		marginRight: 10,
	},
});

export default TrackScreen;