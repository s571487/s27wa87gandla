const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Generate a random value between 1 and 100
const generateRandomValue = () => Math.floor(Math.random() * 100) + 1;

// Function to apply based on the last digit of the ID
const applyFunction = (id, x) => {
    const lastDigit = id % 10;
    const value = x || generateRandomValue();

    let result;
    switch (lastDigit) {
        case 0:
        case 5:
            result = Math.cos(value);
            break;
        case 1:
        case 6:
            result = Math.asin(value);
            break;
        case 2:
        case 7:
            result = Math.asinh(value);
            break;
        default:
            result = 'Invalid ID';
    }

    return result;
};

// Endpoint for computation
app.get('/computation', (req, res) => {
    const { id } = req.query;
    const x = req.query.x ? parseFloat(req.query.x) : null;

    if (!id || isNaN(parseFloat(id))) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const result = applyFunction(parseFloat(id), x);
    const responseString = `[fn] applied to [x] is ${result}`;
    const functionName = result === 'Invalid ID' ? 'Invalid ID' : result.name; // Get function name for the response

    const response = responseString.replace('[fn]', functionName).replace('[x]', x ? x.toString() : 'random value');

    res.json({ result: response });
});

module.exports = router;
