import React, { useState } from 'react';
import { uploadImage } from '../api/upload.ts';
import { createQuote } from '../api/quotes.ts';

const CreateQuotePage: React.FC = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const token = localStorage.getItem('token');

    const handleSubmit = async () => {
        if (!file || !token) return;

        try {
            const mediaUrl = await uploadImage(file);
            await createQuote(token, text, mediaUrl);
            alert('Quote created successfully');
        } catch (error) {
            console.error('Failed to create quote', error);
        }
    };

    return (
        <div>
            <h1>Create Quote</h1>
            <input placeholder="Quote Text" value={text} onChange={(e) => setText(e.target.value)} />
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CreateQuotePage;