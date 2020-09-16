import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'

import { connect } from 'react-redux'

import BackButton from '../components/BackButton'
import AddTaskForm from '../components/AddTaskForm'


class AddTaskScreen extends React.Component {
    
	render (){
		return (
			<View style={styles.container}>
				<BackButton 
					onPress={()=>this.props.navigation.pop()}
				/>
				<Text style={styles.title}>
                    Create{'\n'}New Task
				</Text>
				<View style={{flex:1}}>
					<AddTaskForm
						categories={this.props.categories}
						selectedCategory={this.props.category}
						onSubmit={()=>this.props.navigation.pop()}
					/>
				</View>
                
			</View>
		)
	}
}

AddTaskScreen.propTypes = { 
	navigation : PropTypes.object,
	categories : PropTypes.array,
	category : PropTypes.object, 
}


const mapStateToProps = state => ({
	categories: state.categories.allIds.map(
		categoryId => state.categories.byIds[categoryId]),
	category : state.categories.byIds[state.categories.selectedId],
})
  
export default connect(mapStateToProps)(AddTaskScreen)


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingVertical: Constants.statusBarHeight,
		paddingHorizontal: 30,
	},
	title : {
		fontSize: 45,
		color:'#222429',
		fontFamily : 'kumbhSansBold',
	},
})