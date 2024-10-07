import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { Shadow } from 'react-native-shadow-2'
import { Icon } from 'react-native-elements';
import UserContext from 'src/contexts/AuthContext';
import { AuthService } from 'src/services/AuthService';

const LoginScreen: React.FC = () => {

    const userContext = useContext(UserContext);
    const { setUser } = userContext;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const authService: AuthService = new AuthService();

    async function handleLogin() {
        setErrors({});

        try {
            const token = await authService.login({
                email,
                password,
                device_name: `${Platform.OS} ${Platform.Version}`
            })

            const user = await authService.loadUser(token);
            console.log(user)

            setUser(user);
            
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }

            console.log(error)
        }
    }

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
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        
                    >
                    </TextInput>
                    <Text style={styles.passwordLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder='Password'
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        >
                        </TextInput>
                        <Text style={styles.showIcon}>Show</Text>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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