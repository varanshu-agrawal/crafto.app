import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import CreateQuotePage from './pages/CreateQuotePage.tsx';
import "./App.css"
import QuoteListPage from './pages/QuoteListPage.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/quotes" element={<QuoteListPage />} />
                <Route path="/create-quote" element={<CreateQuotePage />} />
            </Routes>
        </Router>
    );
};

export default App;