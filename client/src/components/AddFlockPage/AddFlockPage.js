// src/components/AddFlockPage.js
import React, { useState } from 'react';
import axios from './../../axiosConfig';
import './AddFlockPage.css';
import {Link, useNavigate} from "react-router-dom"; // Import CSS for styling

const AddFlockPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        numberOfSheep: '',
        biddingEndDate: '',
        description: '',
        price: ''
    });
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate= useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('origin', formData.origin);
            data.append('numberOfSheep', formData.numberOfSheep);
            data.append('biddingEndDate', formData.biddingEndDate);
            data.append('description', formData.description);
            data.append('price', formData.price);

            for (let i = 0; i < files.length; i++) {
                data.append('images', files[i]);
            }

            const response = await axios.post('/flocks', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess(response.data.message);
            setFormData({
                name: '',
                origin: '',
                numberOfSheep: '',
                biddingEndDate: '',
                description: '',
                price: ''
            });
            setFiles([]);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <div className="flock-page">
            <header className="header">
                <h1>FlockBid</h1>
                <div className="header-buttons">

                    <button onClick={handleLogout}>Sign Out</button>
                </div>
            </header>
            <div className="add-flock-container">
                <div className="form-container">
                    <h2>Add a New Flock</h2>
                    {success && <p className="success-message">{success}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="origin">Origin:</label>
                            <input
                                type="text"
                                id="origin"
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="numberOfSheep">Number of Sheep:</label>
                            <input
                                type="number"
                                id="numberOfSheep"
                                name="numberOfSheep"
                                value={formData.numberOfSheep}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="biddingEndDate">Bidding End Date:</label>
                            <input
                                type="datetime-local"
                                id="biddingEndDate"
                                name="biddingEndDate"
                                value={formData.biddingEndDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="images">Upload Images:</label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Add Flock'}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );

};

export default AddFlockPage;
