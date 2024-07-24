import React, { useState, useEffect } from 'react';
import axios from './../../axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [flocks, setFlocks] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlocks = async () => {
            try {
                const response = await axios.get('/flocks');
                setFlocks(response.data);
            } catch (error) {
                console.error('Error fetching flocks:', error);
            }
        };

        const checkAdmin = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setIsAdmin(decoded.isAdmin);
            }
        };

        fetchFlocks();
        checkAdmin();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleFlockClick = (id) => {
        navigate(`/flocks/${id}`);
    };

    return (
        <div className="home-page">
            <header className="header">
                <h1>FlockBid</h1>
                <div className="header-buttons">
                    {isAdmin && (
                        <Link to="/add-flock">
                            <button>Add Flock</button>
                        </Link>
                    )}
                    <button onClick={handleLogout}>Sign Out</button>
                </div>
            </header>
            <div className="flock-list">
                {flocks.map((flock) => (
                    <div
                        className="flock-box"
                        key={flock._id}
                        onClick={() => handleFlockClick(flock._id)}
                    >
                        {flock.images.length > 0 && (
                            <img src={`/uploads/${flock.images[0]}`} alt={flock.name} />
                        )}
                        <div className="flock-info">
                            <h2>{flock.name}</h2>
                            <p>Price: ${flock.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage
