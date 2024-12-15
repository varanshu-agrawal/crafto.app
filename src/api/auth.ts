import axios from 'axios';

const BASE_URL = 'https://assignment.stage.crafto.app';

export const login = async (username: string, otp: string) => {
    const response = await axios.post(`${BASE_URL}/login`, { username, otp });
    return response.data.token; // Assuming token is returned
};