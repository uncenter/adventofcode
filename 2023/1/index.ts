import { join } from "path";

let sample = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const input = Bun.file(join(import.meta.dir, "./input.txt"));

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

// console.log(one(sample) === 142);
// true
// console.log(one(await input.text()));
// 55816

const num_strings: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

export const two = (data: string): number =>
	data
		.split("\n")
		.map((line) =>
			Number.parseInt(
				[
					...line.matchAll(
						new RegExp(`(?=(${Object.keys(num_strings).join("|")}|\\d))`, "g")
					),
				]
					.map((x) => x[1])
					.map((num_str) => num_strings[num_str]?.toString() || num_str)
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

sample = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

// console.log(two(sample) === 281);
// true
// console.log(two(await input.text()));
// 54980
