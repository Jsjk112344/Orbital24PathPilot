import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RouteContext } from '../../context/RouteContext';
import CustomInput from '../../components/CustomInput';

const DateTimeForm = () => {
    const { tripInfo, setTripInfo } = useContext(RouteContext);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        setTripInfo(prev => ({ ...prev, tripDate: date }));
        hideDatePicker();
    };

    const handleConfirmTime = (time) => {
        const newTime = new Date(tripInfo.tripDate);
        newTime.setHours(time.getHours(), time.getMinutes());
        setTripInfo(prev => ({ ...prev, tripTime: newTime }));
        hideTimePicker();
    };

    const handleNameChange = (text) => {
        setTripInfo(prev => ({ ...prev, tripName: text }));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={handleNameChange}
                value={tripInfo.tripName}
                placeholder="Enter Trip Name"
            />
            <TouchableOpacity onPress={showDatePicker} style={styles.input}>
                <Text>Date of Trip: {tripInfo.tripDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />

            <TouchableOpacity onPress={showTimePicker} style={styles.input}>
                <Text>Start Time: {tripInfo.tripTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
                is24Hour={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        padding: 10,
        backgroundColor: '#ddd',
        marginBottom: 10
    }
});

export default DateTimeForm;
