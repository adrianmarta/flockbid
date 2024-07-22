// src/components/HomePage/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import CSS for styling

const HomePage = () => {
    const [flocks, setFlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlocks = async () => {
            try {
                const response = await axios.get('/api/flocks');
                setFlocks(response.data);
            } catch (err) {
                setError('Failed to fetch flocks');
            } finally {
                setLoading(false);
            }
        };

        fetchFlocks();
    }, []);

    return (
        <div className="home-page">
            <header className="header">
                <h1>FlockBid</h1>
                <div className="header-buttons">
                    <Link to="/add-flock" className="header-button">Add Flock</Link>
                    <button className="header-button">Sign Out</button>
                </div>
            </header>
            <main className="flock-container">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {flocks.length === 0 && <p>No flocks available</p>}
                {flocks.map(flock => (
                    <div key={flock._id} className="flock-card">
                        <div className="flock-images">
                            {flock.images.length > 0 ? (
                                flock.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`/uploads/${image}`} // Adjust the path to your file storage
                                        alt={flock.name}
                                        className="flock-image"
                                    />
                                ))
                            ) : (
                                <div className="no-image">No Image</div>
                            )}
                        </div>
                        <div className="flock-info">
                            <h2 className="flock-name">{flock.name}</h2>
                            <p className="flock-price">${flock.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default HomePage;
