import React, {Component} from 'react';
import {Platform, Slider,FlatList,Linking,findNodeHandle,TouchableOpacity,StyleSheet, StatusBar, View,Image,Text,TextInput} from 'react-native';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from '../common/style';
import { Dropdown } from 'react-native-material-dropdown';
import SeekBar from '../components/SeekBar';
import Controls from '../components/Controls';
import Video from 'react-native-video';



const { styles } = Styles;

var self= null;
export default class PlayScreen extends Component {
  constructor(props) {
    super(props);
    self = this;    
    const {state} = props.navigation;    
    this.state = {
        isVisibleSpin:false,        
        refreshing:false,
        paused: true,
        totalLength: 1,
        currentPosition: 0,
        selectedTrack: 0,
        repeatOn: false,
        shuffleOn: false,
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
  
  renderLessonItem(item,index)
  {   
      var backColor = "#263440";   
      if (index % 2 == 1)
      {
          backColor = '#25313C';
      }      
      return(
        <TouchableOpacity onPress={()=>this.clickItem(item,index)}>
            <View>            
                <View style={{backgroundColor:backColor,flexDirection:'row',alignItems:'center',padding:10}}>                
                    <View>
                        <Image style={{width:35,height:35}} resizeMode='stretch' source={require('../assets/ic_wave.png')}/>
                    </View>                
                    <View style={{marginLeft:10,flex:1}}>
                        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                            <Text style={[styles.whiteColor,{fontSize:18}]}>{item.name}</Text>
                        </View>                        
                    </View>
                </View>
                <View style={{backgroundColor:'#323E49',height:1}}></View>            
            </View>        
        </TouchableOpacity>
      );
  }
  handleRefresh()
  {
        //self.setState({refreshing:true});        
  }
  renderSeparator()
  {
    return(
        <View style={{backgroundColor:'#323E49',height:1}}>
          
        </View>
      );
  }
  clickItem(item,index)
  {

  }

  seek(time) {

  }

  onBack() {

  }

  onForward() {
    
  }
  setTime(data) {
    //console.log(data);
    //this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  setDuration(data) {
    // console.log(totalLength);
    //this.setState({totalLength: Math.floor(data.duration)});
  }
  onSlidingStart()
  {

  }
  render() {
    const video = this.state.isChanging ? null : (
      <Video source={{uri: ''}} // Can be a URL or a local file.
        ref="audioElement"
        paused={this.state.paused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );
    
    return (              
        <View style={[styles.bg,styles.flexFull]}>        
            <StatusBar hidden={true} />
            <View style={[styles.vwTopBar]}>
                <View style={{flex:1}}>
                    <TouchableOpacity style={{padding:10}} onPress={()=> this.props.navigation.goBack()}>
                        <Image style={{width:25,height:25}} resizeMode='stretch' source={require('../assets/back-512.png')}/>
                    </TouchableOpacity>
                </View>                
                <View style={[{position:'absolute',alignItems:'center'}]}>
                    <TouchableOpacity>
                        <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                            <Text style={[styles.textColorBlue,{fontSize:18,textAlign:'center'}]}>French: Core Vocabulary</Text>                            
                        </View>
                    </TouchableOpacity>
                </View> 
            </View>
            <View style={{backgroundColor:'#323E49',height:1}}></View>
            <View style={{flex:1,justifyContent:'center'}}>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Image style={{width:100,height:100,margin:10}} resizeMode='stretch' source={require('../assets/icon_trans.png')}/>
              </View>
              <Text style={[styles.textColorBlue,{fontSize:18,textAlign:'center',marginTop:10}]}>Agriculture: Lesson 1</Text>                                
              <Slider style={{marginTop:10,marginLeft:10,marginRight:10,marginBottom:10}}/>       
              <Controls
                onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
                repeatOn={this.state.repeatOn}
                shuffleOn={this.state.shuffleOn}
                onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
                onPressPlay={() => this.setState({paused: false})}
                onPressPause={() => this.setState({paused: true})}
                onBack={this.onBack.bind(this)}
                onForward={this.onForward.bind(this)}
                paused={this.state.paused}/>
                {video}               
                <TouchableOpacity style={{marginTop:20}}>
                  <Text style={[styles.btnPrimary,styles.widthFullMargine20,styles.whiteColor,{marginTop:5}]}>Download</Text>
              </TouchableOpacity>
            </View>            
            {this.renderLoading()}
        </View>      
    );
  }
}