import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';

interface ChartProps {
    data: { x: Date, y: number }[];
}

const Y_AXIS_MIN = 10;
const Y_AXIS_MAX = 50;

const Chart: React.FC<ChartProps> = ({data}) => {
    return (
        <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
            <VictoryAxis tickFormat={(t) => `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`} />
            <VictoryAxis dependentAxis tickFormat={(t) => `${t}`} domain={[Y_AXIS_MIN, Y_AXIS_MAX]} />
            <VictoryLine
                animate={{ duration: 1000, onLoad: { duration: 1000 } }}
                data={data}
            />
        </VictoryChart>
    );
}

export default Chart;
