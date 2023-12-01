export type { BunFile as LazyFile } from "bun";

export type Sample = [string, number];

export type Samples = {
	one: Sample;
	two: Sample;
};

export type Solution = (input: string) => unknown;

export type Solutions = {
	one: Solution;
	two: Solution;
};
