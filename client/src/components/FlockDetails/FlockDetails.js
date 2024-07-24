import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FlockDetails.css';
import {jwtDecode} from "jwt-decode"; // Import the CSS file for styling

const FlockDetails = () => {
    const { id } = useParams();
    const [flock, setFlock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [biddingValue, setBiddingValue] = useState('');
    const [sheepSize, setSheepSize] = useState('');
    const [showBidInput, setShowBidInput] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const fetchFlock = async () => {
            try {
                const response = await axios.get(`/api/flocks/${id}`);
                setFlock(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching flock details');
            } finally {
                setLoading(false);
            }
        };

        fetchFlock();
    }, [id]);

    useEffect(() => {
        if (flock) {
            const interval = setInterval(() => {
                const now = new Date();
                const biddingEndDate = new Date(flock.biddingEndDate);
                const timeDifference = biddingEndDate - now;
                if (timeDifference <= 0) {
                    setTimeLeft('Bidding has ended');
                    clearInterval(interval);
                } else {
                    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
                    const seconds = Math.floor((timeDifference / 1000) % 60);
                    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [flock]);

    const handleBid = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id; // Adjust based on your token's payload structure

            const response = await axios.post(`/api/flocks/${id}/bid`, {
                userId: userId,
                amount: biddingValue,
                sheepSize
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Bid placed successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Error placing bid');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flock-details-container">
            <h1>{flock.name}</h1>
            <p>{flock.description}</p>
            <p>Price: ${flock.price}</p>
            <p>Bidding ends in: {timeLeft}</p>
            {flock.images && flock.images.map((image, index) => (
                <img key={index} src={`/uploads/${image}`} alt={flock.name} />
            ))}
            <button onClick={() => setShowBidInput(!showBidInput)}>
                {showBidInput ? 'Cancel' : 'Place a Bid'}
            </button>
            {showBidInput && (
                <div className="bid-input-container">
                    <input
                        type="number"
                        placeholder="Bid Value"
                        value={biddingValue}
                        onChange={(e) => setBiddingValue(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Sheep Size"
                        value={sheepSize}
                        onChange={(e) => setSheepSize(e.target.value)}
                        required
                    />
                    <button onClick={handleBid}>Submit Bid</button>
                </div>
            )}
        </div>
    );
};

export default FlockDetails;
