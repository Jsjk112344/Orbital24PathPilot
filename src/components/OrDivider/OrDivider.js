import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrDivider = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <View style={styles.circle}>
                <Text style={styles.orText}>OR</Text>
            </View>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#D0D0D0',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#D0D0D0',
    },
    orText: {
        color: '#888888',
        fontWeight: 'bold',
    }
});

export default OrDivider;
