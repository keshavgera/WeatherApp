import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import CustomModal from './CustomModal';

const Login: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {

    // State for form fields
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // State for error messages
    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');


    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleConfirm = () => {
        // Handle confirm action
        setModalVisible(false);
    };

    // Validation logic
    const validateName = (value: string) => {
        if (!value) {
            setNameError('Name is required.');
        } else {
            setNameError('');
        }
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError('Email is required.');
        } else if (!emailRegex.test(value)) {
            setEmailError('Please enter a valid email.');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (value: string) => {
        if (!value) {
            setPasswordError('Password is required.');
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
        } else {
            setPasswordError('');
        }
    };

    // Form submission handler
    const handleSubmit = () => {
        validateName(name);
        validateEmail(email);
        validatePassword(password);

        if (!nameError && !emailError && !passwordError && name && email && password) {
            // Alert.alert('Form Submitted', `Name: ${name}\nEmail: ${email}`);
            navigation.navigate('Details', { name: name, email: email })
        } else {
            Alert.alert('Form Invalid', 'Please fix the errors before submitting.');
        }
    };

    return (
        <View style={styles.container}>


            <Button title="fetch api "
                onPress={() => navigation.navigate('WeatherApp')} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;
