import { Challenge } from "../lib/challenge";

export const one = (data: string) =>
	data
		.split("\n")
		.map((line) => {
			const [winners, numbers] = line
				.split(": ")[1]
				.split(" | ")
				.map((set) => set.split(" ").map((each) => each.trim()));
			const matches = winners.filter(
				(winner) => numbers.includes(winner) && winner !== ""
			);
			return matches.length > 0 ? 1 * 2 ** (matches.length - 1) : 0;
		})
		.reduce((acc, curr) => acc + curr, 0);

export const two = (data: string) => {
	const cards = data.split("\n").map((line) => {
		const [winners, numbers] = line
			.slice(8)
			.split(" | ")
			.map((set) => set.split(" ").map((each) => each.trim()));
		const matches = winners.filter(
			(winner) => winner && numbers.includes(winner)
		);
		return [matches.length, 1];
	});

	let total = 0;
	for (let i = 0; i < cards.length; i++) {
		let [value, multiplier] = cards[i];
		total += multiplier;
		while (multiplier > 0) {
			for (let j = 0; j < value; j++) {
				cards[i + j + 1][1] = cards[i + j + 1][1] + 1;
			}
			multiplier -= 1;
		}
	}
	return total;
};
export const challenge = new Challenge({
	samples: {
		one: [
			`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
			13,
		],
		two: [
			`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
			30,
		],
	},
	solutions: {
		one,
		two,
	},
});
