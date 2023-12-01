import type { LazyFile, Sample, Samples, Solution, Solutions } from "./types";

import { join } from "path";
import {
	red,
	green,
	bgRed,
	bgGreen,
	bold,
	gray,
	bgBlue,
	blue,
	bgCyan,
	cyan,
	bgWhite,
	underline,
	bgYellow,
	yellow,
} from "kleur/colors";
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
				`Incorrect outcome of solution '${name}'.`
			)}

${green(`- ${expected}`)}
${red(`- ${result}`)}

${gray("Input:")}
${indent(input, "    ")}
`);
		} else {
			console.log(
				`${bgGreen(bold(" PASS "))} ${green(
					`No issues found with solution '${name}'.`
				)}`
			);
		}
		return result === expected;
	}

	test(): boolean {
		Term.heading(
			`${bgBlue(bold(" TEST "))} ${blue(this.location.file)}`,
			blue("-")
		);
		return (
			this.try(this.samples.one, this.solutions.one, "one") &&
			this.try(this.samples.two, this.solutions.two, "two")
		);
	}

	async run() {
		const file = await this.input.text();

		Term.heading(
			`${bgYellow(bold(" RUN "))} ${yellow(this.location.file)}`,
			yellow("-")
		);

		console.log(`${gray("Input:")} ${this.location.input}`);

		for (const [name, func] of Object.entries(this.solutions)) {
			console.log(`${bold(`\nTesting solution '${name}'...`)}`);

			const start = performance.now();
			const result = func(file);
			const duration = (performance.now() - start).toFixed(2);

			console.log(
				`${gray("Result:")} ${result}\n${gray("Duration:")} ${duration}ms`
			);
		}
	}
}
