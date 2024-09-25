import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import { Shadow } from 'react-native-shadow-2'
import { Icon } from 'react-native-elements';

const LoginScreen: React.FC = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    useFonts({
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <Shadow
                startColor={'#00000020'}
                sides={{ start: true, bottom: true, end: false, top: false }}
                distance={15}
            >
                <View style={styles.loginContainer}>
                    <Text style={styles.mainText}>Hello, Farmers!</Text>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                    >
                    </TextInput>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={!showPassword}
                    >
                    </TextInput>
                    <Icon name='eye'
                    color='black'
                    size={30}
                    style={styles.icon}
                ></Icon>
                </View>
            </Shadow>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',

    },
    icon: {
        marginLeft: 10,
    },
    loginContainer: {
        height: 400,
        width: 300,
    },
    mainText: {
        color: '#2255B8',
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        paddingTop: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    label: {
        paddingLeft: 10,
        marginTop: 30
    },
    toggleButton: {

    }
});

export default LoginScreen;