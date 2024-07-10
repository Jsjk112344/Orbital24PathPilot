// filterBeneficiaries.js
export const filterBeneficiaries = (beneficiaries, region, halalStatus, foodSupport) => {
    return beneficiaries.filter(beneficiary => {
        const matchesRegion = region === 'all' || beneficiary.serviceRegion.toLowerCase() === region.toLowerCase();
        const matchesHalalStatus = halalStatus === 'all' || beneficiary.halalStatus.toLowerCase().includes(halalStatus.toLowerCase());
        const matchesFoodSupport = foodSupport === 'all' || beneficiary.distributionPeriods.toLowerCase().includes(foodSupport.toLowerCase());
        return matchesRegion && matchesHalalStatus && matchesFoodSupport;
    });
};
