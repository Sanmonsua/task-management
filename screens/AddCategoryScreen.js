import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import { connect } from 'react-redux'

import BackButton from '../components/BackButton'
import AddCategoryForm from '../components/AddCategoryForm'

class AddCategoryScreen extends React.Component {
    
    render (){
        return (
            <View style={styles.container}>
                <BackButton 
                    onPress={()=>this.props.navigation.pop()}
                />
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
                    Create Category
                </Text>
                <View style={{flex:1}}>
                    <AddCategoryForm
                        onSubmit={()=>this.props.navigation.pop()}
                    />
                </View>
                
            </View>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.allIds.map(categoryId => state.categories.byIds[categoryId]),
    category : state.categories.byIds[state.categories.selectedId],
})
  
export default connect(mapStateToProps)(AddCategoryScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: Constants.statusBarHeight,
        paddingHorizontal: 30,
    },
    title : {
        fontSize: 45,
        color:"#222429",
        fontFamily : 'kumbhSansBold',
    },
})