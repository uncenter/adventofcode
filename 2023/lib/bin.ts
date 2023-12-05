#!/usr/bin/env bun

import bin from "tiny-bin";

import { join } from "node:path";
import { mkdir } from "node:fs/promises";

import { Challenge } from "./challenge";
import { Term, range } from "./utils";

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

const init = async (day: string) => {
	const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
		headers: {
			cookie: `session=${Bun.env.AOC_SESSION}`,
		},
	});

	if (res.status == 404) {
		Term.error("This challenge has not been released yet!");
	}
	try {
		await mkdir(join(import.meta.dir, "../", day));
	} catch {
		Term.error(`Directory for day ${day} already exists.`);
	}

	await Bun.write(
		join(import.meta.dir, "../", day, "input.txt"),
		await res.text(),
	);

	const template = Bun.file(join(import.meta.dir, "resources/template.ts"));
	await Bun.write(
		join(import.meta.dir, "../", day, "index.ts"),
		(await template.text()).split("\n").slice(1).join("\n"),
	);
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
	.command("init", "Initialize template for given day")
	.argument("<day>", "Day to initialize")
	.action(async (options, args) => {
		await init(args[0]);
	})
	.run();
