import React from 'react';
import { View, Image } from 'react-native';

const Loading: React.FC = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
            <Image source={require('../assets/loading-animation.gif')}></Image>
        </View>
    )
}

export default Loading;