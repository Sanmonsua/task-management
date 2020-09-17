import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import PropTypes from "prop-types"

import { connect } from 'react-redux'
import { fetchCategories } from '../redux/actions'
import { onChangeStore } from '../redux/store'


class LoadingScreen extends React.Component {

    componentDidMount(){
        this.fetchData()
    }

    fetchData = async() => {
        await this.props.fetchCategories({ uid : this.props.uid })
        onChangeStore()
        if (this.props.categories.length > 0){
            this.props.navigation.navigate('TasksListScreen')
        } else {
            this.props.navigation.navigate('AddCategoryScreen', { back : false })
        }
    }

    render() {
        return(
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" />
            </View>
        )          
    }
} 

LoadingScreen.propTypes = {
   categories : PropTypes.array,
   uid : PropTypes.string,
   navigation : PropTypes.object,
}

const mapStateToProps = state =>({
    categories : state.categories.allIds,
    uid : state.user.uid,
})

export default connect(mapStateToProps, { fetchCategories })(LoadingScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})

