import { Challenge } from "../lib/challenge";

export const one = (data: string) => {};

export const two = (data: string) => null;

const challenge = new Challenge({
	dir: import.meta.dir,
	samples: {},
	solutions: {},
});

challenge.test();
