import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useContext } from 'react';
import UserContext from 'src/contexts/AuthContext';
import FieldContext from 'src/contexts/FieldContext';

const HomeScreen: React.FC = () => {

    // console.log(fieldContext);
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
         justifyContent: 'center', 
         alignItems: 'center'
    }
});

export default HomeScreen;