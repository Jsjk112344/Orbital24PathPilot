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


    // useEffect(() => {
    //     if (sortedStops.length > 1) {
    //         console.log(sortedStops[nextStopIndex]);
    //         setNextStopName(sortedStops[nextStopIndex].label);
    //     }
    // }, [sortedStops, nextStopIndex, setNextStopName]);

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
                    <TouchableOpacity style={styles.button} onPress={onReachDestination}>
                        <Text style={styles.buttonText}>Reached Destination</Text>
                    </TouchableOpacity>
                    <Text style={styles.heading}>Directions to:</Text>
                    <Text style={styles.address}>{nextStopName}</Text>
                    <Text style={styles.instruction}>{currentInstruction}</Text>
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
        height: '80%', // Adjust the height to 30-40% as needed
        // padding: 10,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // elevation: 5, // Add shadow for Android
        // shadowColor: '#000', // Add shadow for iOS
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        alignItems: 'center',
		justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },
    heading: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5,
        position: 'absolute',
        left: 20,
        color: '#03c6fc',
    },
    address: {
        position: 'absolute',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 0,
        top: 50,
        left: 19,
        color: '#03c6fc',
    },
    instruction: {
        position: 'absolute',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        top: 90,
        color: '#03c6fc',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 20,
        position: 'absolute',
        right: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});