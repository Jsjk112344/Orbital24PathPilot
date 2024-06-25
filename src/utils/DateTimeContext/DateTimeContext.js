import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimeForm from '../DateTimeForm/DateTimeForm';
import DateTimeDisplay from '../../components/DateTimeDisplay/DateTimeDisplay';

const DateTimeContext = () => {
    const [date, setDate] = useState(new Date());

    return (
        <View style={styles.container}>
            <DateTimeForm date={date} setDate={setDate} />
            <DateTimeDisplay date={date} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DateTimeContext;
