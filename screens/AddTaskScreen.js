import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import { connect } from 'react-redux'

import AddTaskForm from '../components/AddTaskForm'

class AddTaskScreen extends React.Component {
    
    render (){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Create{'\n'}New Task
                </Text>
                <AddTaskForm categories={this.props.categories} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.allIds.map(categoryId => state.categories.byIds[categoryId]),
})
  
export default connect(mapStateToProps)(AddTaskScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: Constants.statusBarHeight,
        paddingHorizontal: 30,
    },
    title : {
        fontSize: 45,
        fontFamily : 'kumbhSansBold',
    },
})