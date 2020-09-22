import React from 'react'
import PropTypes from 'prop-types'

import { FlatList } from 'react-native'
import Task from './Task'
import EmptyCategory from './EmptyCategory'

import { toggleTask } from '../redux/actions'
import { connect } from 'react-redux'

const renderItem = ({ item, color, toggle, onPress }) => {
	return (
		<Task
			item={item}
			color={color}
			onToggle={() =>
				toggle({ taskId: item.id, category: item.categoryId })
			}
			onPress={onPress}
		/>
	)
}

function TaskFlatList(props) {
	return (
		<FlatList
			data={props.tasks}
			keyExtractor={(item, index) => '' + index}
			renderItem={({ item }) =>
				renderItem({
					item,
					color: props.color,
					toggle: props.toggleTask,
					onPress: () =>
						props.navigation.navigate('EditTaskScreen', { item }),
				})
			}
			ListEmptyComponent={EmptyCategory}
		/>
	)
}

TaskFlatList.propTypes = {
	tasks: PropTypes.array.isRequired,
	color: PropTypes.string,
	toggleTask: PropTypes.func,
	navigation: PropTypes.object,
}

export default connect(null, { toggleTask })(TaskFlatList)
