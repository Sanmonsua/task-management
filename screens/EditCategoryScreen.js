import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'

import { connect } from 'react-redux'
import { deleteCategory } from '../redux/actions'

import BackButton from '../components/BackButton'
import DeleteButton from '../components/DeleteButton'
import EditCategoryForm from '../components/EditCategoryForm'


class EditCategoryScreen extends React.Component {
	
	onDelete = () => {
		this.props.deleteCategory(this.props.route.params.category)
		this.props.navigation.pop()
	}

	render (){

		return (
			<View style={styles.container}>
				<View style={styles.actionsRow}>
					<BackButton 
						onPress={()=>this.props.navigation.pop()}
					/>
					<DeleteButton 
						onPress={()=>this.onDelete()} 
					/>
				</View>
				
				<Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
                    Edit Category
				</Text>
				<View style={{flex:1}}>
					<EditCategoryForm
						category={ this.props.route.params.category }
						onSubmit={()=>this.props.navigation.pop()}
					/>
				</View>
                
			</View>
		)
	}
}

EditCategoryScreen.propTypes = {
	navigation : PropTypes.object,
	route : PropTypes.object,
}


const mapStateToProps = state => ({
	categories: state.categories.allIds,
})
  
export default connect(mapStateToProps, { deleteCategory })(EditCategoryScreen)


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
	actionsRow : {
		flexDirection : 'row',
		justifyContent:'space-between',
		alignItems:'center'
	}
})