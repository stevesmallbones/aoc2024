// Part 1
const part1 = (input) => {
    const leftArray = [];
    const rightArray = [];

    input.forEach(line => {
        const [left, right] = line.split(/\s+/);
        leftArray.push(parseInt(left, 10));
        rightArray.push(parseInt(right, 10));
    });

    leftArray.sort((a, b) => a - b);
    rightArray.sort((a, b) => a - b);

    let total = 0;
    for (let i = 0; i < leftArray.length; i++) {
        total += Math.abs(leftArray[i] - rightArray[i]);
    }

    return total;
};

// Part 2
const part2 = (input) => {
    const leftArray = [];
    const rightArray = [];

    input.forEach(line => {
        const [left, right] = line.split(/\s+/);
        leftArray.push(parseInt(left, 10));
        rightArray.push(parseInt(right, 10));
    });

    let total = 0;
    for (let i = 0; i < leftArray.length; i++) {
        const count = rightArray.filter(num => num === leftArray[i]).length;
        total += Math.abs(leftArray[i] * count);
    }

    return total;
};

module.exports = { part1, part2 };