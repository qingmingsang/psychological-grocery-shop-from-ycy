import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Orientation from "react-native-orientation";
import Home from "./screens/Home";
import PageWriteLetter from "./screens/PageWriteLetter";
import SubTopic from "./screens/SubTopic";
import LetterPaper from "./screens/LetterPaper";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    WriteLetter: {
      screen: PageWriteLetter,
      navigationOptions: {
        header: null
      }
    },
    SubTopic: {
      screen: SubTopic,
      navigationOptions: {
        header: null
      }
    },
    LetterPaper: {
      screen: LetterPaper,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  componentWillMount() {
    Orientation.lockToLandscape();
  }

  render() {
    return <AppContainer />;
  }
}
