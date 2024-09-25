import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const SmallWidgetIcon: React.FC<any> = ({ name, color, value, title }) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.iconText}>
                <Icon name={name}
                    color={color}
                    size={30}
                    style={styles.icon}
                ></Icon>
                <Text style={styles.iconTitle}>{value}</Text>
            </View>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 0,
        alignItems: 'center',
        marginBottom: 15,
    },
    titleText: {
        color: '#ffffff',
        fontWeight: 'bold',
        
    },
    
    iconText: {
        
        backgroundColor: '#ffffff',
        borderRadius: 100,
        padding: 1,
        paddingHorizontal: 10,
        marginStart: 5,
    },
    iconTitle: {
        textAlign: 'center',
        color: '#407bff'
    },
    icon: {

    },
})

export default SmallWidgetIcon;