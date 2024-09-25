import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';

interface ChartProps {
    data: { x: Date, y: number }[];
    y_min: number;
    y_max: number;
}

// const Y_AXIS_MIN = 10;
// const Y_AXIS_MAX = 50;

const Chart: React.FC<ChartProps> = ({data, y_min, y_max}) => {
    return (
        <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
            <VictoryAxis tickFormat={(t) => `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`} />
            <VictoryAxis dependentAxis tickFormat={(t) => `${t}`} domain={[y_min, y_max]} />
            <VictoryLine
                animate={{ duration: 1000, onLoad: { duration: 1000 } }}
                data={data}
            />
        </VictoryChart>
    );
}

export default Chart;
