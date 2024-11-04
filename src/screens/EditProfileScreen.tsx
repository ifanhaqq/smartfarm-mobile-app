import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import UserContext from 'src/contexts/AuthContext';
import { AuthService } from 'src/services/AuthService';
import CloudHeader from 'src/components/CloudHeader';

const EditProfileScreen: React.FC = () => {

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
            <ScrollView  >
                 <View style={{margin: '5%', borderRadius: 20,  backgroundColor: 'rgba(255, 255, 255, 0.5)',}}>
                   <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputText}>Nama Lengkap</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputText}>Email</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputText}>Password</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveText}>Save</Text>
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
    inputButton:{
        backgroundColor: 'white',
        borderRadius: 20,
        margin: '5%',
        padding: '4%',
    },
    inputText:{
        color: '#616161',
        fontWeight: '200',
    },
    saveButton:{
        backgroundColor: '#3872E3',
        borderRadius: 20,
        margin: '5%',
        marginTop: '90%',
        padding: '4%',
    },
    saveText:{
        textAlign: 'center',
         color: 'white',
         fontWeight: 'bold',
    },

});

export default EditProfileScreen;