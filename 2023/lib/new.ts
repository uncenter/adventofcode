import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { Term } from "./utils";

const day = Bun.env.AOC_INIT_DAY as string;
if (!day) Term.error("AOC_INIT_DAY environment variable not set.");

const template = Bun.file(join(import.meta.dir, "resources/template.ts"));
await mkdir(join(import.meta.dir, "../", day));
await Bun.write(
	join(import.meta.dir, "../", day, "index.ts"),
	(await template.text()).split("\n").slice(1).join("\n")
);

const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
	headers: {
		cookie: `session=${Bun.env.AOC_SESSION}`,
	},
});
if (res.status == 404) {
	Term.error("This challenge has not been released yet!");
}
await Bun.write(
	join(import.meta.dir, "../", day, "input.txt"),
	await res.text()
);
