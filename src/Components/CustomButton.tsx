// import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

// interface CustomButtonProps {
//     title : string;
//     onPress: () => void;
//     backgroundColor? : string;
//     pressedColor? : string;
//     textColor? : string;
//     style? : string;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({title,onPress,backgroundColor="#2196ff",textColor="black",style}) => {
//   return (
//     <Pressable style={({pressed}) =>{
//         style.button,{backgroundColor:pressed? pressedColor : backgroundColor},
//         style;
//     }} 
//     onPress={onPress}
//     >
//       <Text>CustomButton</Text>
//     </Pressable>
//   )
// }

// <CustomButton
// title='Login'
// onPress={ () =>{ console.log("asjkjk");
// }}
// pressedColor="red"
//         backgroundColor='black'        
// />

// export default CustomButton

// const styles = StyleSheet.create({
//     button:{
//         paddingVertical:10,
//         paddingHorizontal:20,
//         borderRadius:5,
//         alignItems:'center',
//         justifyContent:'center',
//     },
//     buttonPressed:{
//        backgroundColor:'red',

//     },
//     buttonText:{
//         fontSize:16,
//         fontWeight:'500'
//     }
// })