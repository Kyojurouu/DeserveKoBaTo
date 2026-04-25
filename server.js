const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so the frontend can communicate with the backend
app.use(cors());
app.use(express.json());

// Proxy endpoint to communicate with Gemini API
app.post('/api/calculate', async (req, res) => {
    try {
        const { balance, item, cost, excuse } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'API key is not configured on the server.' });
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        const systemPrompt = `You are a brutally honest, slightly toxic Filipino financial advisor.
            Your job is to judge if the user DESERVES to buy an item based on their Bank Balance, the Item Cost, and their Excuse.
            You must return strictly "APPROVED" or "DENIED".
            
            HOW TO JUDGE:
            - DENY them aggressively if: The cost is more than their balance, OR the cost takes up more than 50% of their balance and their excuse is garbage.
            - APPROVE them if: They have plenty of money, OR their excuse is genuinely hilarious/valid.

            RULES FOR APPROVAL (GIRL/BOY MATH):
            - If APPROVED, you must generate a list of creative "deductions" (receipt_items) using fake "Girl Math" or "Boy Math" logic.
            - Examples: "Mental health tax return = -2000", "Cost per wear over 10 years = -5000", "Hindi nag-Starbucks kanina = -200".
            - The sum of all 'deduction' values MUST mathematically bring the original cost down to EXACTLY 0.
            
            RULES FOR DENIAL (REALITY CHECK):
            - If DENIED, the deductions (receipt_items) should sarcastically highlight the reality of their poverty or what they ACTUALLY need to pay for.
            - Examples: "Pamasahe mo pauwi = -50", "Pambayad ng kuryente = -2500", "Dignity deficit = -5000".
            - Your verdict_message must violently roast them in Taglish (e.g., "Wala ka nang makain, concert ticket pa bibilhin mo?!").
            
            OUTPUT:
            You MUST return a JSON object exactly matching the schema.`;

        const userPrompt = `
            Bank Balance: PHP ${balance}
            Item to Buy: ${item}
            Cost: PHP ${cost}
            Excuse: ${excuse}
        `;

        const payload = {
            "system_instruction": {
                "parts": [{ "text": systemPrompt }]
            },
            "contents": [{
                "parts": [{ "text": userPrompt }]
            }],
            "generationConfig": {
                "temperature": 0.9,
                "response_mime_type": "application/json",
                "responseSchema": {
                    "type": "OBJECT",
                    "properties": {
                        "decision": {
                            "type": "STRING",
                            "description": "Strictly 'APPROVED' or 'DENIED'"
                        },
                        "verdict_message": {
                            "type": "STRING",
                            "description": "A passive-aggressive or highly encouraging explanation of the decision."
                        },
                        "receipt_items": {
                            "type": "ARRAY",
                            "description": "List of fake math deductions.",
                            "items": {
                                "type": "OBJECT",
                                "properties": {
                                    "description": { "type": "STRING" },
                                    "deduction": { "type": "NUMBER" }
                                },
                                "required": ["description", "deduction"]
                            }
                        }
                    },
                    "required": ["decision", "verdict_message", "receipt_items"]
                }
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Gemini API request failed');
        }

        const data = await response.json();
        const jsonString = data.candidates[0].content.parts[0].text;
        
        // Send the parsed JSON back to the frontend
        res.json(JSON.parse(jsonString));

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Deserve Ko Ba To Proxy Server running at http://localhost:${PORT}`);
    console.log(`Make sure to open index.html in your browser to test!`);
});
