// src/components/InitialPage/InitialPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InitialPage.css'; // Import the CSS file for styling

const InitialPage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="image-gallery">
                <div className="image-item">
                    <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/flock-of-sheep-grazing-in-field-image-by-jack-vimes.jpg" alt="Placeholder 1" />
                </div>
                <div className="image-item">
                    <img src="https://images.ctfassets.net/pujs1b1v0165/7v9UInTyt0kSlUfocUufyJ/5c5dfdd2be706601823f7bee315b23ed/What_you_need_to_know_about_raising_sheep.jpg?w=1280" alt="Placeholder 2" />
                </div>
                <div className="image-item">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/036/042/581/original/flock-of-sheep-on-the-mountain-winter-landscape-with-himalayas-in-the-background-kashmir-india-video.jpg" alt="Placeholder 3" />
                </div>
            </div>
            <div className="text-box">
                <p>Welcome to our application. Explore our features and enjoy your stay!</p>
            </div>
            <div className="button-group">
                <button onClick={() => navigate('/users')}>See Flocks</button>
                <button onClick={() => navigate('/create')}>Sign Up</button>
                <button onClick={() => navigate('/login')}>Log In</button>
            </div>
        </div>
    );
};

export default InitialPage;
