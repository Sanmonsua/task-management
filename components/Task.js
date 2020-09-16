import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons' 


export default function Task(props){
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={styles.taskContainer}
		>
			<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
				<Text style={styles.taskName}>
					{props.item.name}
				</Text>
				<TouchableOpacity onPress={props.onToggle}>
					{props.item.done 
						? <Ionicons name="ios-checkbox" size={24} color={props.color} />
						: <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#d1d9e4" />
					}
				</TouchableOpacity>
			</View>	       
			<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
				<Text style={styles.taskDate}>
					{props.item.date}
				</Text>
				{props.item.done 
					? <Text style={{... styles.taskDate, color:props.color}}>
						COMPLETED !
					</Text>
					: <Text style={styles.taskDate}>TO-DO</Text>
				}
			</View>

		</TouchableOpacity>
	)
} 

Task.propTypes = {
	item : PropTypes.object.isRequired,
	onPress : PropTypes.func.isRequired,
	onToggle : PropTypes.func.isRequired,
	color : PropTypes.string,
}

const styles = StyleSheet.create({
	taskContainer : {
		borderWidth : 1,
		borderRadius : 15,
		borderColor : '#d1d9e4',
		padding : 20,
		marginTop : 20,
	},
	taskName : {
		fontSize : 17,
		fontFamily : 'kumbhSans',
		flexShrink:1,
	},
	taskDate: {
		fontFamily : 'kumbhSansBold',
		color : '#d1d9e4',
		marginTop : 5,
	}
})