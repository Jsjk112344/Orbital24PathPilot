import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';

const TaskList = ({ tasks, setTasks }) => {
    const markAsDelivered = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, delivered: true };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const renderTaskItem = ({ item, index }) => (
        <View style={styles.taskCard}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDetails}>Food: {item.food}</Text>
            <Text style={styles.taskDetails}>Address: {item.address}</Text>
            <Text style={styles.taskDetails}>Remarks: {item.remarks}</Text>
            {item.delivered ? (
                <Text style={styles.deliveredText}>Delivered ✓</Text>
            ) : (
                <CustomButton onPress={() => markAsDelivered(index)} text="Mark as Delivered" style={styles.deliverButton}/>
            )}
        </View>
    );

    const clearTaskList = () => {
        setTasks([]);
    };

    return (
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
                <CustomButton onPress={clearTaskList} style={styles.clearButton} type="TERTIARY" text="Clear Task List" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
    deliveredText: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 10,
    },
    deliverButton: {
        backgroundColor: '#3B71F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    deliverButtonText: {
        fontSize: 16,
        color: 'white',
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

export default TaskList;
