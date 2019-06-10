const express = require('express');
const app = express();

const PORT = 5000;

function handleListneing() {
	console.log(`Listening on: http://localhost:${PORT}`);
}

// argParam
// req: request object
// If we want to get information about who requests pages,
// If you want to know what data is being sent to the pages,
// We will use the request object
// For example, Sending User ID and User Password to the URL using app.POST
// I am going to the information from the server with their request object

// res: response object
// We need to get answers
function handleHome(req, res) {
	console.log(req);
	res.send('Hello from home');
}

function handleProfile(req, res) {
	res.send('You are on my profile');
}

app.get('/', handleHome);
app.get('/profile', handleProfile);

app.listen(PORT, handleListneing);
