import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { mdToPdf } from "md-to-pdf";

const root = resolve(import.meta.dirname, "..");
const input = resolve(process.argv[2] ?? resolve(root, "../kiwiburn-constitution.md"));
const output = resolve(process.argv[3] ?? resolve(root, "../kiwiburn-constitution.pdf"));

const markdown = await readFile(input, "utf8");
const [heading = "", title = "Kiwiburn Constitution", subtitle = ""] =
  markdown.match(/^# (.+)\n+(.+)$/m) ?? [];

// Swap the H1 + draft line for a full-bleed cover page
const cover = `<div class="cover">
  <div class="cover__logo">Kiwiburn</div>
  <div class="cover__body">
    <div class="cover__title">${title.replace(/^Kiwiburn\s+/, "")}</div>
    <div class="cover__subtitle">Kiwiburn Incorporated</div>
  </div>
  <div class="cover__footer">
    <span class="cover__tagline">New Zealand's Regional Burning Man Event</span>
    <span class="cover__meta">${subtitle}</span>
  </div>
</div>`;

await mdToPdf(
  { content: heading ? markdown.replace(heading, cover) : markdown },
  {
    css:
      (await readFile(resolve(import.meta.dirname, "style.css"), "utf8")) +
      `@page { @top-right { content: ${JSON.stringify(subtitle ? `${title} · ${subtitle}` : title)}; } }`,
    dest: output,
    document_title: title,
    pdf_options: {
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
    },
  },
);

console.log(`Wrote ${output}`);
