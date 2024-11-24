const fetch = require('node-fetch');
const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Declare the database
let database = {};

// Load sensitive information from environment variables
const clientId = process.env.ACCESS_KEY;
const clientSecret = process.env.SECRET_KEY;
const redirectUri = process.env.REDIRECT_URI;
let loggedIn = false;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// Redirect user to Unsplash authorization page
app.get('/auth/login', (req, res) => {
    console.log("Redirecting to authentication ...");
    const authUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public`;
    res.redirect(authUrl);
});

// Handle callback from Unsplash
app.get('/auth/callback', async (req, res) => {
  console.log("Handling callback ...");
  const code = req.query.code;
  // Make a POST request to https://unsplash.com/oauth/token with the code
  try {
    const response = await axios.post('https://unsplash.com/oauth/token', {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code,
      grant_type: 'authorization_code'
    });
    const accessToken = response.data.access_token;
    console.log(`Access token: ${accessToken}`);
    // redirect to homepage
    res.redirect('http://localhost:8443/');
    // Redirect user to the home page
    loggedIn = true;
  }
  catch (error) {
    console.error(error);
    res.send('An error occurred');
  }
}
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Check if user is authenticated
app.get('/api/check-auth', (req, res) => {
  console.log("Checking authentication ...");
  console.log("loggedIn:", loggedIn);
  res.json({ loggedIn: loggedIn });
});

// Handle favorites pictures
let favorites = [];
app.post('/api/favorite', (req, res) => {
  console.log("Fetching favorites ...");
  console.log("Request body:", req.body);
  const { photoId } = req.body;

  // Save in database
  if (!favorites.includes(photoId)) {
    favorites.push(photoId);
    console.log(`Photo ${photoId} added to favorites.`);
    console.log('favorites:', favorites);
    res.json({ status: 'added' });
  }
  else {
    console.log(`Photo ${photoId} is already in favorites.`);
    res.json({ status: 'already added' });
  }
});

app.get('/api/favorites', (req, res) => {
  console.log("Fetching favorites ...");
  res.json({ favorites });
});
