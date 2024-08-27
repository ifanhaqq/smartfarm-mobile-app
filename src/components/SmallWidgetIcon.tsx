import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const SmallWidgetIcon: React.FC<any> = ({ name, color, title }) => {
    return (
        <View style={styles.iconText}>
                <Icon name={name}
                    color={color}
                    size={30}
                    style={styles.icon}
                ></Icon>
            <Text style={styles.iconTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    iconText: {
        marginBottom: 15,
        backgroundColor: '#ffffff',
        borderRadius: 100,
        padding: 1,
        paddingHorizontal: 10,
        marginStart: 5
    },
    iconTitle: {
        textAlign: 'center',
        color: '#407bff'
    },
    icon: {

    },
})

export default SmallWidgetIcon;