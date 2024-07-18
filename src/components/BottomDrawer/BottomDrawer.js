import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useState } from "react";
import { useBottomDrawer } from "../../context/BottomDrawerContext";
import { RouteContext, useRouteContext } from "../../context/RouteContext";
import useRouteLogic from "../../utils/useRouteLogic/useRouteLogic";

export default function BottomDrawer({ onReachDestination }) {
    const { currentInstruction } = useBottomDrawer();
    const { sortedStops } = useRouteContext();
    const { nextStopIndex } = useRouteLogic();
    const { nextStopName, setNextStopName } = useBottomDrawer();

    const snapPoints = useMemo(() => ['30%', '100%'], []);
    const renderBackdrop = useCallback(
        props => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props} />
    );

    return (
        <View style={styles.overlay}>
            <BottomSheet 
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enableTouchThrough={true}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.heading}>Directions to:</Text>
                    <Text style={styles.address}>{nextStopName}</Text>
                    <Text style={styles.instruction}>{currentInstruction}</Text>
                    <TouchableOpacity style={styles.button} onPress={onReachDestination}>
                        <Text style={styles.buttonText}>I have reached my destination</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#444444',
        marginBottom: 10,
    },
    address: {
        fontSize: 20,
        color: '#666666',
        marginBottom: 20,
    },
    instruction: {
        fontSize: 18,
        color: '#888888',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
