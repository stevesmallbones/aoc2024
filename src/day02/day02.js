const { readFileSync } = require('fs');
const { resolve } = require('path');

const rawInput = readFileSync(resolve(__dirname, 'day02.txt'), 'utf8');
const cleanInput = rawInput
    .toString()
    .trim()
    .split('\n')
    .map(line => line.split(/\s+/).map(num => parseInt(num, 10)));

// Part 1
// Check if a report is valid based on the rules
const isValidReport = (report) => {
    let direction = null;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        // Determine direction on the first comparison
        if (direction === null) {
            direction = diff > 0 ? 'increasing' : 'decreasing';
        }

        // Check if the direction is maintained
        if ((direction === 'increasing' && diff < 0) || 
            (direction === 'decreasing' && diff > 0)) {
            return false;
        }

        // Check if the difference is between 1 and 3
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
    }

    return true;
};

// Part 1: Count valid reports
const part1 = (input) => {
    const safeCount = input.filter(isValidReport).length;
    console.log('Part 1 Safe Reports Count:', safeCount);
};

part1(cleanInput);

// Part 2
// Allow a report to be valid if there is a single bad level
// Helper function to check if a sequence is safe
const isSafe = (report) => {
    if (report.length <= 1) return true;

    let direction = null;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        // Determine direction on the first comparison
        if (direction === null) {
            direction = diff > 0 ? 'increasing' : 'decreasing';
        }

        // Check direction consistency
        if ((direction === 'increasing' && diff < 0) || 
            (direction === 'decreasing' && diff > 0)) {
            return false;
        }

        // Check difference range
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
    }

    return true;
};

const isValidReport2 = (report) => {
    if (isSafe(report)) return true;

    // Try removing each value and check if the sequence becomes valid
    for (let i = 0; i < report.length; i++) {
        const removed = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isSafe(removed)) {
            console.log(`report made safe by removing index ${i}:`, removed);
            return true;
        }
    }

    // If no single removal makes it valid, return false
    return false;
};

// Part 2: Count valid reports
const part2 = (input) => {
    const safeCount = input.filter(isValidReport2).length;
    console.log('Part 2 Safe Reports Count:', safeCount);
};

part2(cleanInput);