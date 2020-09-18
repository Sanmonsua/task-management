import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'

import { connect } from 'react-redux'

import BackButton from '../components/BackButton'
import EditTaskForm from '../components/EditTaskForm'
import DeleteButton from '../components/DeleteButton'


class EditTaskScreen extends React.Component {
    
	render (){
		return (
			<View style={styles.container}>
				<View style={{flexDirection : 'row', justifyContent:'space-between', alignItems:'center'}}>
					<BackButton 
						onPress={()=>this.props.navigation.pop()}
					/>
					<DeleteButton 
						onPress={()=>null} 
					/>
				</View>
				
				<Text style={styles.title}>
                    Edit Task
				</Text>
				<View style={{flex:1}}>
					<EditTaskForm
						task={this.props.route.params.item}
						categories={this.props.categories}
						selectedCategory={this.props.category}
						onSubmit={()=>this.props.navigation.pop()}
					/>
				</View>
                
			</View>
		)
	}
}

EditTaskScreen.propTypes = {
	navigation : PropTypes.object,
	route : PropTypes.object,
	categories : PropTypes.array,
	category: PropTypes.object,
}


const mapStateToProps = state => ({
	categories: state.categories.allIds.map(
		categoryId => state.categories.byIds[categoryId]),
	category : state.categories.byIds[state.categories.selectedId],
})
  
export default connect(mapStateToProps)(EditTaskScreen)


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