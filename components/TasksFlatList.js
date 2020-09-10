import React from 'react'
import { FlatList } from 'react-native'
import Task from './Task'
import EmptyCategory from './EmptyCategory'

const renderItem = ({item, index, color}) => {

    const onPressTask = () =>{
      return
    }

    return (
      <Task 
        item={item} 
        color={color} 
        onPress={onPressTask}
      />
    )
}

export default function TaskFlatList({ tasks, color }) {
    return(
        <FlatList 
            data={tasks}
            keyExtractor={(item) => ""+item.id}
            renderItem={({item}) => renderItem({item, color})}
            ListEmptyComponent={EmptyCategory}
        />
    )
}