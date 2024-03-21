const express = require('express');
const router = express.Router();

function getCircleX(radians, radius) {
  return Math.cos(radians) * radius;
}

function calcAngle(opposite, hypotenuse) {
  return Math.asin(opposite / hypotenuse);
}

router.get('/', (req, res) => {
    const x = req.query.x ? parseFloat(req.query.x) : Math.random() * 100; 
    const radians = Math.random() * Math.PI * 2;
    const radius = Math.random() * 10 + 1; 

    const opposite = getCircleX(radians, radius);
    const hypotenuse = radius;

    const y = calcAngle(opposite, hypotenuse);

    const result = [];

    result.push({ name: 'Math.cos', value: Math.cos(radians) });

    result.push({ name: 'Math.asin', value: Math.asin(y) });

    result.push({ name: 'Math.asinh', value: Math.asinh(x) });

    const response = `${x} radians applied to radius ${radius} is ${y}`;

    res.json({ result: response, functions: result });
});

module.exports = router;
