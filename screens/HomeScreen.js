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

class HomeScreen extends Component {
	
	constructor(props) {
		super(props);
		this.state ={ isLoading: true, playListData: null};
		this._onChoosePlayList = this._onChoosePlayList.bind(this);
	}

	componentDidMount(){
		fetch('https://api.spotify.com/v1/users/wizzler/playlists', {
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
				playListData: responseJson.items
            }, function(){
			});
        })
        .catch((error) =>{
            console.error(error);
        });
	}

	_onChoosePlayList(id) {
		this.props.navigation.navigate('Track',  {playListID: id});
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
				data = {this.state.playListData}
				renderItem={
					({item}) => 
					<TouchableOpacity activeOpacity={0.5} onPress={() => this._onChoosePlayList(item.id)}>
						<View style = {styles.item}>
							<Image source={{uri: item.images[0].url}} style={styles.playImg}/>
							<View style = {styles.itemTitle}>
								<Text style = {styles.itemText}>{item.name}</Text>
							</View>
							<View style = {styles.itemTrack}>
								<Text style = {{...styles.itemText, ...{textAlign: "right"}}}>{item.tracks.total}</Text>
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
	},

	tableView: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 20,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 15,
        borderColor: '#5D81A3',
        borderWidth: 2,
        backgroundColor:'white',
	},

	playImg: {
		width: 40,
		height: 40
	},
	
	item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#5D81A3', 
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
		width: 50,
		marginLeft: 10,
		marginRight: 10,
	},
});

export default HomeScreen;