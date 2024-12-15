import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuotes } from '../api/quotes.ts';
import { Quote } from '../types/index';
import { getRelativeTime } from '../utils/function.ts';

const QuoteListPage: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const limit = 20;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuotes = async () => {
            if (!token || loading || !hasMore) return;

            setLoading(true);

            try {
                const data = await getQuotes(token, limit, offset);
                setQuotes((prev) => [...prev, ...data.data]);
                if (data.data.length < limit) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Failed to fetch quotes:', error);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
    }, [offset, token]);

    // Scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !loading) {
                setOffset((prevOffset) => prevOffset + limit);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow p-4">
                <h1 className="text-2xl font-semibold text-gray-800">Quotes</h1>
            </header>

            <main className="flex-1 p-4 grid grid-cols-2 gap-3">
                {quotes.map((quote, index) => (
                    <div
                        key={quote.id + "_" + index}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="relative h-64">
                            <img
                                src={quote.mediaUrl}
                                alt="Quote"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <p className="text-white text-lg font-bold px-4 text-center">{quote.text}</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-700">Posted by: {quote.username}</p>
                            <p className="text-xs text-gray-500">
                                Published - {new Date(quote.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">
                                Updated - {getRelativeTime(quote.updatedAt)}
                            </p>
                        </div>
                    </div>
                ))}

                {!hasMore && quotes.length === 0 && (
                    <p className="text-center text-gray-500">No quotes found.</p>
                )}

                {loading && hasMore && (
                    <p className="text-center text-blue-500">Loading...</p>
                )}
            </main>

            <button
                onClick={() => navigate('/create-quote')}
                className="fixed leading-none bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
            >
                +
            </button>
        </div>
    );
};

export default QuoteListPage;