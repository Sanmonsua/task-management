import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { category } from "./mockData";

export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.tasks}>
          <Text style={styles.textMuted}>TASKS LIST</Text>
          <Text style={styles.title}>
            {category.name}
          </Text>
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
    fontSize: 18 
  },
  title : {
    fontSize: 50, 
    fontWeight: "bold"
  }
});
