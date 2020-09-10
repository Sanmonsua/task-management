import React from 'react'
import { FlatList } from 'react-native'

import CategoryButton from './CategoryButton'

import { connect } from 'react-redux'
import { selectCategory } from '../redux/actions'


function renderItem({ item, selectedId, select }) {
    
    return (
        <CategoryButton 
            name={item.name} 
            color={item.color}
            selected={item.id === selectedId}
            onPress={() => select({ categoryId : item.id })}
      />
    )
}

function CategoriesFlatList(props) {
    return (
        <FlatList 
            data={props.categories}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => renderItem({
                item,
                selectedId : props.selectedId,
                select : props.selectCategory,
            })}
        />
        
    )
}


export default connect(null, { selectCategory })(CategoriesFlatList)