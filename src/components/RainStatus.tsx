import React from "react";
import { View, Text, StyleSheet } from "react-native";

type rainListProps = {rainListDate: string, rainListStatus: string}

const RainStatus: React.FC<rainListProps> = ({rainListDate, rainListStatus}) => {
    return (

        <View style={styles.rainList}>
            <Text style={styles.rainListDate}>{rainListDate}</Text>
            <Text style={styles.rainListStatus}>{rainListStatus}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rainList: {
        backgroundColor: "#bfd7eb",
        marginHorizontal: 15,
        marginVertical: 3,
        padding: 15,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10
    },

    rainListDate: {
        fontWeight: "bold",
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

export default RainStatus;