const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.post('/diagnose', async (req, res) => {
    try {
        const { symptoms } = req.body;
        console.log('Received symptoms:', symptoms);

        if (!process.env.AIML_API_KEY) {
            throw new Error('AIML API key is not configured');
        }

        const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AIML_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a medical diagnosis assistant. Analyze the following symptoms and provide a preliminary analysis. Always include disclaimers about consulting healthcare professionals."
                    },
                    {
                        role: "user",
                        content: symptoms
                    }
                ],
                temperature: 0.7,
                max_tokens: 512
            })
        });

        const data = await response.json();
        console.log('API Response:', data);

        // Check for both status codes since different APIs might use different formats
        if (data.statusCode === 400 || !response.ok) {
            throw new Error(data.message || data.error?.message || 'API request failed');
        }

        res.json({
            diagnosis: data.choices[0].message.content
        });

    } catch (error) {
        console.error('Detailed error:', error);
        
        // More detailed error response
        res.status(error.response?.status || 500).json({ 
            error: error.message || 'Something went wrong with the diagnosis request',
            details: error.response?.data || error.stack
        });
    }
});

module.exports = router;