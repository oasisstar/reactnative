import React, { Component } from 'react';
import	{
            StyleSheet,
            View,
            Text,
            ActivityIndicator
        } from 'react-native';

class LoaderView extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ActivityIndicator/> 
                <Text style={styles.loadText}>Loading data...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    },
    
    loadText: {
        fontSize: 20
    }
});

export default LoaderView;