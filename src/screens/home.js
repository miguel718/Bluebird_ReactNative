import React, {Component} from 'react';
import {Platform, FlatList,Linking,findNodeHandle,TouchableOpacity,StyleSheet, StatusBar, View,Image,Text,TextInput} from 'react-native';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from '../common/style';
import { Dropdown } from 'react-native-material-dropdown';


const { styles } = Styles;

var self= null;
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    self = this;    
    const {state} = props.navigation;    
    this.state = {
        speakLang:'',
        learnLang:'',
        isVisibleSpin:false,        
        refreshing:false,
        speakData:[{value:'English'},{value:'Spanish'},{value:'French'}],
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

  onChangeSpeak(item)
  {
    self.setState({speakLang:item})    
    self.props.navigation.navigate('LearnScreen',{speakLang:self.state.speakLang});
  }
  
  render() {    
    return (              
        <View style={[styles.bg,styles.flexFull]}>        
            <StatusBar hidden={true} />
            <View style={[styles.vwTopBar]}>
                <View style={{flex:1}}>
                    <TouchableOpacity style={{marginLeft:10,padding:10}} onPress={()=> this.openControlPanel()}>
                        <Image style={{width:80,height:40}} resizeMode='stretch' source={require('../assets/ic_logo_300.png')}/>
                    </TouchableOpacity>
                </View>
                {
                /*<View style={{flex:1,alignItems:'flex-end'}}>
                    <TouchableOpacity style={{marginLeft:10,padding:10}} onPress={()=> this.props.navigation.navigate('QueueScreen',{userInfo:self.state.userInfo})}>
                        <Image style={[styles.img30]} source={require('../assets/ic_logout.png')}/>
                    </TouchableOpacity>
                </View>*/
                }
            </View>            
            <View style={{backgroundColor:'#323E49',height:1}}></View>
            <View style={{marginTop:32,marginLeft:20,marginRight:20,flex:1,marginBottom:20}}>
                <Text style={[styles.largeText]}>I speak...</Text>
                <Dropdown                  
                  data={this.state.speakData}
                  textColor="#3D87AA"
                  baseColor="#3D87AA"
                  onChangeText={this.onChangeSpeak}
                  fontSize={20}                  
                />                
                <View style={{flex:1,marginBottom:20}}>
                </View>

                <Text style={{fontSize:20,marginTop:10,marginBottom:20,textAlign:'center',color:'#fff'}}>Last time you were here, you were studying French</Text>

                <TouchableOpacity>
                  <Text style={[styles.btnPrimary,styles.whiteColor,{marginTop:5}]}>Resume this course</Text>
                </TouchableOpacity>
            </View>            
            {this.renderLoading()}
        </View>      
    );
  }
}