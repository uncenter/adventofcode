import pc from "picocolors";

export const Term = {
	strip: function (string: string) {
		return string.replace(
			// https://github.com/chalk/ansi-regex/blob/main/index.js
			/[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~]))/g,
			""
		);
	},
	heading: function (text: string, filler: string) {
		text = `  ${text}  `;
		const fill = filler.repeat(
			(process.stdout.columns - this.strip(text).length) / 2
		);
		console.log(`\n${fill}${text}${fill}\n`);
	},
	error: function (message: string) {
		console.log(pc.bold(pc.red(`Error: ${message}`)));
		process.exit(1);
	},
};

export const indent = (input: string, indent: string) =>
	input
		.split("\n")
		.map((line) => indent + line)
		.join("\n");
