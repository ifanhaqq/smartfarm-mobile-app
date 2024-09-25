import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Shadow } from 'react-native-shadow-2'
import { Icon } from 'react-native-elements';

const LoginScreen: React.FC = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const circles = [
        { size: 150, top: -20, left: 240, backgroundColor: 'rgba(154, 185, 225, 0.2)' },
        { size: 90, top: 0, left: 20, backgroundColor: 'rgba(154, 185, 225, 0.2)' },
        { size: 20, top: 60, left: 110, backgroundColor: 'rgba(154, 185, 225, 0.2)' },
        { size: 200, top: 600, left: -50, backgroundColor: 'rgba(154, 185, 225, 0.2)' },
        { size: 90, top: 570, left: 150, backgroundColor: 'rgba(154, 185, 225, 0.2)' },
        { size: 60, top: 650, left: 300, backgroundColor: 'rgba(154, 185, 225, 0.2)' },
    ];

    useFonts({
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            {circles.map((circle, index) => (
                <View
                    key={index}
                    style={[
                        styles.circle,
                        {
                            width: circle.size,
                            height: circle.size,
                            top: circle.top,
                            left: circle.left,
                            backgroundColor: circle.backgroundColor,
                        },
                    ]}
                />
            ))}
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
                    <Text style={styles.passwordLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder='Password'
                            secureTextEntry={!showPassword}
                        >
                        </TextInput>
                        <Text style={styles.showIcon}>Show</Text>
                    </View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={{textAlign: 'center', paddingVertical: 15, color: '#fff', fontFamily: 'Montserrat-Bold', fontSize: 22}}>Login</Text>
                    </TouchableOpacity>



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
        // position: 'absolute',
        // zIndex: 2
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
        borderRadius: 10
    },
    passwordInput: {
        width: 230,
        marginStart: 9
    },
    label: {
        paddingLeft: 13,
        marginTop: 30,
        fontFamily: 'Montserrat-Bold'
    },
    passwordLabel: {
        paddingLeft: 13,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold'
    },
    toggleButton: {

    },
    circle: {
        position: 'absolute',
        borderRadius: 100,
        // zIndex: 1
    },
    passwordContainer: {
        flex: 0,
        flexDirection: 'row',
        borderWidth: 1,
        marginHorizontal: 10,
        height: 40,
        justifyContent: 'space-between',
        borderRadius: 10
    },
    showIcon: {
        alignSelf: 'center',
        marginEnd: 5
    },
    loginButton: {
        marginTop: 40,
        marginHorizontal: 90,
        backgroundColor: '#2255B8',
        borderRadius: 20
    },
});

export default LoginScreen;