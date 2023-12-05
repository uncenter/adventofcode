import { Challenge } from "../lib/challenge";

export const one = (data: string) =>
	data
		.split("\n")
		.map((game) =>
			game
				.split(": ")[1]
				.split("; ")
				.map((set) =>
					set
						.split(", ")
						.map((cube) => {
							return {
								color: cube.split(" ")[1],
								count: Number(cube.split(" ")[0]),
							};
						})
						.reduce(
							(acc, cube, index, cubes) => {
								// @ts-expect-error
								acc[cube.color] = acc[cube.color] + cube.count;
								return acc;
							},
							{
								red: 0,
								green: 0,
								blue: 0,
							},
						),
				)
				.some((set) => set.red > 12 || set.green > 13 || set.blue > 14)
				? 0
				: Number(game.split(": ")[0].split(" ")[1]),
		)
		.reduce((acc, game, index, games) => acc + game, 0);

export const two = (data: string) =>
	data
		.split("\n")
		.map((game) =>
			Object.values(
				game
					.split(": ")[1]
					.split("; ")
					.map((set) =>
						set
							.split(", ")
							.map((cube) => {
								return {
									color: cube.split(" ")[1],
									count: Number(cube.split(" ")[0]),
								};
							})
							.reduce(
								(acc, cube, index, cubes) => {
									// @ts-expect-error
									acc[cube.color] = acc[cube.color] + cube.count;
									return acc;
								},
								{
									red: 0,
									green: 0,
									blue: 0,
								},
							),
					)
					.reduce(
						(acc, set, index, sets) => {
							return {
								red: set.red > acc.red ? set.red : acc.red,
								green: set.green > acc.green ? set.green : acc.green,
								blue: set.blue > acc.blue ? set.blue : acc.blue,
							};
						},
						{ red: 0, green: 0, blue: 0 },
					),
			).reduce((acc, game, index, games) => acc * game, 1),
		)
		.reduce((acc, game, index, games) => acc + game, 0);

export const challenge = new Challenge({
	samples: {
		one: [
			`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
			8,
		],
		two: [
			`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
			2286,
		],
	},
	solutions: {
		one,
		two,
	},
});
