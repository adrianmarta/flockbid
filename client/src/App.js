// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUser from './components/createUser/createUser';
import UserList from './components/UserList';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import AddFlockPage from './components/AddFlockPage/AddFlockPage';
import InitialPage from "./components/InitialPage/InitialPage";
import FlockDetails from "./components/FlockDetails/FlockDetails";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<InitialPage />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/create" element={<CreateUser />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/add-flock" element={<AddFlockPage />} />
                <Route path="/flock-details/:id" element={<FlockDetails />} />
            </Routes>
        </div>
    );
};

export default App;
