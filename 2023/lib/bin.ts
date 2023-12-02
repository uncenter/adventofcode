#!/usr/bin/env bun

import bin from "tiny-bin";

import { join } from "node:path";

import { Term, range } from "./utils";
import { Challenge } from "./challenge";

const handle = async (args: string[], method: "test" | "run") => {
	if (!/^\d(\.\.\d)?$/.test(args[0])) {
		Term.error("Invalid range.");
	}

	let days: number[] = [];

	if (/^\d\.\.\d$/.test(args[0])) {
		const [start, end] = args[0].split("..");
		days = range(Number(start), Number(end));
	} else {
		days = [Number(args[0])];
	}

	for (const day of [...new Set(days)]) {
		const pathToChallenge = join(import.meta.dir, `../${day}/`);
		const { challenge } = (await import(join(pathToChallenge, "index.ts"))) as {
			challenge: Challenge;
		};
		await challenge[method]({
			file: join(pathToChallenge, "index.ts"),
			input: join(pathToChallenge, "input.txt"),
		});
	}
};

bin("aoc", "CLI tester and runner for Advent of Code TypeScript solutions")
	.command("test", "Test a solution")
	.argument("<range>", "Day of solution to test")
	.action(async (options, args) => {
		await handle(args, "test");
	})
	.command("run", "Run a solution")
	.argument("<range>", "Day of solution to run")
	.action(async (options, args) => {
		await handle(args, "run");
	})
	.run();
