import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory-native';
import { RainSpecService } from 'src/services/RainSpecService';
import DropDownPicker from 'react-native-dropdown-picker';
import { TokenService } from 'src/services/TokenService';
// import RainStatus from 'src/components/RainStatus';

type rainListProps = { rainListDate: string, rainListStatus: string }

const Item = ({ rainListDate, rainListStatus }: rainListProps) => (
    <View style={styles.rainList}>
        <Text style={styles.rainListDate}>{rainListDate}</Text>
        <Text style={styles.rainListStatus}>{rainListStatus}</Text>
    </View>
)

const RainHistoryScreen: React.FC = () => {
    const [rainHistory, setRainHistory] = useState<number[]>([]);
    const [rainData, setRainData] = useState<{ x: number, y: number }[]>([]);
    const [daysPriorData, setDaysPriorData] = useState<number>(3);
    const [dropdownItem, setDropdownItem] = useState<{ label: string, value: number }[]>([{ label: "3 days", value: 3 }, { label: "7 days", value: 7 }, { label: "10 days", value: 10 }]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [rainStatusData, setRainStatusData] = useState<{ id: number, rainListDate: string, rainListStatus: string }[] | null>(null);

    useEffect(() => {

        async function rainHistoryHandler() {
            try {
                const rainSpec: RainSpecService = new RainSpecService();

                // Fetch rain history data
                const fetchedRainHistory = await rainSpec.getRainHistory(daysPriorData);
                const stringDate = []

                const stringDateHandler = (date: number) => {
                    const today = new Date();
                    today.setDate(today.getDate() + 1);
                    const dayBefore = new Date(today);
                    dayBefore.setDate(today.getDate() - date);

                    const isoString = dayBefore.toLocaleString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })

                    return isoString;

                }

                // Update rain history state
                setRainHistory(fetchedRainHistory);

                // Update rain data state based on fetched rain history
                const updatedRainData = fetchedRainHistory.map((value, index) => ({
                    x: index + 1,
                    y: value,
                }));
                const updatedRainStatusData = fetchedRainHistory.map((value, index) => ({
                    id: index + 1,
                    rainListDate: stringDateHandler(index + 1),
                    rainListStatus: (value <= 0) ? "Hari Kering" : "Hari Basah"
                }));

                setRainData(updatedRainData);
                setRainStatusData(updatedRainStatusData);

                console.log(rainStatusData);

            } catch (error) {
                console.error('Error fetching rain data:', error);
            }
        }

        rainHistoryHandler();



        // Clean-up function (if needed)
        return () => {
            setRainData([]);
        };

    }, [daysPriorData]);
    const token: TokenService = new TokenService();
    
    console.log(token.getToken())

    return (
        <>
            <View style={styles.container}>
                <DropDownPicker
                    open={dropdownOpen}
                    items={dropdownItem}
                    value={daysPriorData}
                    setValue={setDaysPriorData}
                    setItems={setDropdownItem}
                    setOpen={setDropdownOpen}
                />
                <VictoryChart
                    domain={{ x: [0, daysPriorData], y: [-2, 2] }}  // Set Y domain to show negative values
                >
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(t) => `${t}`}
                    />
                    <VictoryAxis
                        tickFormat={(t) => `${t}`}
                    />
                    <VictoryBar
                        data={rainData}
                        style={{
                            data: { fill: "#bfd7eb" },
                        }}
                        barRatio={1}
                    />
                </VictoryChart>
                <Text style={styles.listTitle}>Keterangan</Text>
            </View>
            <FlatList
                data={rainStatusData}
                renderItem={({ item }) => <Item rainListDate={item.rainListDate} rainListStatus={item.rainListStatus} />}
            // keyExtractor={item => item.id}
            >

            </FlatList>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        // marginTop: 20
    },
    listTitle: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: "center"
    },
    rainList: {
        backgroundColor: "#bfd7eb",
        marginHorizontal: 15,
        marginVertical: 5,
        padding: 10,
        justifyContent: "space-between",
        borderRadius: 10
    },

    rainListDate: {
        color: "#ffffff",
        fontSize: 15,
        fontStyle: "italic"
    },

    rainListStatus: {
        fontWeight: "bold",
        color: "#ffffff",
        fontSize: 20
    }

})

export default RainHistoryScreen;