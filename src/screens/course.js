import React, {Component} from 'react';
import {Platform, FlatList,Linking,findNodeHandle,TouchableOpacity,StyleSheet, StatusBar, View,Image,Text,TextInput} from 'react-native';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from '../common/style';
import { Dropdown } from 'react-native-material-dropdown';


const { styles } = Styles;

var self= null;
export default class CourseScreen extends Component {
  constructor(props) {
    super(props);
    self = this;    
    const {state} = props.navigation;    
    this.state = {
        isVisibleSpin:false,        
        refreshing:false,
        selectedItems:[],
        learnLang:state.params.learnLang, 
        currentData:[],
        currentLevel:0,
        courseData:[
          {name:'Core Vocabulary',childs:[
              {name:'Agriculture',childs:[
                {name:'Lesson 1',childs:[]},
                {name:'Lesson 2',childs:[]},
              ]},
              {name:'Animals',childs:[
                {name:'Lesson 1',childs:[]},
                {name:'Lesson 2',childs:[]},
              ]},
              {name:'Arts',childs:[
                {name:'Lesson 1',childs:[]},
                {name:'Lesson 2',childs:[]},
              ]},
              {name:'Botany',childs:[]},
              {name:'Buildings',childs:[]},
              {name:'Buildings | Components',childs:[]},
              {name:'Buildings | Materials',childs:[]},
              {name:'Business',childs:[]},
              {name:'Business | Finance',childs:[]},
              {name:'Celebrations',childs:[]},
              {name:'Cities',childs:[]},
              {name:'Clothes',childs:[]},
              {name:'Clothes | Accessories',childs:[]},
              {name:'Colors',childs:[]},
              {name:'Comparisons',childs:[]},
              {name:'Computing',childs:[]},
              {name:'Crime',childs:[]},
              {name:'Determiners',childs:[]},
            ]
          },
          {name:'Essential Verbs',childs:[
              {name:'AGREE',childs:[]},
              {name:'APOLOGIZE',childs:[]},
              {name:'ARGUE',childs:[]},
              {name:'ARRIVE',childs:[]},
              {name:'ASK',childs:[]},
              {name:'BE | Components',childs:[]},
              {name:'BRING',childs:[]},
              {name:'BUILD',childs:[]},
              {name:'BUY',childs:[]},
              {name:'CALL',childs:[]},
              {name:'CARRY',childs:[]},
              {name:'CELEBRATE',childs:[]},
              {name:'CHANGE',childs:[]},
              {name:'CHAT',childs:[]}              
            ]
          },
          {name:'Creating Sentences',childs:[
              {name:'with the verb "Agree"',childs:[]},
              {name:'with the verb "Apologize"',childs:[]},
              {name:'with the verb "Argue"',childs:[]},
              {name:'with the verb "Arrive"',childs:[]},
              {name:'with the verb "Ask"',childs:[]},
              {name:'with the verb "Be"',childs:[]},
              {name:'with the verb "Bring"',childs:[]},
              {name:'with the verb "Build"',childs:[]},
              {name:'with the verb "Buy"',childs:[]},
              {name:'with the verb "Call"',childs:[]},
              {name:'with the verb "Carry"',childs:[]},
              {name:'with the verb "Celebrate"',childs:[]},
              {name:'with the verb "Change"',childs:[]},
              {name:'with the verb "Chat"',childs:[]}              
            ]
          },
          {name:'Powerful Phrases',childs:[
              {name:'Absolutely Essential Expressions"',childs:[]},
              {name:'Airport"',childs:[]},
              {name:'Appointments"',childs:[]},
              {name:'Bar"',childs:[]}         
            ]
          },
        ],        
    }    
  }
  componentDidMount()
  {
    this.setState({currentData:this.state.courseData});
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
                        <Image style={{width:35,height:35}} resizeMode='stretch' source={require('../assets/icon_trans.png')}/>
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
      if (item.childs.length == 0)
      {
          this.props.navigation.navigate('PlayScreen');
      }
      else
      {
          var selItems = this.state.selectedItems;
          var data = {};
          data.level = this.state.currentLevel;
          data.index = index;
          data.name = item.name;
          var upLevel = this.state.currentLevel + 1;
          selItems.push(data);
          this.setState({selectedItems:selItems,currentLevel:upLevel,currentData:item.childs});
      }
  }
  clickBackItem(value,index)
  {
    var items = this.state.selectedItems;
    for (i = this.state.selectedItems.length-1;i >=index ;i--)
    {
      items.splice(i,1);
    }
    var data = this.state.courseData;
    for (i = 0;i < index;i++)
    {
      data = this.state.courseData[this.state.selectedItems[i].index].childs;
    }
    this.setState({selectedItems:items,currentData:data});
  }
  renderSelectedItems()
  {
    return (        
            self.state.selectedItems.map((value,index) => (
                <TouchableOpacity key={'course' + index} onPress={()=>this.clickBackItem(value,index)}>
                  <View>            
                      <View style={{backgroundColor:'#1E2831',flexDirection:'row',alignItems:'center',padding:10}}>                                                         
                          <View style={{marginLeft:20 * index,flex:1}}>
                              <Text style={[styles.whiteColor,{fontSize:18}]}>{value.name}</Text>
                              
                          </View>
                      </View>
                      <View style={{backgroundColor:'#323E49',height:1}}></View>            
                  </View>        
              </TouchableOpacity>                              
            ))        
    );    
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
                <View style={[{position:'absolute',alignItems:'center'}]}>
                    <TouchableOpacity>
                        <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                            <Text style={[styles.textColorBlue,{fontSize:18,textAlign:'center'}]}>{this.state.learnLang}</Text>                            
                        </View>
                    </TouchableOpacity>
                </View> 
            </View>
            <View style={{backgroundColor:'#323E49',height:1}}></View>
            <View style={{flex:1}}> 
                <View style={{marginTop:10,marginBottom:10}}>                  
                  {this.renderSelectedItems()}                  
                </View>
                <FlatList              
                  data={this.state.currentData}
                  renderItem={({item,index}) => this.renderLessonItem(item,index)}
                  keyExtractor={(item, index) => index.toString()}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                  style={{flex:1}}
                />
            </View>            
            {this.renderLoading()}
        </View>      
    );
  }
}