import React from 'react'
import { FlatList } from 'react-native'
import { toggleTask } from '../redux/actions'
import { connect } from 'react-redux'

import Task from './Task'
import EmptyCategory from './EmptyCategory'


const renderItem = ({item, color, toggle, onPress}) => (
  <Task 
    item={item} 
    color={color} 
    onToggle={() => toggle({taskId:item.id, category:item.categoryId})}
    onPress={onPress}
  />
)

function TaskFlatList(props) {
    return(
        <FlatList 
            data={props.tasks}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => renderItem({
                item, 
                color:props.color,
                toggle:props.toggleTask,
                onPress:props.onPress,
            })}
            ListEmptyComponent={EmptyCategory}
        />
    )
}

export default connect(null, { toggleTask })(TaskFlatList)