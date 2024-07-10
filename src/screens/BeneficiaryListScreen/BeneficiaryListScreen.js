import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BeneficiaryList from './BeneficiaryList';
import { filterBeneficiaries } from '../../utils/FilterBeneficiaries/FilterBeneficiaries';
import beneficiaries from './beneficiaries';
import detailScreens from './detailScreen';

const BeneficiaryListScreen = ({ navigation }) => {
    const [region, setRegion] = useState('all');
    const [halalStatus, setHalalStatus] = useState('all');
    const [foodSupport, setFoodSupport] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [openRegion, setOpenRegion] = useState(false);
    const [openHalalStatus, setOpenHalalStatus] = useState(false);
    const [openFoodSupport, setOpenFoodSupport] = useState(false);

    const handleViewDetails = (beneficiaryName) => {
        const screenName = detailScreens[beneficiaryName];
        if (screenName) {
            navigation.navigate(screenName);
        } else {
            console.error(`No detail screen found for beneficiary: ${beneficiaryName}`);
        }
    };

    const filteredBeneficiaries = filterBeneficiaries(beneficiaries, region, halalStatus, foodSupport);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
                    <Text style={styles.buttonText}>Filter</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Filter Beneficiaries</Text>
                        <Text style={styles.modalLabel}>Select Region</Text>
                        <DropDownPicker
                            open={openRegion}
                            value={region}
                            items={[
                                { label: 'All Regions', value: 'all' },
                                { label: 'Central', value: 'central' },
                                { label: 'East', value: 'east' },
                                { label: 'West', value: 'west' },
                                { label: 'Island-wide', value: 'island-wide' },
                            ]}
                            setOpen={setOpenRegion}
                            setValue={setRegion}
                            style={styles.picker}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                        <Text style={styles.modalLabel}>Select Halal Status</Text>
                        <DropDownPicker
                            open={openHalalStatus}
                            value={halalStatus}
                            items={[
                                { label: 'All', value: 'all' },
                                { label: 'Halal', value: 'halal' },
                                { label: 'Non-Halal', value: 'non-halal' },
                            ]}
                            setOpen={setOpenHalalStatus}
                            setValue={setHalalStatus}
                            style={styles.picker}
                            zIndex={2000}
                            zIndexInverse={2000}
                        />
                        <Text style={styles.modalLabel}>Select Food Support</Text>
                        <DropDownPicker
                            open={openFoodSupport}
                            value={foodSupport}
                            items={[
                                { label: 'All', value: 'all' },
                                { label: 'Food Vouchers', value: 'food vouchers' },
                                { label: 'Food Rations', value: 'food rations' },
                                { label: 'Cooked Meals', value: 'cooked meals' },
                            ]}
                            setOpen={setOpenFoodSupport}
                            setValue={setFoodSupport}
                            style={styles.picker}
                            zIndex={1000}
                            zIndexInverse={3000}
                        />
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.applyButton}
                        >
                            <Text style={styles.buttonText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <BeneficiaryList
                beneficiaries={filteredBeneficiaries}
                handleViewDetails={handleViewDetails}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    filterButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        width: '100%',
        marginBottom: 20,
    },
    applyButton: {
        padding: 10,
        backgroundColor: '#3B71F3',
        borderRadius: 5,
    },
});

export default BeneficiaryListScreen;
