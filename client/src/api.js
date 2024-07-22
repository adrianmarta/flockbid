import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const fetchGreeting = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};
