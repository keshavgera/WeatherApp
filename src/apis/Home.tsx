import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

type Posts = {
    name: string;
    age: number;
    qualification: string;
    img: string;
}


const Home = () => {

    const [data, setData] = useState<Posts[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        
        const  fetchData = async()=>{
            const url = "https://dummyjson.com/c/0fc1-c33e-4f3b-9d47";

            const res= await fetch(url)

            const data = await res.json();
            console.log("Res ", data);
            setData(data.employees)
            setLoading(false);
        }
        
        fetchData();

    }, [])

    const onRenderItem = ({item,index}: {item:Posts, index: number}) => {
        return (
            <View style={{marginTop:20, minHeight:20, marginHorizontal:20, backgroundColor:'white', padding:10,}}>
                <Text>{item.name}</Text>
                <Text>{item.age}</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingBottom: 20, backgroundColor: 'grey' }}>

            <FlatList
                data={data}
                renderItem={onRenderItem}
                // keyExtractor={(item) ={item.age.toString()}}
            />

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingBottom:20,
        backgroundColor:'red'
    }
})