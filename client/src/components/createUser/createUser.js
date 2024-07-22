// src/components/CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';
import './createUser.css'; // Import the CSS file for styling

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        isAdmin: false // Add isAdmin field
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('/api/users/register', formData);
            localStorage.setItem('token', response.data.token); // Store the token
            setSuccess(response.data.message);
            setFormData({
                username: '',
                email: '',
                password: '',
                isAdmin: false
            });
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-user-container">
            <div className="form-container">
                <h2>Sign Up</h2>
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Name:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
