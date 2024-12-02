const { readFileSync } = require('fs');
const { resolve } = require('path');

const rawInput = readFileSync(resolve(__dirname, 'day01.txt'), 'utf8');
const cleanInput = rawInput.toString()
                            .trim()
                            .split('\n');

// Part 1
// sort the arrays and total up the difference between each array item
const part1 = (input) => {
    // Initialize two arrays for the left and right items
    const leftArray = [];
    const rightArray = [];

    // Loop through each line and split into the two arrays
    cleanInput.forEach(line => {
        const [left, right] = line.split(/\s+/); // Split by whitespace
        leftArray.push(parseInt(left, 10)); // Convert to integer
        rightArray.push(parseInt(right, 10)); // Convert to integer
    });

    // Sort the arrays
    leftArray.sort((a, b) => a - b);
    rightArray.sort((a, b) => a - b);

    // Initialize the total
    let total = 0;

    // Loop through the arrays and calculate the difference
    for (let i = 0; i < leftArray.length; i++) {
        total += Math.abs(leftArray[i] - rightArray[i]);
    }

    console.log("Part 1 result: " + total);
}

part1(cleanInput);

// Part 2
// multiply the left number by the number of times it appears in the rightArray
const part2 = (input) => {
    // Initialize two arrays for the left and right items
    const leftArray = [];
    const rightArray = [];

    // Loop through each line and split into the two arrays
    cleanInput.forEach(line => {
        const [left, right] = line.split(/\s+/); // Split by whitespace
        leftArray.push(parseInt(left, 10)); // Convert to integer
        rightArray.push(parseInt(right, 10)); // Convert to integer
    });

    // Initialize the total
    let total = 0;

    // Loop through the leftArray
    for (let i = 0; i < leftArray.length; i++) {
        //count how many times the left number appears in the rightArray
        const count = rightArray.filter(num => num === leftArray[i]).length;
        // Multiply the left number by the count and add to the total
        total += Math.abs(leftArray[i] * count);
    }

    console.log("Part 2 result: " + total);
}

part2(cleanInput);

// Part 1 result: 1722302
// Part 2 result: 20373490