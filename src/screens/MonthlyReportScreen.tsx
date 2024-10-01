import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ReportService } from 'src/services/ReportService';

const MonthlyReportScreen: React.FC = () => {

    const [monthsPriorData, setMonthsPriorData] = useState<number>(1);
    const [dropdownItem, setDropdownItem] = useState<{ label: string, value: number }[]>([
        { label: "Januari", value: 1 },
        { label: "Februari", value: 2 },
        { label: "Maret", value: 3 },
        { label: "April", value: 4 },
        { label: "Mei", value: 5 },
        { label: "Juni", value: 6 },
        { label: "Juli", value: 7 },
        { label: "Agustus", value: 8 },
        { label: "September", value: 9 },
        { label: "Oktober", value: 10 },
        { label: "November", value: 11 },
        { label: "Desember", value: 12 }
    ]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [reportData, setReportData] = useState<any[]>([{ column1: 'Kadar air tanah', column2: '% Air tanah tersedia' }])
    const [ats, setAts] = useState<number>(0);

    useEffect(() => {

        async function reportHandler() {
            const reportService: ReportService = new ReportService();


            try {
                const report = await reportService.getReport(monthsPriorData);
                const newReportData = {column1: report.kat.toFixed(2), column2: report.ats.toFixed(2)};
                setReportData((prevReportData) => [...prevReportData, newReportData]);
                setAts(report.ats);


            } catch (error) {
                console.log(error)
            }
        }

        reportHandler()
        
        


        return () => {
            setReportData([{ column1: 'Kadar air tanah', column2: '% Air tanah tersedia' }])
        };

    }, [monthsPriorData]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Laporan Bulanan Neraca Air</Text>
            <DropDownPicker
                open={dropdownOpen}
                items={dropdownItem}
                value={monthsPriorData}
                setValue={(callback) => {
                    // Manually update monthsPriorData from the dropdown
                    const newValue = typeof callback === 'function' ? callback(monthsPriorData) : callback;
                    setMonthsPriorData(newValue);
                }}
                setItems={setDropdownItem}
                setOpen={setDropdownOpen}
            />
            <View style={styles.table}>
                {reportData.map((item: any, index: any) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{item.column1}</Text>
                        <Text style={styles.cell}>{item.column2}</Text>
                    </View>
                ))}
            </View>
            { (ats <= 40 && ats >= 10) ? <Text style={styles.description}>Tidak disarankan untuk menanam padi</Text>
            : (ats <= 60 && ats >= 41) ? <Text style={styles.description}>Cukup tidak disarankan untuk menanam padi</Text>
            : (ats <= 90 && ats >= 61) ? <Text style={styles.description}>Sangat disarankan untuk menanam padi</Text>
            : (ats >= 91) ? <Text style={styles.description}>Cukup disarankan untuk menanam padi</Text>
            :  <Text style={styles.description}>Sangat tidak disarankan untuk menanam padi</Text>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginBottom: 10
    },
    table: {
        margin: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    cell: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        width: 200
    },
    description: {
        marginTop: 20
    }
});

export default MonthlyReportScreen;