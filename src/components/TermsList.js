import React, {useEffect,useContext,useState } from 'react';
import { View, Text,FlatList,StyleSheet ,StatusBar,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';
import { event } from 'react-native-reanimated';
import ThemeContext from "../utils/ThemeContext";


const TermsList = ({ terms , search, navigation }) => {
    const  theme = useContext(ThemeContext);
    const terms_length = terms.length;
   
    const[bookmarked,setBookmarked] = useState([]);
    const [loading,setLoading] = useState(true);

    const [scrollPosition,setScrollPosition]= useState(0);
    const [position,setPosition] = useState(0);

 

    
    useEffect(()=>{
      getBookmarkedTerms();
      navigation.addListener('focus', () => { setLoading(!loading); setScrollPosition(0)});    
  
    },[navigation,loading]); 

    const getBookmarkedTerms = async ()=> {
      const favoriteTerms = [];
      await firestore()
      .collection('Bookmarks')
      .where('userID','==', auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
       querySnapshot.forEach(doc => {
           const {termID} = doc.data();
           favoriteTerms.push( 
            
             termID
    
           );
    
       });
       
       setBookmarked(favoriteTerms);
        if (loading) {
          setLoading(false);
        }
      
     
       
       
      }).catch(e =>console.log(e))
            
    }



    const unbookmarkIT = async (docToDelete) => {
      try {
        await firestore()
        .collection('Bookmarks')
        .doc(docToDelete)
        .delete()
        .then(() => {
          setBookmarked([]);
          
          });

          if (loading) {
            setLoading(false);
          
          }
           
    }
    catch(e) {
    console.log(e);
    
    }

    }

    const bookmarkIT =async (name,description,termID)=> {

      try {
        await firestore().collection('Bookmarks').doc(termID)
        .set({
            name: name,
            description: description,
            termID : termID,
            userID: auth().currentUser.uid
    
        })
    
        .then(() => {
          if (loading) {
            setLoading(false);
          }
           
        });
    }
    catch(e) {
    console.log(e);
    
    }

    }

    const Item = ({id, name, description, index}) => {
      

      return (
        <View style={[styles.item,{borderColor:theme.section_bordercolor,backgroundColor:theme.section_backgroundcolor}]} key={id} index={index} >
            <Text value={name} numberOfLines={2} style={styles.name}>{name}</Text>
            <Text value={description}  style={styles.description}>{description}</Text>
            <View  style={{marginRight:5,marginTop:10,alignItems:'flex-end'}}>
             
            {
            !bookmarked.includes(id)?<TouchableOpacity onPress={() => {bookmarkIT(name,description,id); setLoading(true); setScrollPosition(index);}}><Ionicons name='bookmark-outline' size={27} color='#AD40AF' /></TouchableOpacity>:<TouchableOpacity onPress={() =>{unbookmarkIT(id); setLoading(true); setScrollPosition(index)}}><Ionicons name='bookmark-sharp' size={27} color='#AD40AF' /></TouchableOpacity>
            } 
                  
            </View>
        </View>
      );
    }
    

   

    const RenderItem = ({ item,index }) => {

      if(search === "" || item.name.toString().toUpperCase().includes(search.toString().toUpperCase()))

      {
        

        return <Item  id={item.id} name={item.name} description={item.description} index={index}  />;
     
      }
 
    };

    const NotFound = () => {
      return (
     <View>
      <Text>Sorry, we didn't find anything matching your search.</Text>
     </View>
      )
    };
     if(loading)
     {
      return <ActivityIndicator />
     }
     else {

      return (
        
 
          <FlatList
            initialScrollIndex={scrollPosition}
            data={terms}
            renderItem={loading?<ActivityIndicator />:RenderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent ={NotFound}
    
          />
       
       
      ) };
      
      }    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0
      
    },
    item: {
      padding: 15,
      marginVertical: 8,
      borderWidth:1,
      borderRadius:14,
   
    },
    name: {
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      marginBottom:15,
      color:'#333'
    },
    description :{
      fontSize:16,
      fontFamily: 'Roboto-Regular',
      textAlign:'justify',
      color:'#333'
    }
  });
  

export default TermsList;