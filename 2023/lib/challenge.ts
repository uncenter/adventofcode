import type { LazyFile, Sample, Samples, Solution, Solutions } from "./types";

import pc from "picocolors";

import { join } from "node:path";
import { Term, indent } from "./utils";

const PASS = pc.bold(pc.inverse(pc.green(" PASS ")));
const FAIL = pc.bold(pc.inverse(pc.green(" FAIL ")));
const TEST = pc.bold(pc.inverse(pc.blue(" TEST ")));
const RUN = pc.bold(pc.inverse(pc.yellow(" RUN ")));

const FILLER_CHAR = "⎯";

export class Challenge {
	private location: {
		dir: string;
		input: string;
		file: string;
	};
	private input: LazyFile;
	private samples: Samples;
	private solutions: Solutions;

	constructor(options: {
		dir: string;
		samples: Samples;
		solutions: Solutions;
	}) {
		this.location = {
			dir: options.dir,
			input: join(options.dir, "./input.txt"),
			file: join(options.dir, "./index.ts"),
		};
		this.input = Bun.file(this.location.input);
		this.samples = options.samples;
		this.solutions = options.solutions;
	}

	private try(sample: Sample, solution: Solution, name: string): boolean {
		const [input, expected] = sample;
		const result = solution(input);

		if (result !== expected) {
			console.log(`${FAIL} ${pc.red(
				`Received incorrect result from solution ${name}.`
			)}

${indent(
	`${pc.green(`- ${expected}`)}\n${pc.red(`- ${result}`)}\n\n${pc.dim(
		"Input:"
	)}\n${indent(input, " ".repeat(4))}`,
	" ".repeat(4)
)}
`);
		} else {
			console.log(
				`${PASS} ${pc.green(`No issues found with solution ${name}.`)}`
			);
		}
		return result === expected;
	}

	test() {
		if (Object.entries(this.samples).length === 0) {
			Term.error("No sample problems defined.");
			return false;
		}

		Term.heading(
			`${TEST} ${pc.blue(this.location.file)}`,
			pc.blue(FILLER_CHAR)
		);

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

	async run() {
		if (Object.entries(this.solutions).length === 0) {
			Term.error("No solutions defined.");
			return;
		}

		let current = "unknown";

		try {
			const file = await this.input.text();

			Term.heading(
				`${RUN} ${pc.yellow(this.location.file)}`,
				pc.yellow(FILLER_CHAR)
			);

			console.log(`${pc.dim("Input:")} ${this.location.input}`);

			for (const [name, func] of Object.entries(this.solutions)) {
				current = name;
				console.log(`${pc.bold(`\nRunning solution ${name}...`)}`);

				const start = performance.now();
				const result = func(file);
				const duration = (performance.now() - start).toFixed(2);

				console.log(
					`${pc.dim("Result:")} ${result}\n${pc.dim("Duration:")} ${duration}ms`
				);
			}
		} catch (error) {
			if ((error as Error).name === "ENOENT") {
				Term.error(
					`Something went wrong reading input file '${this.location.input}'.`
				);
			} else {
				Term.error(
					`Something went wrong while executing solution ${current}...`
				);
			}
		}
	}
}
