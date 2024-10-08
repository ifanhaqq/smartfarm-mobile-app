import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UserContext from 'src/contexts/AuthContext';
import { AuthService } from 'src/services/AuthService';

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
        <View style={styles.container}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
                <Text style={{ textAlign: 'center', paddingVertical: 15, color: '#fff', fontSize: 22 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    loginButton: {
        marginTop: 40,
        marginHorizontal: 90,
        backgroundColor: '#b82222',
        borderRadius: 20
    },
});

export default ProfileScreen;