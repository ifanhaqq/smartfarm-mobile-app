import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import UserContext from 'src/contexts/AuthContext';
import { AuthService } from 'src/services/AuthService';
import CloudHeader from 'src/components/CloudHeader';

const ProfileScreen: React.FC = () => {

    const { user, setUser } = useContext(UserContext)
    const authService: AuthService = new AuthService();

    async function handleLogout() {
        try {
            await authService.logout();
        } catch (error) {
            console.log(error)
        }

        console.log("logout");
        setUser(null);
    }

    return (
        <ImageBackground
            source={require('../assets/background-screen.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <CloudHeader></CloudHeader>
            <ScrollView style={styles.container}>
                <View style={styles.containerItem}>
                    <Image source={require('../assets/field.png')} style={styles.profileImage}></Image>
                    <View style={styles.boxItem}>
                        <View style={styles.wrapItem}>
                            <Text style={styles.textNumber}>3</Text>
                            <Text style={styles.text}>Lahan</Text>
                        </View>
                        <View style={styles.wrapItem}>
                            <Text style={styles.textNumber}>3</Text>
                            <Text style={styles.text}>Lahan</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
                        <Text style={{ textAlign: 'center', paddingVertical: 5, color: '#fff', fontSize: 22 }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,

    },
    container: {
        flex: 1,

    },
    profileImage: {
        borderRadius: 400,
        width: 100,
        height: 100,
        margin: '10%',
        alignSelf: 'center',

    },
    containerItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: '10%',
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        borderRadius: 30,
    },
    boxItem: {
        flexDirection: 'row',
        backgroundColor: 'white',

        borderRadius: 20,
        padding: '5%', 
    },
    wrapItem: {
        alignSelf: 'center',
        flexDirection: 'column',
        margin: '2%',
        width: '60%',
    },
    text: {
        color: '#0F2652',
        textAlign: 'center', 
    },
    textNumber: {
        color: '#0F2652',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'semibold',
    },
    loginButton: {
        marginTop: 40,
        marginHorizontal: 90,
        backgroundColor: '#b82222',
        borderRadius: 20
    },
});

export default ProfileScreen;