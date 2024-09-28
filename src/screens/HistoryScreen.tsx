import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CloudHeader from 'src/components/CloudHeader';
import { RainSpecService } from 'src/services/RainSpecService';

type rainListProps = { rainListDate: string, rainListStatus: string }

const Item = ({ rainListDate, rainListStatus }: rainListProps) => (
    <View style={[styles.rainList, (rainListStatus == 'Hari Kering') ? {backgroundColor: "#CBC103"} : {backgroundColor: "#357FD3"}]}>
        <Text style={styles.rainListDate}>{rainListDate}</Text>
        <Text style={styles.rainListStatus}>{rainListStatus}</Text>
    </View>
)

const HistoryScreen: React.FC = () => {

    const [rainHistory, setRainHistory] = useState<number[]>([]);
    const [rainData, setRainData] = useState<{ x: number, y: number }[]>([]);
    const [daysPriorData, setDaysPriorData] = useState<number>(7);
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

    return (
        <LinearGradient colors={['#bfd7eb', '#ffffff']} style={styles.background}>
            <CloudHeader />
            <View style={styles.calendarContainer}>
                <Calendar
                    style={styles.calendar}
                    theme={{
                        backgroundColor: 'transparent',  // Set theme background color to transparent
                        calendarBackground: 'transparent',  // Set calendar background to transparent
                        textSectionTitleColor: '#255599',
                        textSectionTitleDisabledColor: '#255599',
                        textDayHeaderFontWeight: 'bold'
                    }}
                    onDayPress={(day: any) => {
                        console.log('selected day', day.dateString);
                    }}
                >

                </Calendar>
            </View>
            <FlatList
                data={rainStatusData}
                renderItem={({ item }) => <Item rainListDate={item.rainListDate} rainListStatus={item.rainListStatus} />}
                style={styles.flatListContainer}
            >

            </FlatList>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    calendarContainer: {
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    calendar: {
        backgroundColor: 'transparent'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 740,
    },
    flatListContainer : {
        // marginBottom: 10
    },
    rainList: {
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
});

export default HistoryScreen;