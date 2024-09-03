import { configure } from "@testing-library/react-native";
import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import { useNavigation } from '@react-navigation/native';

// create an axios instanse
const apiclient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 12000,
})

// request 
apiclient.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig =>{
    console.log("K_____  Axios interceptors request ", config);

    return config;
    },
    (error:AxiosError) : Promise<AxiosError> =>{
        console.log("K_____  Axios interceptors request error ", error);
        return Promise.reject(error);
    }
)

// response 
apiclient.interceptors.response.use((response: AxiosResponse): AxiosResponse =>{
    console.log("K_____  Axios interceptors response ", response);

    return response;
    },
    (error:AxiosError) : Promise<AxiosError> =>{
        console.log("K_____  Axios interceptors response error ", error);

        if (error.response?.status === 401) {
            console.log('K_____ Unauthorized, redirecting to login...');
      
            const navigation = useNavigation();
            // navigation.navigate('LoginScreen');    
          }

        return Promise.reject(error);
    }
)

export default apiclient;