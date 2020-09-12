import React from 'react'
import { FlatList } from 'react-native'
import { toggleTask } from '../redux/actions'
import { connect } from 'react-redux'

import Task from './Task'
import EmptyCategory from './EmptyCategory'


const renderItem = ({item, color, toggle}) => (
  <Task 
    item={item} 
    color={color} 
    onPress={() => toggle({taskId:item.id, category:item.categoryId})}
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
            })}
            ListEmptyComponent={EmptyCategory}
        />
    )
}

export default connect(null, { toggleTask })(TaskFlatList)