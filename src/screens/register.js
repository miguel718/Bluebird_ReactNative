import React, {Component} from 'react';
import {KeyboardAvoidingView,Platform, CheckBox,findNodeHandle,TouchableOpacity,StyleSheet, StatusBar, View,Image,Text,TextInput} from 'react-native';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';
import {Config} from '../doc/config';
import Styles from '../common/style';

const { styles } = Styles;

var self= null;
export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    var timer;
    self = this;
    this.state = {      
      userEmail: '',
      userPw: '',
      userConfirmPw:'',
      errorTitle:'Error',
      errorContent:'',
      isVisibleErr:false,
      isVisibleSpin:false,
      userInfo:{}
    }

  }
  componentDidMount()
  {

  } 

  spinnerStyle = function () {
    return {
      alignSelf:'center',
      justifyContent:'center',
      position:'absolute',
      top:0,
      bottom:0,
      left:0,right:0
    }
  }


  renderLoading = () => {
        if (this.state.isVisibleSpin)
            return (
                <View style={this.spinnerStyle()}>
                    <Spinner visible={true}/>
                </View>
            );
        else
            return null;
    }


  
  erroOK()
  {
    this.setState({
      isVisibleErr:false
    });
  }

  goLogin()
  {
    this.props.navigation.goBack();
  }

  goHome()
  {
    this.props.navigation.navigate('HomeScreen');
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={[styles.bg,styles.flexFull]} behavior="padding" enabled>
        <StatusBar hidden={true} />
        <View style={styles.vwLoginFrame}>
            <Image style={styles.loginLogo} resizeMode="stretch" source={require('../assets/logo_center.png')}/>
        </View>
        <View style={styles.vwLoginFrame}>
            <TextInput style={[styles.inputForm,styles.widthFullMargine20,{paddingLeft:10}]} value={this.state.userEmail} placeholder="Email Address" onChangeText={(text) => this.setState({userEmail:text})}/>
            <TextInput secureTextEntry={true} value={this.state.userPw} style={[styles.inputForm,styles.widthFullMargine20,{marginTop:1,paddingLeft:10}]} placeholder="Password" onChangeText={(text) => this.setState({userPw:text})}/>
            <TextInput secureTextEntry={true} value={this.state.userConfirmPw} style={[styles.inputForm,styles.widthFullMargine20,{marginTop:1,paddingLeft:10}]} placeholder="Confirm Password" onChangeText={(text) => this.setState({userConfirmPw:text})}/>
            <TouchableOpacity onPress={()=> this.login()}>
                <Text style={[styles.btnPrimary,styles.widthFullMargine20,styles.whiteColor,{marginTop:5}]}>Sign Up</Text>
            </TouchableOpacity>
            <View style={[styles.widthFullMargine20,{flexDirection:'row'}]}>
              <TouchableOpacity onPress={()=> this.goLogin()}>
                  <Text style={[{color:'#768189',marginTop:10}]}>Already have account</Text>
              </TouchableOpacity>
              <View style={{flex:1}}>
              </View>
              {/*<TouchableOpacity onPress={()=> this.forgetPassword()}>
                  <Text style={[{color:'#768189',marginTop:10}]}>Forgot Password?</Text>
              </TouchableOpacity>*/}
            </View>
        </View>
        <Dialog.Container visible={this.state.isVisibleErr}>
          <Dialog.Title>{this.state.errorTitle}</Dialog.Title>
          <Dialog.Description>
            {this.state.errorContent}
          </Dialog.Description>
          <Dialog.Button label="OK" onPress={()=> this.erroOK()}/>
        </Dialog.Container>
        {this.renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}
