import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function BackButton({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Ionicons name="ios-arrow-round-back" size={50} color="black" />
		</TouchableOpacity>
	)
}

BackButton.propTypes = {
	onPress: PropTypes.func,
}
