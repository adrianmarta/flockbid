import React, { useState, useEffect } from 'react';
import axios from './../../axiosConfig';
import { useParams } from 'react-router-dom';
import './FlockDetails.css';

const FlockDetailsPage = () => {
    const { id } = useParams();
    const [flock, setFlock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlock = async () => {
            try {
                const response = await axios.get(`/api/flocks/${id}`);
                setFlock(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'An error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchFlock();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!flock) {
        return <p>No flock found.</p>;
    }

    return (
        <div className="flock-details-container">
            <h2>{flock.name}</h2>
            <p>Origin: {flock.origin}</p>
            <p>Number of Sheep: {flock.numberOfSheep}</p>
            <p>Bidding End Date: {new Date(flock.biddingEndDate).toLocaleString()}</p>
            <p>Description: {flock.description}</p>
            <p>Price: ${flock.price}</p>
            <div className="flock-images">
                {flock.images.map((image, index) => (
                    <img key={index} src={`/uploads/${image}`} alt={flock.name} />
                ))}
            </div>
        </div>
    );
};

export default FlockDetailsPage;
