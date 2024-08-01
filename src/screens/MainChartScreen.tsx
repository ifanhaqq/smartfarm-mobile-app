import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chart from 'src/components/Chart';
import { MQTTService } from 'src/services/MQTTService';
import '../../shim';
import { Icon } from 'react-native-elements';


const MainChartScreen: React.FC = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.childContainerLeft}>
                    <View style={styles.iconText}>
                        <Icon name='cloud'
                            color='#ffffff'
                            size={50}
                            style={styles.icon}></Icon>
                        <Text style={styles.iconTitle}>Rain</Text>
                    </View>
                    <View style={styles.iconText}>
                        <Icon name='cloud'
                            color='#ffffff'
                            size={50}
                            style={styles.icon}></Icon>
                        <Text style={styles.iconTitle}>Rain</Text>
                    </View>
                    <View style={styles.iconText}>
                        <Icon name='cloud'
                            color='#ffffff'
                            size={50}
                            style={styles.icon}></Icon>
                        <Text style={styles.iconTitle}>Rain</Text>
                    </View>
                </View>
                <View style={styles.middleWidget}>
                    <Text style={styles.middleWidgetChild}>12</Text>
                </View>
                <View style={styles.childContainerRight}>
                    <View style={styles.iconText}>
                        <Icon name='cloud'
                            color='#ffffff'
                            size={50}
                            style={styles.icon}></Icon>
                        <Text style={styles.iconTitle}>Rain</Text>
                    </View>
                    <View style={styles.iconText}>
                        <Icon name='cloud'
                            color='#ffffff'
                            size={50}
                            style={styles.icon}></Icon>
                        <Text style={styles.iconTitle}>Rain</Text>
                    </View>
                    <View style={styles.iconText}>
                        <Icon name='cloud'
                            color='#ffffff'
                            size={50}
                            style={styles.icon}></Icon>
                        <Text style={styles.iconTitle}>Rain</Text>
                    </View>

                </View>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#545454',
        flexDirection: 'row',
        color: '#ffffff',
        paddingTop: 50
    },
    childContainerLeft: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'flex-end',
        
    },
    childContainerRight: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'flex-start',
        
    },
    middleWidget: {
        borderWidth: 7,
        borderRadius: 100,
        marginHorizontal: 10,
        borderColor: '#ffffff',
    },
    middleWidgetChild: {
        padding: 13,
        fontSize: 130,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    header: {
        fontSize: 15,
        fontWeight: 'bold',
        borderColor: '#34eb71',
        color: '#ffffff',
        marginVertical: 7
    },
    iconText: {
        marginBottom: 5
    },
    iconTitle: {
        textAlign: 'center',
    },
    icon: {}

});


export default MainChartScreen;