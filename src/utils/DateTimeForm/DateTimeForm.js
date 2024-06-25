import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CustomInput = ({ label, onPress, value }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.input}>{value}</Text>
    </TouchableOpacity>
  );
};

const DateTimeForm = () => {
    const [date, setDate] = useState(new Date());
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

    const handleConfirmDate = (selectedDate) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const handleConfirmTime = (selectedTime) => {
        setDate(new Date(date.setHours(selectedTime.getHours(), selectedTime.getMinutes())));
        hideTimePicker();
    };

    return (
        <View style={styles.container}>
            <CustomInput
                label="Date of Trip"
                value={date.toLocaleDateString()}
                onPress={showDatePicker}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />

            <CustomInput
                label="Start Time"
                value={date.toLocaleTimeString()}
                onPress={showTimePicker}
            />
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
    inputContainer: {
        marginBottom: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        color: '#333',
    }
});

export default DateTimeForm;
