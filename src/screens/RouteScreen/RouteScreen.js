import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { decode as atob } from 'base-64';
import CustomButton from '../../components/CustomButton';

const RouteScreen = () => {
    const navigation = useNavigation();
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const updateGreeting = () => {
            const hour = currentTime.getHours();
            if (hour < 12) {
                setGreeting('Good Morning');
            } else if (hour < 18) {
                setGreeting('Good Afternoon');
            } else {
                setGreeting('Good Evening');
            }
        };

        const updateTime = () => {
            setCurrentTime(new Date());
        };

        updateGreeting();
        const intervalId = setInterval(updateTime, 60000); // Update time every minute

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [currentTime]);

    const handleAddTripPress = () => {
        navigation.navigate('InputStops');
    };

    const handleViewBeneficiariesPress = () => {
        navigation.navigate('BeneficiaryList');
    };

    const handleSOSPress = () => {
        navigation.navigate('Help');
    };

    const showDisclaimer = () => {
        Alert.alert(
            'Disclaimer',
            'Please ensure the Excel file is formatted as follows:\n\nName\tFood\tAddress\tRemarks\n\nClick OK to proceed.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: handleFileSelection }
            ]
        );
    };

    const handleFileSelection = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            const file = res[0];
            console.log('Selected file:', file);

            const filePath = Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri;
            const fileContent = await RNFS.readFile(filePath, 'base64');
            const binaryStr = atob(fileContent);

            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            console.log('Parsed JSON data:', jsonData);

            parseExcelData(jsonData);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.error('Error reading the file:', err);
                Alert.alert('Error', 'Unable to read the file.');
            }
        }
    };

    const parseExcelData = (data) => {
        const tasksArray = data.slice(1).map((row) => ({
            name: row[0],
            food: row[1],
            address: row[2],
            remarks: row[3],
        }));
        setTasks(tasksArray);
    };

    const renderTaskItem = ({ item }) => (
        <View style={styles.taskCard}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDetails}>Food: {item.food}</Text>
            <Text style={styles.taskDetails}>Address: {item.address}</Text>
            <Text style={styles.taskDetails}>Remarks: {item.remarks}</Text>
        </View>
    );

    const clearTaskList = () => {
        setTasks([]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.date}>{currentTime.toLocaleDateString()}</Text>
                <Text style={styles.time}>{currentTime.toLocaleTimeString()}</Text>
                <Text style={styles.question}>Make A Difference Today!</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handleAddTripPress} style={styles.button}>
                            <Icon name="plus" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>Add Trip</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handleViewBeneficiariesPress} style={styles.button}>
                            <Icon name="users" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>Beneficiaries</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handleSOSPress} style={styles.button}>
                            <Icon name="exclamation-triangle" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>SOS</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={showDisclaimer} style={styles.button}>
                            <Icon name="file-excel-o" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>Add Task List</Text>
                    </View>
                </View>
            </View>
            <View style={styles.taskList}>
                {tasks.length === 0 ? (
                    <Text style={styles.noTasksText}>No tasks yet</Text>
                ) : (
                    <FlatList
                        data={tasks}
                        renderItem={renderTaskItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
                {tasks.length > 0 && (
                    <CustomButton onPress={clearTaskList} style={styles.clearButton} type="TERTIARY" text="Clear Task List"/>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2', // Background color for the screen
        padding: 20,
        marginBottom: 20,
    },
    header: {
        alignSelf: 'flex-start',
        marginBottom: 30,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#666666', // Explicitly stating the color
    },
    date: {
        fontSize: 18,
        color: '#666666', // Explicitly stating the color
    },
    time: {
        fontSize: 18,
        color: '#666666', // Explicitly stating the color
        marginBottom: 30,
    },
    question: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#888888', // Explicitly stating the color
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,  // Adds shadow on Android
        shadowColor: '#000',  // Adds shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    buttonWrapper: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3B71F3',
        padding: 15,
        borderRadius: 40,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // Adds shadow on Android
        shadowColor: '#000',  // Adds shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonLabel: {
        marginTop: 10,
        fontSize: 14,
        color: '#666666', // Explicitly stating the color
        textAlign: 'center',
    },
    taskList: {
        marginTop: 20,
    },
    noTasksText: {
        fontSize: 18,
        color: '#666666', // Explicitly stating the color
        textAlign: 'center',
        marginTop: 20,
    },
    taskCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        elevation: 3,  // Adds shadow on Android
        shadowColor: '#000',  // Adds shadow on iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    taskName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#999999"
    },
    taskDetails: {
        fontSize: 16,
        color: '#666666', // Explicitly stating the color
    },
    clearButton: {
        backgroundColor: '#FF6347', // Tomato color for clear button
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // Adds shadow on Android
        shadowColor: '#000',  // Adds shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    clearButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RouteScreen;