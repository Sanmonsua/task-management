import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import Constants from 'expo-constants'
import Task from '../components/Task'
import CategoryButton from '../components/CategoryButton'
import AddCategoryButton from '../components/AddCategoryButton'
import EmptyCategory from '../components/EmptyCategory'
import { connect } from 'react-redux'

class TaskListScreen extends React.Component {

  state = {
    selectedCategoryId : 1,
    category : this.props.categories.byIds["1"]
  }


  renderTask = ({item, index}) => {

    const onPressTask = () =>{
      let tasks = this.state.category.tasks
      tasks[index].done = !this.state.category.tasks[index].done
      this.setState({
        category : {... this.state.category, tasks} 
      })
    }

    return (
      <Task 
        item={item} 
        color={this.state.category.color} 
        onPress={onPressTask}
      />
    )
  }

  renderCategory = ({item}) => {
    return (
      <CategoryButton 
        name={this.props.categories.byIds[item].name} 
        color={this.props.categories.byIds[item].color}
        selected={item === this.state.selectedCategoryId}
        onPress={() => {
          this.setState({
            selectedCategoryId: item,
            category: this.props.categories.byIds[item],
          })
        }}
      />
    )
  }
  
  render(){

    return (

        <View style={styles.container}>
          <View style={styles.tasks}>
            <Text style={{... styles.textMuted, fontFamily : 'kumbhSansBold',}}>CATEGORY</Text>
            <View style={{width:"100%"}}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={{... styles.title, fontFamily : 'kumbhSansBold',}}>
                {this.state.category.name}
              </Text>
            </View>
            
            <FlatList
              data={this.state.category.tasks}
              keyExtractor={(item) => ""+item.id}
              renderItem={this.renderTask}
              ListEmptyComponent={EmptyCategory}
            />
            
            <TouchableOpacity 
              style={{... styles.addButton, backgroundColor: this.state.category.color}}
              onPress={()=>this.props.navigation.navigate("AddTaskScreen")}
              >
              <Text style={{... styles.addButtonLabel, fontFamily : 'kumbhSansBold',}}>+ ADD NEW TASK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categories}>
              <FlatList
                data={this.props.categories.allIds}
                keyExtractor={(item) => ""+this.props.categories.byIds[item].id}
                renderItem={this.renderCategory}
                extraData = {this.state.selectedCategoryId}
              />
              <AddCategoryButton/>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
})

export default connect(mapStateToProps)(TaskListScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
  },
  tasks: {
    backgroundColor: "white",
    width: "80%",
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  categories: {
    backgroundColor: "#222429",
    width: "20%",
    padding : 12,
    justifyContent : 'center',
  },
  textMuted: { 
    color: "#d1d9e4", 
    fontSize: 18,
  },
  title : {
    fontSize: 50, 
  },
  addButton : {
    alignSelf: "center",
    padding : 20,
    borderRadius : 15,
    width : '100%',
  }, 
  addButtonLabel : {
    alignSelf : 'center',
    color : 'white',
    fontSize : 17,
  },
});
