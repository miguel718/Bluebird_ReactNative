import React, {Component} from 'react';
import {Platform, CheckBox,findNodeHandle,TouchableOpacity,StyleSheet, StatusBar, View,Image,Text,TextInput} from 'react-native';
//import {Config} from '../doc/config';
//import DefaultPreference from 'react-native-default-preference';
import SplashScreen from 'react-native-splash-screen'
import Styles from '../common/style';
//import {serviceLogin} from '../api/organization/user';

const { styles } = Styles;

var self= null;
export default class SplashFirstScreen extends Component {
  constructor(props) {
    super(props);
    var timer;
    self = this;
    this.state = {     
      
    }

  }
  componentDidMount()
  {      
    SplashScreen.hide();
    setTimeout(() => {
        this.props.navigation.navigate('HomeScreen');        
    }, 2000);   
  }
  render() {
    return (
      <View style={[styles.bg,styles.flexFull]}>
        <StatusBar hidden={true} />
        {/* <Image style={[styles.bgImage,{position:'absolute'}]} source={require('../assets/login-background.png')}/> */}
        <View style={styles.vwLoginFrame}>
            <Image style={styles.loginLogo} resizeMode="stretch" source={require('../assets/logo_center.png')}/>
        </View>        
      </View>
    );
  }
}
