import { Challenge } from "../lib/challenge";
import { SPELLED_OUT_NUMBERS } from "../src/constants";

export const one = (data: string): number =>
	data
		.split("\n")
		.map((line) => [...line].filter(Number))
		.map((nums) =>
			Number.parseInt(
				nums.length >= 2 ? nums[0] + nums[nums.length - 1] : nums[0] + nums[0]
			)
		)
		.reduce((acc, curr) => acc + curr, 0);

export const two = (data: string): number =>
	data
		.split("\n")
		.map((line) =>
			Number.parseInt(
				[
					...line.matchAll(
						new RegExp(
							`(?=(${Object.keys(SPELLED_OUT_NUMBERS).join("|")}|\\d))`,
							"g"
						)
					),
				]
					.map((x) => SPELLED_OUT_NUMBERS[x[1]]?.toString() || x[1])
					.reduce(
						(acc, num, index, nums) =>
							acc +
							(index === 0
								? nums.length >= 2
									? nums[0] + nums.at(-1)
									: nums[0] + nums[0]
								: ""),
						""
					)
			)
		)
		.reduce((acc, curr) => acc + curr, 0);

const challenge = new Challenge({
	dir: import.meta.dir,
	samples: {
		one: [
			`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
			142,
		],
		two: [
			`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
			281,
		],
	},
	solutions: {
		one,
		two,
	},
});

challenge.test();
challenge.run();
