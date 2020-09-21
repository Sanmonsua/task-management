import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'


export default function DeleteButton({ onPress }) {
	return (
		<View>
			<TouchableOpacity onPress={onPress}>
				<MaterialIcons name="delete" size={35} color="black" />
			</TouchableOpacity>
		</View> 
	)
}

DeleteButton.propTypes = { 
	onPress : PropTypes.func, 
}