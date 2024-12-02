const { part1, part2 } = require('./code');

describe('Part 1', () => {
    it('calculates the correct total difference', () => {
        const input = [
            "16435 48069",
            "29877 97906",
            "75256 47355",
            "25417 59861",
            "32479 25840"
        ];

        expect(part1(input)).toBe(272232); // Expected value based on sample input
    });
});

describe('Part 2', () => {
    it('calculates the correct total for left numbers multiplied by their occurrence in rightArray', () => {
        const input = [
            "16435 16435",
            "16435 16435",
            "29877 16435",
            "29877 29877",
            "75256 75256"
        ];

        expect(part2(input)).toBe(493260); // Expected value based on sample input
    });
});