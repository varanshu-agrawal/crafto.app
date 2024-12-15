import axios from 'axios';

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
        'https://crafto.app/crafto/v1.0/media/assignment/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return response.data.mediaUrl; // Assuming mediaUrl is returned
};