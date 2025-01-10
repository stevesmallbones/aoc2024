const { readFileSync } = require('fs');
const { resolve } = require('path');

// Read and parse input
const rawInput = readFileSync(resolve(__dirname, 'day05.txt'), 'utf8').trim();
const lines = rawInput.split('\n');

// Separate the rules and updates
const splitIndex = lines.findIndex(line => !line.includes('|'));
const rules = lines.slice(0, splitIndex).map(line => line.split('|').map(Number));
const updates = lines.slice(splitIndex).map(line => line.split(',').map(Number));

// Function to validate an update
function isUpdateValid(update, rules) {
    const updateSet = new Set(update);
    const validOrder = new Map(update.map((page, index) => [page, index]));

    for (const [x, y] of rules) {
        if (updateSet.has(x) && updateSet.has(y)) {
            if (validOrder.get(x) > validOrder.get(y)) {
                return false;
            }
        }
    }

    return true;
}

// Main function
function solve(rules, updates) {
    let sumOfMiddlePages = 0;

    for (const update of updates) {
        if (isUpdateValid(update, rules)) {
            // Find the middle page
            const middlePage = update[Math.floor(update.length / 2)];
            sumOfMiddlePages += middlePage;
        }
    }

    return sumOfMiddlePages;
}

// Solve the problem
const result = solve(rules, updates);
console.log('Sum of Middle Pages:', result);

// part 2
// Function to reorder an update using topological sort
function reorderUpdate(update, rules) {
    const graph = {};
    const inDegree = {};
    const updateSet = new Set(update);

    // Build graph and compute in-degrees for pages in the update
    update.forEach(page => {
        graph[page] = [];
        inDegree[page] = 0;
    });

    rules.forEach(([x, y]) => {
        if (updateSet.has(x) && updateSet.has(y)) {
            graph[x].push(y);
            inDegree[y]++;
        }
    });

    // Collect nodes with no incoming edges
    const zeroInDegree = [];
    for (const page of update) {
        if (inDegree[page] === 0) {
            zeroInDegree.push(page);
        }
    }

    // Perform topological sort
    const sorted = [];
    while (zeroInDegree.length > 0) {
        const current = zeroInDegree.shift();
        sorted.push(current);

        for (const neighbor of graph[current]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                zeroInDegree.push(neighbor);
            }
        }
    }

    return sorted;
}

// Main function
function solvePartTwo(rules, updates) {
    let sumOfMiddlePages = 0;

    for (const update of updates) {
        if (!isUpdateValid(update, rules)) {
            // Reorder the update
            const correctedOrder = reorderUpdate(update, rules);

            // Find the middle page and add it to the sum
            const middlePage = correctedOrder[Math.floor(correctedOrder.length / 2)];
            sumOfMiddlePages += middlePage;
        }
    }

    return sumOfMiddlePages;
}

// Solve the problem
const result2 = solvePartTwo(rules, updates);
console.log('Sum of Middle Pages (Part Two):', result2);