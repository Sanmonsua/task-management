import React from 'react'
import { Text } from 'react-native'
import * as GoogleSignIn from 'expo-google-sign-in'

export default class AuthScreen extends React.Component {
  state = { 
    user: null,
  }

  componentDidMount() {
    this.initAsync()
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync()
    this._syncUserWithStateAsync()
  }

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync()
    this.setState({ user, displayName:user.displayName })
  }

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null, displayName:'' })
  }

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync()
      const { type, user } = await GoogleSignIn.signInAsync()
      if (type === 'success') {
          alert('login:success')
        this._syncUserWithStateAsync()
      }
    } catch ({ message }) {
      alert('login: Error:' + message)
    }
  }

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync()
      console.log(this.state)
    } else {
      this.signInAsync(this.state)
    }
  }

  render() {
    return <Text onPress={this.onPress}>
        Toggle Auth {this.state.displayName}
        </Text>
  }
}