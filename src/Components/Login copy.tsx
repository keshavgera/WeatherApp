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
            <Text>Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => {
                    setName(text);
                    validateName(text);
                }}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                keyboardType="email-address"
                onChangeText={(text) => {
                    setEmail(text);
                    validateEmail(text);
                }}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                secureTextEntry
                onChangeText={(text) => {
                    setPassword(text);
                    validatePassword(text);
                }}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <Button title="Login" onPress={handleSubmit} />

            <View style={{ marginVertical: 20 }}>

                <Button title="Fetch API"
                    onPress={() => navigation.navigate('Todo')} />
            </View>

            <View style={{ marginVertical: 20 }}>
                <Button title="Todo Crud"
                    onPress={() => navigation.navigate('CRUD')} />
            </View>
           
            <View style={{ marginVertical: 20 }}>
                <Button title="Custom Modal"
                    onPress={() =>{setModalVisible(true)}} />
            </View>

            <Button title="WeatherApp"
                onPress={() => navigation.navigate('WeatherApp')} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button title="Show Modal" onPress={() => setModalVisible(true)} />
                <CustomModal
                    visible={isModalVisible}
                    title="Confirmation"
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                >
                    <Text>Are you sure you want to proceed?</Text>
                </CustomModal>
            </View>

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
