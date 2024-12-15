import axios from 'axios';

const BASE_URL = 'https://assignment.stage.crafto.app';

export const getQuotes = async (token: string, limit: number, offset: number) => {
    const response = await axios.get(`${BASE_URL}/getQuotes`, {
        params: { limit, offset },
        headers: { Authorization: token },
    });
    return response.data;
};

export const createQuote = async (token: string, text: string, mediaUrl: string) => {
    const response = await axios.post(
        `${BASE_URL}/postQuote`,
        { text, mediaUrl },
        { headers: { Authorization: token, 'Content-Type': 'application/json' } }
    );
    return response.data;
};