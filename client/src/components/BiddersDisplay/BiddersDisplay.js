import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BiddersDisplay.css';

const AdminBiddersPage = () => {
    const [flocksWithBids, setFlocksWithBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBiddersData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/admin/bidders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFlocksWithBids(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching bidders data');
            } finally {
                setLoading(false);
            }
        };

        fetchBiddersData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="admin-bidders-container">
            <h1>Bidders for Each Flock</h1>
            {flocksWithBids.length === 0 ? (
                <p>No bids found</p>
            ) : (
                flocksWithBids.map(flock => (
                    <div key={flock.id} className="flock-bidders">
                        <h2>{flock.name}</h2>
                        {flock.bids.length === 0 ? (
                            <p>No bids for this flock</p>
                        ) : (
                            <table>
                                <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Bid Amount</th>
                                    <th>Size</th>
                                </tr>
                                </thead>
                                <tbody>
                                {flock.bids.map((bid, index) => (
                                    <tr key={index}>
                                        <td>{bid.user.username}</td>
                                        <td>{bid.user.email}</td>
                                        <td>${bid.amount}</td>
                                        <td>{bid.size}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminBiddersPage;
