import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BeneficiaryCard from '../../components/BeneficiaryCard/BeneficiaryCard';

const BeneficiaryList = ({ beneficiaries, handleViewDetails }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {beneficiaries.map((beneficiary, index) => (
                <BeneficiaryCard
                    key={index}
                    logo={beneficiary.logo}
                    name={beneficiary.name}
                    halalStatus={beneficiary.halalStatus}
                    deliveryType={beneficiary.deliveryType}
                    distributionPeriods={beneficiary.distributionPeriods}
                    serviceRegion={beneficiary.serviceRegion}
                    onViewDetails={() => handleViewDetails(beneficiary.name)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default BeneficiaryList;
