import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 


export default function BackButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons 
                name="ios-arrow-round-back" 
                size={50} 
                color="black" 
            />
        </TouchableOpacity>
    )
}