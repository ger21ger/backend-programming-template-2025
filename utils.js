// utils.js
function multiply(a, b) { return a * b; }
function square(a) { return a ** 2; }
function divide(a, b) { return a / b; }

module.exports ={
    multiply,
    square,
    divide,
};

// index.js
const { square, divide } = require('./utils');

console.log(square(3));
console.log(divide(10, 2));