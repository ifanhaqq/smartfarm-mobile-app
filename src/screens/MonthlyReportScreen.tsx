import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
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
    const [reportData, setReportData] = useState<any[]>([])
    const [ats, setAts] = useState<number>(0);

    useEffect(() => {

        async function reportHandler() {
            const reportService: ReportService = new ReportService();


            try {
                const report = await reportService.getReport(monthsPriorData);
                const newReportData = { column1: report.kat.toFixed(2), column2: report.ats.toFixed(2) };
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
                style={styles.dropdown}
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
            <View style={styles.box}>
                <View style={styles.table}>

                    <Text style={{ color: '#616161', margin: 5, fontWeight: 'semibold', fontSize: 17 }} >Hasil laporan</Text>
                    <View style={styles.col}>
                        <View style={styles.col2}>
                            <Image source={require("../assets/icon-soil.png")} style={styles.icon}></Image>
                            <View style={{ flexDirection: 'column', marginStart: 5, }}>
                                <Text style={{color:'#616161'}} > kadar air tanah</Text>
                                <Text style={styles.value}>0.75</Text>
                            </View>
                        </View>
                        <View style={styles.col2}>
                            <Image source={require("../assets/icon-water.png")} style={{ width: 23, height: 30, }}></Image>
                            <View style={{ flexDirection: 'column',  marginStart: 5,  }}>
                                <Text style={{color:'#616161'}}> % air tanah tersedia</Text>
                                <Text style={styles.value}>0.75</Text>
                            </View>
                        </View>
                    </View>
                    {reportData.map((item: any, index: any) => (
                        <View key={index} style={styles.row}>

                            <Text style={styles.cell}> {item.column1}</Text>

                            <Text style={styles.cell}>{item.column2}</Text>
                        </View>
                    ))}

                    {(ats <= 40 && ats >= 10) ? <Text style={styles.description}>Tidak disarankan untuk menanam padi</Text>
                        : (ats <= 60 && ats >= 41) ? <Text style={styles.description}>Cukup tidak disarankan untuk menanam padi</Text>
                            : (ats <= 90 && ats >= 61) ? <Text style={styles.description}>Sangat disarankan untuk menanam padi</Text>
                                : (ats >= 91) ? <Text style={styles.description}>Cukup disarankan untuk menanam padi</Text>
                                    : <Text style={styles.description}>Sangat tidak disarankan untuk menanam padi</Text>}
                </View>
            </View>
            <View style={styles.row}>
                <Image source={require('../assets/banner-1.png')} style={{width: 350, height: 100,}}></Image>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        color: '#616161',
    },
    title: {
        marginBottom: 50,
        borderColor: 'white',
        color: '#545454',
        fontWeight: 'semibold',
        fontSize: 20,
    },
    table: {
        paddingTop: 10,
        paddingStart: 10, 
        backgroundColor: 'white',
        borderRadius: 10,
        color: '#616161',
        marginStart: 20,
        marginEnd: 20,

    },
    row: {
        flexDirection: 'row',
        marginStart: 25,
        marginEnd: 25,
        marginBottom: 10,
        color: '#616161',
    },
    cell: {
        padding: 10,

        borderColor: '#ccc',
        textAlign: 'center',
        width: 'auto',
        rowGap: 5,
        color: '#616161',
    },
    description: {
        margin: 10,
        padding: 10, 
        borderWidth: 0.2,
        borderRadius: 5,
        borderColor: '#D9D9D9',
        color: '#616161',
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        margin: 20,

    },
    icon: {
        width: 30,
        height: 30,
    },
    col: {
        flexDirection: 'row',
        padding: 4,

    },
    col2: {
        borderRadius: 10,
        borderColor: '#D9D9D9',
        borderWidth: 0.2,
        flexDirection: 'row',
        padding: 10,
        marginEnd: 5,

    },
    value: {
        color: '#407BFF',
    },
});

export default MonthlyReportScreen;