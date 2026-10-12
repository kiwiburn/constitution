import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { mdToPdf } from "md-to-pdf";

const root = resolve(import.meta.dirname, "..");
const input = resolve(process.argv[2] ?? resolve(root, "../kiwiburn-constitution.md"));
const output = resolve(process.argv[3] ?? resolve(root, "../kiwiburn-constitution.pdf"));

const markdown = await readFile(input, "utf8");
const title = markdown.match(/^# (.+)$/m)?.[1] ?? "Kiwiburn Constitution";
const subtitle = markdown.match(/^# .+\n+(.+)$/m)?.[1] ?? "";

const footer = `
  <div style="display:flex;font-family:'Inter',sans-serif;font-size:8px;color:#8a7f73;justify-content:space-between;padding:0 18mm;width:100%">
    <span>${title}${subtitle ? ` · ${subtitle}` : ""}</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;

await mdToPdf(
  { content: markdown },
  {
    css: await readFile(resolve(import.meta.dirname, "style.css"), "utf8"),
    dest: output,
    document_title: title,
    pdf_options: {
      displayHeaderFooter: true,
      footerTemplate: footer,
      format: "A4",
      headerTemplate: "<span></span>",
      margin: { bottom: "22mm", left: "18mm", right: "18mm", top: "20mm" },
      printBackground: true,
    },
  },
);

console.log(`Wrote ${output}`);
