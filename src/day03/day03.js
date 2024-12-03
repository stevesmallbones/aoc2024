const { readFileSync } = require('fs');
const { resolve } = require('path');

const rawInput = readFileSync(resolve(__dirname, 'day03.txt'), 'utf8');
const cleanInput = rawInput
    .toString()
    .trim()

// Part 1
// I'm just going to extract the valid muls using regex.

const part1 = (memoryRecord) => {
    const regex = /mul\((\d+),(\d+)\)/g;
    const matches = memoryRecord.match(regex);
    console.log(matches); // Outputs: ["mul(123,456)", "mul(78,910)"]

    let match;
    const results = [];

    while ((match = regex.exec(matches)) !== null) {
        const firstNumber = parseInt(match[1], 10);
        const secondNumber = parseInt(match[2], 10);
        const product = firstNumber * secondNumber;

        results.push({
            expression: match[0],
            firstNumber,
            secondNumber,
            product
        });
    }

    let total = 0;

    for (const result of results) {
        total += result.product;
    }

    console.log(total);
}
part1(cleanInput);

// Part 2
// I'm going to remove anything between don't and mul
// Then I can just reuse the code I've already written

const part2 = (memoryRecord) => {
    const removeBetween = memoryRecord.replace(/don't\(\).*?do\(\)/gs, "");
    return removeBetween;
}

part1(part2(cleanInput));
