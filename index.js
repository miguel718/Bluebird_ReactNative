/**
 * BuzzBus React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';

import SplashFirstScreen from './src/screens/splash';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import HomeScreen from './src/screens/home';
import CourseScreen from './src/screens/course';
import PlayScreen from './src/screens/play';
import LearnScreen from './src/screens/learn';

// global.__DEV__=false;
const Routes = StackNavigator({
	SplashFirstScreen: {screen:SplashFirstScreen, navigationOptions:{header:true,gesturesEnabled: false}},
	LoginScreen: {screen:LoginScreen, navigationOptions:{header:true,gesturesEnabled: false}},        
    RegisterScreen: {screen:RegisterScreen, navigationOptions:{header:true,gesturesEnabled: false}},          
    HomeScreen: {screen:HomeScreen, navigationOptions:{header:true,gesturesEnabled: false}},          
    LearnScreen: {screen:LearnScreen, navigationOptions:{header:true,gesturesEnabled: false}},          
    CourseScreen: {screen:CourseScreen, navigationOptions:{header:true,gesturesEnabled: false}},          
    PlayScreen: {screen:PlayScreen, navigationOptions:{header:true,gesturesEnabled: false}},          

})
//TrackPlayer.registerEventHandler(require('./src/components/RemoteControlHandler.js'));
AppRegistry.registerComponent('Bluebird', () =>  Routes);
