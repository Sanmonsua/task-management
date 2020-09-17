import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import { AppLoading } from 'expo'
import * as Font from 'expo-font'

import TaskListScreen from './screens/TaskListScreen'
import AddTaskScreen from './screens/AddTaskScreen'
import AddCategoryScreen from './screens/AddCategoryScreen'
import EditTaskScreen from './screens/EditTaskScreen'
import AuthScreen from './screens/AuthScreen'

import FlashMessage from "react-native-flash-message"

const Stack = createStackNavigator()

export default class App extends React.Component {
  state = {
    isReady : false,
  }

  loadAssetsAsync = async () => {
    const fonts = await Font.loadAsync({
      kumbhSans : require('./assets/fonts/KumbhSans-Regular.ttf'),
      kumbhSansBold : require('./assets/fonts/KumbhSans-Bold.ttf'),
    })

    return Promise.all(fonts)
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthScreen">
              <Stack.Screen
                component={AuthScreen}
                name="AuthScreen"
                options={{headerShown:false}}
              />
              <Stack.Screen 
                component={TaskListScreen} 
                name="TasksListScreen"
                options={{headerShown:false}}
              />
              <Stack.Screen 
                component={AddTaskScreen}
                name="AddTaskScreen"
                options={{headerShown:false}}
              />
              <Stack.Screen 
                component={EditTaskScreen}
                name="EditTaskScreen"
                options={{headerShown:false}}
              />
              <Stack.Screen 
                component={AddCategoryScreen}
                name="AddCategoryScreen"
                options={{headerShown:false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <FlashMessage 
            ref="myLocalFlashMessage" 
            textStyle={{fontFamily:'kumbhSans'}}
            titleStyle={{fontFamily:'kumbhSansBold'}}
          />
        </PersistGate>
        
      </Provider>
      
    );
  }
}