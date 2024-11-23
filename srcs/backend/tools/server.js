const express = require('express');
const axios = require('axios');
const app = express();

// Load sensitive information from environment variables
const clientId = process.env.ACCESS_KEY;
const clientSecret = process.env.SECRET_KEY;
const redirectUri = process.env.REDIRECT_URI;

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send("Authorization code is missing.");
    }

    try {
        // Exchange authorization code for access token
        const response = await axios.post('https://unsplash.com/oauth/token', {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: code,
            grant_type: "authorization_code"
        });

        const accessToken = response.data.access_token;
        console.log("Access Token:", accessToken);

        res.send("Authentication successful! You can close this tab.");
    } catch (error) {
        console.error("Error exchanging code for token:", error);
        res.status(500).send("An error occurred during authentication.");
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
