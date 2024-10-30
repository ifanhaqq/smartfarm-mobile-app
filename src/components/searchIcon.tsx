// CloudHeader.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CloudHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 1400 220">
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
    top: 0,
    // borderWidth: 2,
    height: 60
  },
});

export default CloudHeader;
