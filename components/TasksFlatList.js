import React from 'react'
import { FlatList } from 'react-native'
import { toggleTask } from '../redux/actions'
import { connect } from 'react-redux'
import store from '../redux/store'

import Task from './Task'
import EmptyCategory from './EmptyCategory'


const renderItem = ({item, color, toggle}) => {

    const onPressTask = () =>{
      toggle({taskId:item.id, category:item.categoryId})
      console.log(store.getState())
    }

    return (
      <Task 
        item={item} 
        color={color} 
        onPress={onPressTask}
      />
    )
}

function TaskFlatList(props) {
    return(
        <FlatList 
            data={props.tasks}
            keyExtractor={(item) => ""+item.id}
            renderItem={({item}) => renderItem({
                item, 
                color:props.color,
                toggle:props.toggleTask,
            })}
            ListEmptyComponent={EmptyCategory}
        />
    )
}

export default connect(null, {toggleTask : toggleTask})(TaskFlatList)