import React, {Component} from 'react';
import {Platform, FlatList,Linking,findNodeHandle,TouchableOpacity,StyleSheet, StatusBar, View,Image,Text,TextInput} from 'react-native';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from '../common/style';
import { Dropdown } from 'react-native-material-dropdown';


const { styles } = Styles;

var self= null;
export default class LearnScreen extends Component {
  constructor(props) {
    super(props);
    self = this;    
    const {state} = props.navigation;    
    this.state = {
        learnLang:'',
        isVisibleSpin:false,        
        refreshing:false,        
        learnData:[{value:'French'},{value:'Spanish'},{value:'English'}],
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
      bottom:0
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
  
  goCourse()
  {
    this.props.navigation.navigate('CourseScreen',{speakLang:this.state.speakLang,learnLang:this.state.learnLang});
  }

  onChangeLearn(item)
  {
    self.setState({learnLang:item})
    self.props.navigation.navigate('CourseScreen',{learnLang:self.state.learnLang});
  }
  
  render() {    
    return (              
        <View style={[styles.bg,styles.flexFull]}>        
            <StatusBar hidden={true} />
            <View style={[styles.vwTopBar]}>
                <View style={{flex:1}}>
                    <TouchableOpacity style={{padding:10}} onPress={()=> this.props.navigation.goBack()}>
                        <Image style={{width:25,height:25}} resizeMode='stretch' source={require('../assets/back-512.png')}/>
                    </TouchableOpacity>
                </View>                                 
            </View>           
            <View style={{backgroundColor:'#323E49',height:1}}></View>
            <View style={{marginTop:32,marginLeft:20,marginRight:20}}>                

                <Text style={[styles.largeText,{marginTop:10}]}>I want to learn...</Text>
                <Dropdown                  
                  data={this.state.learnData}
                  textColor="#3D87AA"
                  baseColor="#3D87AA"
                  onChangeText={this.onChangeLearn}
                  fontSize={20}                  
                />

            </View>            
            {this.renderLoading()}
        </View>      
    );
  }
}