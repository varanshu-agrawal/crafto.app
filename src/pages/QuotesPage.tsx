import React, { useState } from 'react';
import { getQuotes } from '../api/quotes.ts';
import QuoteCard from '../components/QuoteCard.tsx';
import FloatingButton from '../components/FloatingButton.tsx';
import { useNavigate } from 'react-router-dom';

const QuotesPage: React.FC = () => {
    const [quotes, setQuotes] = useState<any>([]);
    const [offset, setOffset] = useState(0);
    const limit = 20;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchQuotes = async () => {
        if (!token) return;
        const data = await getQuotes(token, limit, offset);
        setQuotes((prev): any => [...prev, ...data.data]);
        if (data.length < limit) setOffset(-1); // Stop pagination
    };

    const handleLoadMore = () => {
        if (offset !== -1) {
            setOffset((prev) => prev + limit);
            fetchQuotes();
        }
    };

    return (
        <div>
            <h1>Quotes</h1>
            {quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
            ))}
            {offset !== -1 && <button onClick={handleLoadMore}>Load More</button>}
            <FloatingButton onClick={() => navigate('/create-quote')} />
        </div>
    );
};

export default QuotesPage;