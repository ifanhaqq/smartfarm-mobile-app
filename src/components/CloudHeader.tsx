// CloudHeader.tsx
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CloudHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerTitle}>
        <Image source={require('../assets/icon-back.png')} style={{
           width: 25,
           height: 25,
        }}></Image> 
      </TouchableOpacity>

      <Svg style={styles.cloudBackground} height="140%" width="100%" viewBox="0 0 1400 220">

        <Path
          fill="#eff7fc"
          // d="M-50,192L48,208C96,224,192,256,288,240C384,224,480,160,576,144C672,128,768,160,864,192C960,224,1056,256,1152,256C1248,256,1344,224,1392,208L1490,192L1490,400L-50,400Z"
          d="M0,100L48,130C96,160,192,220,288,210C384,200,480,130,576,100C672,70,768,100,864,130C960,160,1056,190,1152,190C1248,190,1344,160,1392,140L1440,120L1440,0L0,0Z"
        />

      </Svg>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1, 
    // borderWidth: 2, 
    position: 'relative',
    width: '100%', // Adjust the width as needed
    height: '10%', // Adjust the height as needed
    
  },
  cloudBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // SVG will be at the lowest layer


  },
  headerTitle: {
    position: 'relative',
    zIndex: 2, // Ensures text appears above the SVG background 
    flexDirection: 'row',
    margin: '4%',
    marginTop: '8%',
    justifyContent: 'space-between'
  },
});

export default CloudHeader;
