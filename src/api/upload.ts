export const uploadMedia = async (file: File): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('https://crafto.app/crafto/v1.0/media/assignment/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Media upload failed');
        }

        const data = await response.json();
        return data?.[0]?.url || null;
    } catch (error) {
        return null
    }
};
