import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory-native';

const RainHistoryScreen: React.FC = () => {
    const data = [
        { x: 1, y: 1 }, { x: 2, y: -1 }, { x: 3, y: 1 }, { x: 4, y: -1 }, {x: 5, y: -1}, {x: 6, y: 1}, {x: 7, y: 1}
      ];


    return (
        <View>
            <VictoryChart
                domain={{ x: [0, 7], y: [-2, 2] }}  // Set Y domain to show negative values
            >
                <VictoryAxis
                    dependentAxis
                    tickFormat={(t) => `${t}`}
                />
                <VictoryAxis
                    tickFormat={(t) => `${t}`}
                />
                <VictoryBar
                    data={data}
                    style={{
                        data: { fill: "#c43a31" },
                    }}
                    barRatio={1}
                />
            </VictoryChart>
        </View>
    )
}

export default RainHistoryScreen;