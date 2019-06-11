//const express = require('express');
import express from 'express';
const app = express();

const PORT = 5000;

const handleListneing = () =>
	console.log(`Listening on: http://localhost:${PORT}`);
const handleHome = (req, res) => res.send('Hello from home');
const handleProfile = (req, res) => res.send('You are on my profile');
const betweenHome = (req, res, next) => {
	console.log('Between');
	next();
};

// Middleware
// app.get('/') from home directory -> app.use(betweenHome) -> handleHome/profile
app.use(betweenHome);
app.get('/', handleHome);
app.get('/profile', handleProfile);

app.listen(PORT, handleListneing);
