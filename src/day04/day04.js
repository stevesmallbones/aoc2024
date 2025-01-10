const { readFileSync } = require('fs');
const { resolve } = require('path');

// Read the input file
const rawInput = readFileSync(resolve(__dirname, 'day04.txt'), 'utf8');
const cleanInput = rawInput.trim().split('\n');

// Convert the input into a grid
const grid = cleanInput.map(line => line.split(''));

// Define movement directions
const moves = {
    right: (row, col) => [row, col + 1],
    left: (row, col) => [row, col - 1],
    up: (row, col) => [row - 1, col],
    down: (row, col) => [row + 1, col],
    upRight: (row, col) => [row - 1, col + 1],
    upLeft: (row, col) => [row - 1, col - 1],
    downRight: (row, col) => [row + 1, col + 1],
    downLeft: (row, col) => [row + 1, col - 1],
};

const rows = grid.length;
const cols = grid[0].length;
const word = "XMAS";
let hits = 0;

// Check if a position is within bounds
function isInBounds(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

// Check for the word in all directions
function checkForWord(row, col, word) {
    let count = 0;

    for (let direction in moves) {
        let [newRow, newCol] = [row, col];
        let matched = true;

        // Traverse for the length of the word
        for (let i = 0; i < word.length; i++) {
            if (
                isInBounds(newRow, newCol) && 
                grid[newRow][newCol] === word[i]
            ) {
                [newRow, newCol] = moves[direction](newRow, newCol);
            } else {
                matched = false;
                break;
            }
        }

        if (matched) count++;
    }

    return count;
}

// Main loop: Find all occurrences of "XMAS"
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        if (grid[row][col] === 'X') {
            hits += checkForWord(row, col, word);
        }
    }
}

console.log('Total hits for XMAS:', hits);

// Part 2
// Check if the center forms the "MAS" X-pattern
// Check if the center forms the "MAS" X-pattern (forward or backward)
let part2hits = 0;
function isXPattern(centerRow, centerCol) {
    // Define positions for the "X" pattern
    const positions = {
        topLeft: [centerRow - 1, centerCol - 1],
        topRight: [centerRow - 1, centerCol + 1],
        bottomLeft: [centerRow + 1, centerCol - 1],
        bottomRight: [centerRow + 1, centerCol + 1],
    };

    // Ensure all positions are within bounds
    for (const [row, col] of Object.values(positions)) {
        if (!isInBounds(row, col)) return false;
    }

    // Ensure the center is "A"
    if (grid[centerRow][centerCol] !== 'A') return false;

    // Validate top-left ↔ bottom-right pair
    const topLeftBottomRightValid =
        (grid[positions.topLeft[0]][positions.topLeft[1]] === 'M' &&
         grid[positions.bottomRight[0]][positions.bottomRight[1]] === 'S') || // Forward
        (grid[positions.topLeft[0]][positions.topLeft[1]] === 'S' &&
         grid[positions.bottomRight[0]][positions.bottomRight[1]] === 'M');   // Backward

    // Validate top-right ↔ bottom-left pair
    const topRightBottomLeftValid =
        (grid[positions.topRight[0]][positions.topRight[1]] === 'S' &&
         grid[positions.bottomLeft[0]][positions.bottomLeft[1]] === 'M') || // Forward
        (grid[positions.topRight[0]][positions.topRight[1]] === 'M' &&
         grid[positions.bottomLeft[0]][positions.bottomLeft[1]] === 'S');   // Backward

    // Return true only if both pairs are valid
    return topLeftBottomRightValid && topRightBottomLeftValid;
}

// Iterate through the grid
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        if (isXPattern(row, col)) {
            part2hits++;
            console.log(`Match found at (${row}, ${col})`);

            // Build the "X-pattern" output
            const topLeft = grid[row - 1]?.[col - 1] || ' ';
            const topRight = grid[row - 1]?.[col + 1] || ' ';
            const bottomLeft = grid[row + 1]?.[col - 1] || ' ';
            const bottomRight = grid[row + 1]?.[col + 1] || ' ';
            const center = grid[row][col];

            console.log('MAS X-pattern:');
            console.log(` ${topLeft}   ${topRight}`);
            console.log(`   ${center}   `);
            console.log(` ${bottomLeft}   ${bottomRight}`);
        }
    }
}

console.log('Total hits for MAS X-pattern:', part2hits);