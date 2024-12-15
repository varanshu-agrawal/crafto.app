import axios from 'axios';

const BASE_URL = 'https://assignment.stage.crafto.app';

export const getQuotes = async (token: string, limit: number, offset: number) => {
    const response = await axios.get(`${BASE_URL}/getQuotes`, {
        params: { limit, offset },
        headers: { Authorization: token },
    });
    return response.data;
};

export const createQuote = async (token: string | null, quoteData: { text: string; mediaUrl: string }) => {
    const response = await fetch('https://assignment.stage.crafto.app/postQuote', {
        method: 'POST',
        headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
    });

    if (!response.ok) {
        throw new Error('Failed to create quote');
    }

    return response.json();
};