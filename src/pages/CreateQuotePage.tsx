import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuote } from '../api/quotes.ts';
import { uploadMedia } from '../api/upload.ts';

const QuoteCreationPage: React.FC = () => {
    const [quoteText, setQuoteText] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!quoteText || !image) {
            setError('Both text and image are required.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const mediaUrl = await uploadMedia(image);
            if (!mediaUrl) throw ("error uploading image")
            await createQuote(token, { text: quoteText, mediaUrl });
            navigate('/quotes');
        } catch (err) {
            console.error(err);
            setError('Failed to create quote. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow p-4">
                <h1 className="text-2xl font-semibold text-gray-800">Create Quote</h1>
            </header>

            <main className="flex-1 p-4 space-y-6">
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md">
                        {error}
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label
                            htmlFor="quoteText"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Quote Text
                        </label>
                        <textarea
                            id="quoteText"
                            rows={4}
                            value={quoteText}
                            onChange={(e) => setQuoteText(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Enter your quote text here..."
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="imageUpload"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    {image && (
                        <div className="mb-4">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-full h-64 object-cover rounded-md shadow-md"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        className={`w-full py-3 rounded-lg text-white font-semibold ${isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                            } focus:outline-none`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Quote'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default QuoteCreationPage;