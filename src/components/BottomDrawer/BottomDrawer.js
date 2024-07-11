import { StyleSheet, View, Text } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";

export default function BottomDrawer() {
    const snapPoints = useMemo(() => ['30%', '100%'],[]);

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
                <View>
                    <Text style = {styles.heading}>INCLUDE DIRECTIONS HERE</Text>
                </View>
            </BottomSheet>
        </View>
    )
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
    heading: {
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instruction: {
        fontSize: 14,
        marginBottom: 5,
    },
});