import type { LazyFile, Sample, Samples, Solution, Solutions } from "./types";

import {
	bgBlue,
	bgGreen,
	bgRed,
	bgYellow,
	blue,
	bold,
	gray,
	green,
	red,
	yellow,
} from "kleur/colors";
import { join } from "path";
import { Term, indent } from "./utils";

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
			console.log(`${bgRed(bold(" FAIL "))} ${red(
				`Received incorrect result from solution ${name}.`
			)}

${indent(
	`${green(`- ${expected}`)}\n${red(`- ${result}`)}\n\n${gray(
		"Input:"
	)}\n${indent(input, " ".repeat(4))}`,
	" ".repeat(4)
)}
`);
		} else {
			console.log(
				`${bgGreen(bold(" PASS "))} ${green(
					`No issues found with solution ${name}.`
				)}`
			);
		}
		return result === expected;
	}

	test() {
		if (Object.entries(this.samples).length === 0) {
			console.log(bgRed(" ERROR "), "No sample problems defined.");
			return false;
		}

		Term.heading(
			`${bgBlue(bold(" TEST "))} ${blue(this.location.file)}`,
			blue("⎯")
		);

		if (this.samples.one) {
			if (!this.solutions.one) {
				console.log(bgRed(" ERROR "), "Solution for 'one' does not exist.");
			} else {
				this.try(this.samples.one, this.solutions.one, "one");
			}
		}

		if (this.samples.two) {
			if (!this.solutions.two) {
				console.log(bgRed(" ERROR "), "Solution for 'two' does not exist.");
			} else {
				this.try(this.samples.two, this.solutions.two, "two");
			}
		}
	}

	async run() {
		if (Object.entries(this.solutions).length === 0) {
			console.log(bgRed(" ERROR "), "No solutions defined.");
			return;
		}

		let current = "unknown";

		try {
			const file = await this.input.text();

			Term.heading(
				`${bgYellow(bold(" RUN "))} ${yellow(this.location.file)}`,
				yellow("⎯")
			);

			console.log(`${gray("Input:")} ${this.location.input}`);

			for (const [name, func] of Object.entries(this.solutions)) {
				current = name;
				console.log(`${bold(`\nRunning solution ${name}...`)}`);

				const start = performance.now();
				const result = func(file);
				const duration = (performance.now() - start).toFixed(2);

				console.log(
					`${gray("Result:")} ${result}\n${gray("Duration:")} ${duration}ms`
				);
			}
		} catch (error) {
			if ((error as Error).name === "ENOENT") {
				console.log(
					bgRed(" ERROR "),
					`Something went wrong reading input file '${this.location.input}'.`
				);
			} else {
				console.log(
					bgRed(" ERROR "),
					`Something went wrong while executing solution ${current}...`
				);
			}
		}
	}
}
