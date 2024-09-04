import { StyleSheet, Text,Button, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const DetailsScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const { name, email } = route.params;
        setName(name)
        setEmail(email)
    }, [])
    

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Details Screen</Text>
        <Text style={styles.text}>{"Name is :- "+name}</Text>
        <Text style={styles.text}>{"Email is :- "+email}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
};

export default DetailsScreen

const styles = StyleSheet.create({
  container:{ 
    flex: 1, justifyContent: 'center', alignItems: 'center' 
  },
  text:{
    color:'black',
    fontSize:16,
    marginBottom:5,
  }
})