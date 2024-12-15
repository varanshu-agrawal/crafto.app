import React, { useState } from 'react';
import { login } from '../api/auth.ts';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const token = await login(username, otp);
            localStorage.setItem('token', token);
            navigate('/quotes');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-md py-3 px-5 flex flex-col'>
            <h1 className='text-[2rem] font-semibold mb-3'>Login</h1>
            <div className='flex-1'>&nbsp;</div>
            <div>

                <div className="field-set-animation-container mb-3">
                    <input
                        id="username-field"
                        placeholder="Username"
                        defaultValue={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username-field">Username</label>
                </div>
                <div className="field-set-animation-container mb-3">
                    <input
                        id="otp-field"
                        placeholder="OTP"
                        defaultValue={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <label htmlFor="otp-field">OTP</label>
                </div>
            </div>
            <div className='flex-1'>&nbsp;</div>

            <button onClick={handleLogin} className='py-2 rounded-md border border-black hover:bg-black hover:text-white transition-all'>Submit</button>
        </div>
    );
};

export default LoginPage;