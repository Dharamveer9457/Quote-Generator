const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000; 
const axios = require("axios"); 
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Define an endpoint to generate quotes
app.get("/get-quote/:theme", async (req, res) => {
    try {
        const theme = req.params.theme;
        const apiKey = process.env.apikey;

        // Make a GET request to OpenAI to fetch a random quote
        const response = await axios.post(
            "https://api.openai.com/v1/engines/text-davinci-002/completions",
            {
                prompt: `Generate a single random quote related to ${theme}. No need to write author's name, just write the single quote only.`,
                max_tokens: 100, // Adjust the token limit as needed
                n: 1, // Number of completions to generate
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        // Extract the generated quote from the OpenAI response
        const randomQuote = response.data.choices[0].text;

        res.json({ quote: randomQuote });
    } catch (error) {
        console.error("Error fetching quote:", error);
        res.status(500).json({ error: "Failed to fetch a quote" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
