import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../redux/actions'
import { onChangeStore } from '../redux/store'

const LoadingScreen = ({ navigation }) => {
	const categories = useSelector((state) => state.categories.allIds)
	const uid = useSelector((state) => state.user.uid)
	const dispatch = useDispatch()

	const fetchData = async () => {
		dispatch(fetchCategories({ uid: uid }))
		onChangeStore()
		if (categories.length > 0) {
			navigation.navigate('TasksListScreen')
		} else {
			navigation.navigate('AddCategoryScreen', { back: false })
		}
	}

	React.useEffect(() => navigation.addListener('focus', () => fetchData()), [
		navigation,
	])

	return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size="large" />
		</View>
	)
}

LoadingScreen.propTypes = {
	categories: PropTypes.array,
	uid: PropTypes.string,
	navigation: PropTypes.object,
}

export default LoadingScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
	},
})
