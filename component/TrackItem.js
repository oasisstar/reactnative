import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity} from 'react-native';

class TrackItem extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={styles.detailView}>
                <Text style={styles.valueText}>{this.props.text}</Text>
                <View style={styles.valueView}>
                    <Text style={styles.valueText}>{this.props.value}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    detailView: {
        marginTop: 20,
		alignSelf: "stretch",
		alignItems: 'center',
	},

	valueText: {
        fontSize: 25,
        color: '#5D81A3',
        textAlign: "center"
	},
	
	valueView: {
        marginTop: 10,
		borderRadius: 15,
		borderColor: '#5D81A3',
        borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: "stretch",
	}
});
export default TrackItem;