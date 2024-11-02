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
                            <Text style={styles.text}>IOt Sensor</Text>
                        </View>
                    </View>

                    <View style={styles.dataUser}>
                        <View style={{ flexDirection: 'row' }}>
                           <Text style={[styles.text, styles.align]}>Nama Lengkap</Text>
                           <Text style={[styles.text, styles.align]}>petani1</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                           <Text style={[styles.text, styles.align]}>Email</Text>
                           <Text style={[styles.text, styles.align]}>farmer@mail.com</Text>
                        </View>

                        <View style={{ flexDirection:'row' , marginTop: '15%',}}>
                            <TouchableOpacity style={styles.loginButton}  >
                                <Text style={{ textAlign: 'center', paddingVertical: 5, color: '#fff', fontSize: 22 }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
                                <Text style={{ textAlign: 'center', paddingVertical: 5, color: '#fff', fontSize: 22 }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '15%',
        paddingBottom: '10%',
        borderRadius: 30,
    },
    boxItem: {
        backgroundColor: 'white',
        paddingLeft: '10%',
        paddingRight: '20%',
        flexDirection: 'row',
        borderRadius: 20,
        margin: '5%',
    },
    wrapItem: {
        flexDirection: 'column',
        width: '60%', 
        padding: '2%',
    },
    text: {
        color: '#2255B8',
        textAlign: 'center',

    },
    align:{
        marginEnd: '40%',
        marginBottom: '5%',
    },
    textNumber: {
        color: '#2255B8',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'semibold',
    },
    dataUser: {
        backgroundColor: 'white',
       margin: '5%',
       padding: '4%',
        borderRadius: 20,
        flex:1,
        width: '90%',

    },

    loginButton: {
        backgroundColor: '#b82222',
        width: '50%',
        borderRadius: 20, 
        marginEnd: '2%',
    },
});

export default ProfileScreen;