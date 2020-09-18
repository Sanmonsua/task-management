import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


export default function DeleteButton({ onPress }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <MaterialIcons name="delete" size={35} color="black" />
            </TouchableOpacity>
        </View>
        
    )
} 