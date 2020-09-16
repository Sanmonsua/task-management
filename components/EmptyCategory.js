import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function EmptyCategory() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
                Add new tasks to start getting things done
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems: 'center',
		justifyContent : 'center',
		paddingVertical : 100,
	},
	text : {
		color: '#d1d9e4', 
		fontSize: 18,
		fontFamily : 'kumbhSans',
		textAlignVertical : 'center',
		textAlign : 'center',
	}
})
