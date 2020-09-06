import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { category } from "./mockData"
import Constants from 'expo-constants'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import {Task, TaskCompleted} from './components/Task'

export default class App extends React.Component {

  state = {
    isReady : false,
  }

  loadAssetsAsync = async () => {
    const fonts = Font.loadAsync({
      roboto : require('./assets/fonts/Roboto/Roboto-Regular.ttf')
    })

    return Promise.all(fonts)
  } 

  renderItem = ({item}) => {
    if (item.done){
      return (
        <Task item={item} color={category.color}/>
      )
    }
    return (
      <TaskCompleted item={item} color={category.color}/>
    )
  }
  
  render(){

    if (!this.state.isReady) {
      return ( 
        <AppLoading
          startAsync = {this.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.tasks}>
          <Text style={styles.textMuted}>TASKS LIST</Text>
          <Text style={{... styles.title, fontFamily:'roboto'}}>
            {category.name}
          </Text>
          <FlatList
            data={category.tasks}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
          />
          <TouchableOpacity style={{... styles.addButton, backgroundColor: category.color}}>
            <Text style={styles.addButtonLabel}>+ ADD NEW TASK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}></View>
      </View>
    );
  }
}

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
  },
  textMuted: { 
    color: "#d1d9e4", 
    fontSize: 18,
    fontWeight : 'bold',
  },
  title : {
    fontSize: 50, 
    fontWeight: "bold",
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
    fontWeight: "bold",
    fontSize : 17,
  },
});
