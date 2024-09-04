import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import apiclient from '../Api/apiclient';

type Posts ={
    userId : number;
    id : number;
    title : string;
    body : string;
}

const TodoList: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {

    const [data, setdata] = useState<Posts[]>([])
    const [loading, setLoading] = useState<boolean>(true)
   

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await apiclient.get<Posts[]>('/posts');
            setdata(response.data);
          } catch (error) {
            console.error('Failed to fetch posts request error :- ', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPosts();
      }, []);
    
      if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
      }
     
 
    const onRenderItem = ({item,index}: {item:Posts, index:number}) => {
        return (
            <View style={styles.postItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )
      }
 
    return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={onRenderItem}
        keyExtractor={(item) => item.id.toString() }
      />
     
    </View>
  )
}

export default TodoList

const styles = StyleSheet.create({
    container:{
        flex:1, 
        paddingBottom:20,
        marginHorizontal:20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    postItem: {
        marginBottom: 15,
        padding: 15,
        // backgroundColor: '#f8f8f8',
        borderRadius: 8,
        borderBottomWidth:1,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      body: {
        fontSize: 14,
        marginTop: 5,
      },
})