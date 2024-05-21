import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with actual API base URL

export const getInvestors = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/investors`);
        return response.data;
    } catch (error) {
        console.error('Error fetching investors:', error);
        return [];
    }
};

export const getInvestorCommitment = async (assetClass, investorId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/investor/commitment/${assetClass}/${investorId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching commitment information:', error);
        return null;
    }
};