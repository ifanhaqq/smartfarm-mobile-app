import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import UserContext from 'src/contexts/AuthContext';
import { AuthService } from 'src/services/AuthService';
import CloudHeader from 'src/components/CloudHeader';
import FieldContext from 'src/contexts/FieldContext';

const ProfileScreen: React.FC<{ navigation: any }> = ( { navigation } ) => {

    const { user, setUser } = useContext(UserContext);
    const { field, setField} = useContext(FieldContext);
    console.log(field)
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
                    <Image source={require('../assets/vector-profile.png')} style={styles.profileImage}></Image>
                    <View style={styles.boxItem}>
                        <View style={styles.wrapItem}>
                            <Text style={styles.textNumber}>{field.length}</Text>
                            <Text style={styles.text}>Lahan</Text>
                        </View>
                        <View style={styles.wrapItem}>
                            <Text style={styles.textNumber}>{field.length}</Text>
                            <Text style={styles.text}>IoT Sensor</Text>
                        </View>
                    </View>

                    <View style={styles.dataUser}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.text, styles.align]}>Nama Lengkap</Text>
                            <Text style={[styles.text, styles.align]}>{user.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.text, styles.align]}>Email</Text>
                            <Text style={[styles.text, styles.align]}>{user.email}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: '15%',  }}>
                            <TouchableOpacity style={styles.EditButton} onPress={() => navigation.navigate('Edit')}  >
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <Text style={styles.logoutText}>Logout</Text>
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
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,
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
    align: {
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
        flex: 1,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,

    },

    logoutButton: {
        backgroundColor: '#FFA9A9',
        width: '50%',
        borderRadius: 20,
        marginEnd: '2%',

    },
    EditButton: {
        backgroundColor: '#C7D3E5',
        width: '50%',
        borderRadius: 20,
        marginEnd: '2%',
    },
    logoutText: {
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 17,
        color: '#881616',
    },
    editText: {
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 17,
        color: '#0F2652',
    },

});

export default ProfileScreen;