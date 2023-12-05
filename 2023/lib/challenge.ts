import type { Sample, Samples, Solution, Solutions } from "./types";

import pc from "picocolors";

import { Term, indent } from "./utils";

const PASS = pc.bold(pc.inverse(pc.green(" PASS ")));
const FAIL = pc.bold(pc.inverse(pc.red(" FAIL ")));
const TEST = pc.bold(pc.inverse(pc.blue(" TEST ")));
const RUN = pc.bold(pc.inverse(pc.yellow(" RUN ")));

export class Challenge {
	private samples: Samples;
	private solutions: Solutions;

	constructor(options: { samples: Samples; solutions: Solutions }) {
		this.samples = options.samples;
		this.solutions = options.solutions;
	}

	private try(sample: Sample, solution: Solution, name: string): boolean {
		const [input, expected] = sample;
		const result = solution(input);

		if (result !== expected) {
			console.log(`${FAIL} ${pc.red(
				`Received incorrect result from solution ${name}.`,
			)}

${indent(
	`${pc.green(`- ${expected}`)}\n${pc.red(`- ${result}`)}\n\n${pc.dim(
		"Input:",
	)}\n${indent(input, " ".repeat(4))}`,
	" ".repeat(4),
)}
`);
		} else {
			console.log(`${PASS} ${pc.green(`Solution ${name} passed.`)}`);
		}
		return result === expected;
	}

	test(options: { file: string; input: string }) {
		if (Object.entries(this.samples).length === 0) {
			Term.error("No sample problems defined.");
			return false;
		}

		Term.heading(`${TEST} ${pc.blue(options.file)}`);

		if (this.samples.one) {
			if (!this.solutions.one) {
				Term.error("Solution for one does not exist.");
			} else {
				this.try(this.samples.one, this.solutions.one, "one");
			}
		}

		if (this.samples.two) {
			if (!this.solutions.two) {
				Term.error("Solution for two does not exist.");
			} else {
				this.try(this.samples.two, this.solutions.two, "two");
			}
		}
	}

	async run(options: { file: string; input: string }) {
		if (Object.entries(this.solutions).length === 0) {
			Term.error("No solutions defined.");
			return;
		}

		let current = "unknown";

		try {
			const file = await Bun.file(options.input).text();

			Term.heading(`${RUN} ${pc.yellow(options.file)}`);
			console.log(`${pc.dim("Input:")} ${options.input}`);

			for (const [name, func] of Object.entries(this.solutions)) {
				current = name;
				console.log(`${pc.bold(`\nRunning solution ${name}...`)}`);

				const start = performance.now();
				const result = func(file);
				const duration = (performance.now() - start).toFixed(2);

				console.log(
					`${pc.dim("Result:")} ${result}\n${pc.dim(
						"Duration:",
					)} ${duration}ms`,
				);
			}
		} catch (error) {
			if ((error as Error).name === "ENOENT") {
				Term.error(
					`Something went wrong reading input file '${options.input}'.`,
				);
			} else {
				throw error;
			}
		}
	}
}
